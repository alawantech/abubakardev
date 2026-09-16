import React from 'react';
import { Link } from 'react-router-dom';
import './LegalPages.css';

const DataDeletion = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link to="/" className="legal-back">← Back to Home</Link>
        <h1>Request Data Deletion</h1>
        <p className="legal-updated">Last updated: September 15, 2026</p>

        <div className="legal-content">
          <section>
            <h2>Your Data Rights</h2>
            <p>
              You have the right to request deletion of some or all of your personal data without deleting your entire ZedroTech Academy account. We respect your privacy and will process your request promptly.
            </p>
          </section>

          <section>
            <h2>What Data Can You Request to Delete?</h2>
            <ul>
              <li><strong>Profile information:</strong> Your full name and WhatsApp number</li>
              <li><strong>Payment receipts:</strong> Uploaded receipt images from your device</li>
              <li><strong>Course progress:</strong> Lesson completion records and learning data</li>
              <li><strong>Enrollment history:</strong> Past and current course enrollments</li>
            </ul>
            <p><strong>Note:</strong> We may retain your email address and account credentials for security and legal compliance purposes, even after data deletion.</p>
          </section>

          <section>
            <h2>How to Request Data Deletion</h2>
            <p>Send an email to <a href="mailto:info@zedrotech.com">info@zedrotech.com</a> with:</p>
            <ul>
              <li>Subject line: <strong>"Delete My Data"</strong></li>
              <li>Your full name</li>
              <li>The email address associated with your account</li>
              <li>Specify which data you want deleted (e.g., "Delete my payment receipts" or "Delete all my data")</li>
            </ul>
          </section>

          <section>
            <h2>Alternative: In the Mobile App</h2>
            <p>
              You can delete your full account (including all data) directly from the ZedroTech Academy mobile app by navigating to <strong>Profile → Delete Account</strong>.
            </p>
          </section>

          <section>
            <h2>Processing Time</h2>
            <p>
              We will process your data deletion request within <strong>7 business days</strong> of receiving your email. You will receive a confirmation email once your data has been deleted.
            </p>
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

export default DataDeletion;
