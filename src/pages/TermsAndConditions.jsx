import React from 'react';
import { Link } from 'react-router-dom';
import './LegalPages.css';

const TermsAndConditions = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link to="/" className="legal-back">← Back to Home</Link>
        <h1>Terms and Conditions</h1>
        <p className="legal-updated">Last updated: September 15, 2026</p>

        <div className="legal-content">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the ZedroTech Academy website at <a href="https://school.zdrotech.com" target="_blank" rel="noopener noreferrer">school.zdrotech.com</a>, the ZedroTech Academy mobile application, or any related services (collectively, the "Platform"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our Platform.
            </p>
          </section>

          <section>
            <h2>2. Services Description</h2>
            <p>ZedroTech Academy provides online technology education services, including:</p>
            <ul>
              <li>Video-based courses on web development, mobile app development, UI/UX design, data science, and digital marketing</li>
              <li>Project-based learning with structured curriculum and lesson progress tracking</li>
              <li>Student dashboard for tracking enrollment, progress, and subscription status</li>
              <li>Payment processing for course enrollment and subscription plans</li>
            </ul>
            <p>Services are available through our website and the ZedroTech Academy mobile app on Android.</p>
          </section>

          <section>
            <h2>3. Account Registration</h2>
            <ul>
              <li>You must register an account to access course content. Registration is available through the website at school.zdrotech.com.</li>
              <li>You may log in to the mobile app using the same credentials you created on the website.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You must provide accurate and complete information during registration.</li>
              <li>You must be at least 13 years old to create an account.</li>
              <li>One person may not maintain more than one account.</li>
            </ul>
          </section>

          <section>
            <h2>4. Course Enrollment and Subscriptions</h2>
            <ul>
              <li><strong>Enrollment Plans:</strong> Courses are available under monthly, yearly, or one-time payment plans as displayed on the course page.</li>
              <li><strong>Payment:</strong> Enrollment is completed via bank transfer. You must upload a payment receipt through the Platform for verification.</li>
              <li><strong>Verification:</strong> Payments are manually verified by our team. Enrollment access is granted after payment confirmation.</li>
              <li><strong>Access Duration:</strong> Your access to course content is limited to the duration of your selected plan (monthly, yearly, or lifetime for one-time payments).</li>
              <li><strong>Renewal:</strong> Monthly and yearly subscriptions must be renewed to maintain access. Expiry warnings are shown in the app.</li>
            </ul>
          </section>

          <section>
            <h2>5. Payments and Refunds</h2>
            <ul>
              <li>All prices are displayed in Nigerian Naira (₦) and are inclusive of applicable fees.</li>
              <li>Payments are processed via bank transfer. We do not currently process payments through Google Play Billing.</li>
              <li><strong>Refund Policy:</strong> Due to the digital nature of our courses, refunds are generally not provided once course access has been granted. In exceptional circumstances, refund requests may be considered within 7 days of payment, provided that course content has not been substantially accessed.</li>
              <li>Chargebacks or payment disputes may result in immediate suspension of your account and access.</li>
            </ul>
          </section>

          <section>
            <h2>6. User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Share your account credentials with others or allow unauthorized access to your account</li>
              <li>Download, record, redistribute, or pirate course content</li>
              <li>Use the Platform for any illegal or unauthorized purpose</li>
              <li>Attempt to gain unauthorized access to other accounts or systems</li>
              <li>Use automated tools to access or scrape course content</li>
              <li>Impersonate another person or misrepresent your identity</li>
            </ul>
          </section>

          <section>
            <h2>7. Intellectual Property</h2>
            <ul>
              <li>All course content, including videos, materials, and curriculum, is owned by ZedroTech Academy and is protected by copyright laws.</li>
              <li>Your enrollment grants you a limited, non-transferable license to access course content for personal, non-commercial learning purposes.</li>
              <li>You may not copy, reproduce, distribute, or create derivative works from course content without express written permission.</li>
            </ul>
          </section>

          <section>
            <h2>8. Mobile Application</h2>
            <ul>
              <li>The ZedroTech Academy mobile app is provided as a convenience for accessing your courses on Android devices.</li>
              <li>Course registration must be completed on the website at school.zdrotech.com.</li>
              <li>The mobile app may request access to your photo gallery solely for uploading payment receipts.</li>
              <li>You may delete your account and all associated data from the mobile app via Profile &gt; Delete Account.</li>
              <li>We reserve the right to modify or discontinue the mobile app at any time with reasonable notice.</li>
            </ul>
          </section>

          <section>
            <h2>9. Limitation of Liability</h2>
            <p>
              ZedroTech Academy shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Platform. Our total liability shall not exceed the amount paid by you for the specific course giving rise to the claim. We are not responsible for interruptions caused by third-party services, network issues, or force majeure events.
            </p>
          </section>

          <section>
            <h2>10. Termination</h2>
            <ul>
              <li>We reserve the right to suspend or terminate your account if you violate these Terms and Conditions.</li>
              <li>You may delete your account at any time from the mobile app or by contacting us.</li>
              <li>Upon termination, your access to course content will be revoked. We may retain your data as described in our Privacy Policy.</li>
            </ul>
          </section>

          <section>
            <h2>11. Changes to Terms</h2>
            <p>
              ZedroTech Academy reserves the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on this page. Continued use of the Platform after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2>12. Governing Law</h2>
            <p>
              These Terms and Conditions are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes shall be resolved in the courts of competent jurisdiction in Nigeria.
            </p>
          </section>

          <section>
            <h2>13. Contact Information</h2>
            <p>
              For questions about these Terms and Conditions, please contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:info@zedrotech.com">info@zedrotech.com</a></li>
              <li><strong>WhatsApp:</strong> <a href="https://wa.me/2348156853636" target="_blank" rel="noopener noreferrer">+234 815 685 3636</a></li>
              <li><strong>Website:</strong> <a href="https://school.zdrotech.com" target="_blank" rel="noopener noreferrer">school.zdrotech.com</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
