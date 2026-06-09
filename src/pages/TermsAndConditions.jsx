import React from 'react';
import { Link } from 'react-router-dom';
import './LegalPages.css';

const TermsAndConditions = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link to="/" className="legal-back">← Back to Home</Link>
        <h1>Terms and Conditions</h1>
        <p className="legal-updated">Last updated: June 9, 2026</p>

        <div className="legal-content">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the services provided by ZedroTech ("we," "us," or "our"), including our website, software development services, AI automation solutions, and related products, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2>2. Services Description</h2>
            <p>ZedroTech provides the following services:</p>
            <ul>
              <li><strong>Web Development:</strong> Custom websites, web applications, e-commerce platforms, and SaaS solutions</li>
              <li><strong>AI Automation:</strong> AI voice agents, chatbots, sales closers, and receptionists</li>
              <li><strong>Mobile App Development:</strong> Native and cross-platform mobile applications for iOS and Android</li>
              <li><strong>Custom Software:</strong> Bespoke software solutions tailored to specific business needs</li>
              <li><strong>VTU Platforms:</strong> Data, airtime, electricity, and bill payment vending systems</li>
              <li><strong>Marketing Technology:</strong> Email automation, CRM integration, and analytics solutions</li>
            </ul>
          </section>

          <section>
            <h2>3. Payment Terms</h2>
            <ul>
              <li>All prices are quoted as one-time development fees unless otherwise specified</li>
              <li><strong>Payment schedule:</strong> 50% upfront upon project commencement, 50% upon completion and delivery</li>
              <li>International clients may pay in USD via invoice</li>
              <li>Third-party services (hosting, domains, APIs, subscription tools) are billed separately and paid directly by the client</li>
              <li>Late payments may result in project suspension until payment is received</li>
            </ul>
          </section>

          <section>
            <h2>4. Project Scope and Changes</h2>
            <ul>
              <li>Project scope is defined in the initial agreement or proposal</li>
              <li>Any changes to the project scope may result in additional charges</li>
              <li>Change requests must be submitted in writing and approved by both parties</li>
              <li>Timelines are estimates and may be adjusted based on scope changes</li>
            </ul>
          </section>

          <section>
            <h2>5. Intellectual Property</h2>
            <ul>
              <li>Upon full payment, the client receives ownership of the source code and deliverables</li>
              <li>ZedroTech retains the right to use general knowledge, skills, and non-proprietary techniques</li>
              <li>Third-party libraries and frameworks remain subject to their respective licenses</li>
              <li>The client is responsible for ensuring they have rights to any content they provide</li>
            </ul>
          </section>

          <section>
            <h2>6. Third-Party Services</h2>
            <p>
              Our projects may integrate with third-party services (payment gateways, hosting providers, APIs, VTU providers, etc.). These services are governed by their own terms and conditions. ZedroTech is not responsible for the availability, accuracy, or policies of third-party services. The client assumes all costs associated with third-party subscriptions and services.
            </p>
          </section>

          <section>
            <h2>7. Support and Maintenance</h2>
            <ul>
              <li>Free bug-fix support is provided for 30 days after project delivery (unless otherwise agreed)</li>
              <li>Extended support and maintenance packages are available at additional cost</li>
              <li>Support covers bugs and issues related to the delivered work, not new feature requests</li>
            </ul>
          </section>

          <section>
            <h2>8. Limitation of Liability</h2>
            <p>
              ZedroTech shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from the use of our services. Our total liability shall not exceed the amount paid by the client for the specific service giving rise to the claim. We are not responsible for business losses, data loss, or interruptions caused by third-party services or force majeure events.
            </p>
          </section>

          <section>
            <h2>9. Confidentiality</h2>
            <p>
              Both parties agree to keep confidential any proprietary information shared during the course of the project. This includes business strategies, technical details, source code, and client data. Confidentiality obligations survive the termination of this agreement.
            </p>
          </section>

          <section>
            <h2>10. Termination</h2>
            <ul>
              <li>Either party may terminate the agreement with 14 days written notice</li>
              <li>If the client terminates, payment is due for work completed up to the termination date</li>
              <li>If ZedroTech terminates due to non-payment, the client forfeits any upfront payment</li>
              <li>Upon termination, all completed work and materials are delivered to the client</li>
            </ul>
          </section>

          <section>
            <h2>11. Warranty</h2>
            <p>
              ZedroTech warrants that services will be performed in a professional and workmanlike manner. We do not warrant that our services will be error-free or uninterrupted. The 30-day bug-fix support period serves as our limited warranty for delivered work.
            </p>
          </section>

          <section>
            <h2>12. Governing Law</h2>
            <p>
              These Terms and Conditions are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes shall be resolved in the courts of competent jurisdiction in Nigeria.
            </p>
          </section>

          <section>
            <h2>13. Changes to Terms</h2>
            <p>
              ZedroTech reserves the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on our website. Continued use of our services constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2>14. Contact Information</h2>
            <p>
              For questions about these Terms and Conditions, please contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:info@zedrotech.com">info@zedrotech.com</a></li>
              <li><strong>WhatsApp:</strong> <a href="https://wa.me/2348156853636" target="_blank" rel="noopener noreferrer">+234 815 685 3636</a></li>
              <li><strong>Website:</strong> <a href="https://zedrotech.com" target="_blank" rel="noopener noreferrer">zedrotech.com</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
