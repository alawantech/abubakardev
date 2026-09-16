import React from 'react';
import { Link } from 'react-router-dom';
import './LegalPages.css';

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link to="/" className="legal-back">← Back to Home</Link>
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: September 15, 2026</p>

        <div className="legal-content">
          <section>
            <h2>1. Introduction</h2>
            <p>
              Welcome to ZedroTech Academy ("we," "us," or "our"). We operate the ZedroTech Academy website at <a href="https://school.zedrotech.com" target="_blank" rel="noopener noreferrer">school.zedrotech.com</a> and the ZedroTech Academy mobile application (collectively, the "Platform"). We are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Platform and services.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <h3>2.1 Personal Information</h3>
            <p>We collect the following personal information when you register, enroll in courses, or interact with our Platform:</p>
            <ul>
              <li><strong>Account Information:</strong> Full name, email address, and password (stored securely via Firebase Authentication)</li>
              <li><strong>Contact Information:</strong> WhatsApp phone number</li>
              <li><strong>Payment Information:</strong> Payment receipts uploaded for course enrollment verification (images stored via Firebase Storage)</li>
              <li><strong>Course Progress:</strong> Enrollment plans, subscription status, lesson completion records, and learning progress data</li>
            </ul>

            <h3>2.2 Automatically Collected Information</h3>
            <p>When you use our Platform, we may automatically collect:</p>
            <ul>
              <li>Device type, operating system, and app version</li>
              <li>IP address and approximate geographic location</li>
              <li>Usage data including pages viewed, courses accessed, and time spent on the Platform</li>
              <li>Error logs and performance data</li>
            </ul>

            <h3>2.3 Information from the Mobile App</h3>
            <p>The ZedroTech Academy mobile app may request access to:</p>
            <ul>
              <li><strong>Photo Gallery:</strong> To upload payment receipts for course enrollment verification. We do not access, collect, or store any other photos from your device.</li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <p>We use your information for the following purposes:</p>
            <ul>
              <li>To create and manage your student account</li>
              <li>To process course enrollments and verify payments</li>
              <li>To provide access to course content and track your learning progress</li>
              <li>To communicate about your enrollment, courses, and account updates</li>
              <li>To provide customer support via WhatsApp or email</li>
              <li>To improve our Platform and learning experience</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2>4. How We Share Your Information</h2>
            <p>We do not sell your personal information. We may share your information with:</p>
            <ul>
              <li><strong>Service Providers:</strong> Google Firebase (hosting, authentication, database, and storage), and payment processing partners who assist in our operations</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
            </ul>
          </section>

          <section>
            <h2>5. Data Storage and Security</h2>
            <p>
              Your data is stored securely on Google Firebase (Firestore database, Firebase Authentication, and Firebase Storage), which employs industry-standard security measures including encryption at rest and in transit. We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2>6. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected. Course enrollment and progress data is retained for the duration of your subscription and for a reasonable period afterward. You may request deletion of your data at any time (see Section 8).
            </p>
          </section>

          <section>
            <h2>7. Your Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information and account</li>
              <li><strong>Data Portability:</strong> Request transfer of your data to another service provider</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing at any time</li>
            </ul>
            <p>
              <strong>Account Deletion:</strong> You can delete your account directly from the ZedroTech Academy mobile app by navigating to Profile &gt; Delete Account. This will permanently remove your account, course progress, and payment history from our systems. Alternatively, you may contact us at <a href="mailto:info@zedrotech.com">info@zedrotech.com</a> to request deletion.
            </p>
          </section>

          <section>
            <h2>8. Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our services after any changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:info@zedrotech.com">info@zedrotech.com</a></li>
              <li><strong>WhatsApp:</strong> <a href="https://wa.me/2348156853636" target="_blank" rel="noopener noreferrer">+234 815 685 3636</a></li>
              <li><strong>Website:</strong> <a href="https://school.zedrotech.com" target="_blank" rel="noopener noreferrer">school.zedrotech.com</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
