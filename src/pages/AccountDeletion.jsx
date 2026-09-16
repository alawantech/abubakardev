import React from 'react';
import { Link } from 'react-router-dom';
import './LegalPages.css';

const AccountDeletion = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link to="/" className="legal-back">← Back to Home</Link>
        <h1>Delete Your Account</h1>
        <p className="legal-updated">Last updated: September 15, 2026</p>

        <div className="legal-content">
          <section>
            <h2>How to Delete Your Account</h2>
            <p>You can delete your ZedroTech Academy account and all associated data using either of these methods:</p>
          </section>

          <section>
            <h2>Method 1: In the Mobile App (Recommended)</h2>
            <ol>
              <li>Open the ZedroTech Academy app on your Android device</li>
              <li>Tap the <strong>Profile</strong> tab at the bottom right</li>
              <li>Scroll down and tap <strong>Delete Account</strong></li>
              <li>Confirm the deletion when prompted</li>
            </ol>
            <p>This will immediately and permanently delete:</p>
            <ul>
              <li>Your account and profile information (name, email, WhatsApp number)</li>
              <li>Your course enrollment records and subscription data</li>
              <li>Your learning progress and completed lessons</li>
              <li>Your payment history and uploaded receipts</li>
            </ul>
          </section>

          <section>
            <h2>Method 2: Email Request</h2>
            <p>
              Send an email to <a href="mailto:info@zedrotech.com">info@zedrotech.com</a> with the subject line <strong>"Delete My Account"</strong> and include:
            </p>
            <ul>
              <li>Your full name</li>
              <li>The email address associated with your account</li>
            </ul>
            <p>We will process your request and delete your account within <strong>7 business days</strong>.</p>
          </section>

          <section>
            <h2>What Happens After Deletion</h2>
            <ul>
              <li>All your personal data is permanently removed from our systems</li>
              <li>You will lose access to all enrolled courses and learning progress</li>
              <li>This action cannot be undone</li>
              <li>We may retain minimal data only if required by law</li>
            </ul>
          </section>

          <section>
            <h2>Questions?</h2>
            <p>Contact us at <a href="mailto:info@zedrotech.com">info@zedrotech.com</a> or via <a href="https://wa.me/2348156853636" target="_blank" rel="noopener noreferrer">WhatsApp</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AccountDeletion;
