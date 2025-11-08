const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Verify Flutterwave Payment
app.post('/api/verify-payment', async (req, res) => {
  try {
    const { transaction_id } = req.body;

    if (!transaction_id) {
      return res.status(400).json({ 
        success: false, 
        message: 'Transaction ID is required' 
      });
    }

    // Verify payment with Flutterwave
    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    );

    const paymentData = response.data.data;

    // Check if payment was successful
    if (paymentData.status === 'successful' && paymentData.amount >= req.body.expected_amount) {
      return res.json({
        success: true,
        message: 'Payment verified successfully',
        data: {
          transaction_id: paymentData.id,
          amount: paymentData.amount,
          currency: paymentData.currency,
          customer: {
            email: paymentData.customer.email,
            name: paymentData.customer.name,
            phone: paymentData.customer.phone_number,
          },
          payment_type: paymentData.payment_type,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed',
        status: paymentData.status,
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: 'Error verifying payment',
      error: error.response?.data?.message || error.message,
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Payment verification server running on http://localhost:${PORT}`);
  console.log(`✅ Flutterwave Secret Key: ${process.env.FLUTTERWAVE_SECRET_KEY ? 'Loaded' : 'Missing'}`);
});
