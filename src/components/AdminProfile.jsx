import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './AdminProfile.css';

const AdminProfile = () => {
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    accountName: '',
    accountNumber: '',
    branch: '',
    swiftCode: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBankDetails();
  }, []);

  const fetchBankDetails = async () => {
    try {
      const bankDoc = await getDoc(doc(db, 'admin', 'bankDetails'));
      if (bankDoc.exists()) {
        setBankDetails(bankDoc.data());
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bank details:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBankDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await setDoc(doc(db, 'admin', 'bankDetails'), bankDetails);
      setMessage('Bank details saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving bank details:', error);
      setMessage('Error saving bank details. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-profile">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-profile">
      <div className="header">
        <h2>Admin Profile</h2>
        <p>Manage your bank details for payments</p>
      </div>

      <div className="profile-content">
        <div className="bank-details-section">
          <h3>Bank Details</h3>
          <p className="section-description">
            These details will be shown to students when they make payments for courses.
          </p>

          <form onSubmit={handleSave} className="bank-details-form">
            <div className="form-group">
              <label htmlFor="bankName">Bank Name *</label>
              <input
                type="text"
                id="bankName"
                name="bankName"
                value={bankDetails.bankName}
                onChange={handleInputChange}
                required
                placeholder="e.g., First Bank of Nigeria"
              />
            </div>

            <div className="form-group">
              <label htmlFor="accountName">Account Name *</label>
              <input
                type="text"
                id="accountName"
                name="accountName"
                value={bankDetails.accountName}
                onChange={handleInputChange}
                required
                placeholder="e.g., John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="accountNumber">Account Number *</label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={bankDetails.accountNumber}
                onChange={handleInputChange}
                required
                placeholder="e.g., 1234567890"
                pattern="[0-9]{10}"
                title="Account number must be 10 digits"
              />
            </div>

            <div className="form-group">
              <label htmlFor="branch">Branch (Optional)</label>
              <input
                type="text"
                id="branch"
                name="branch"
                value={bankDetails.branch}
                onChange={handleInputChange}
                placeholder="e.g., Lagos Main Branch"
              />
            </div>

            <div className="form-group">
              <label htmlFor="swiftCode">SWIFT Code (Optional)</label>
              <input
                type="text"
                id="swiftCode"
                name="swiftCode"
                value={bankDetails.swiftCode}
                onChange={handleInputChange}
                placeholder="e.g., FBNINGLA"
              />
            </div>

            {message && (
              <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              className="save-btn"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Bank Details'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;