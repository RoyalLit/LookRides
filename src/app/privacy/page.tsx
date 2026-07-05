import React from 'react';
import type { Metadata } from 'next';
import { BUSINESS_PHONE_DISPLAY, SITE_URL } from '@/lib/config';
import styles from '../legal.module.css';

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  title: 'Privacy Policy | LookRides',
  description: 'How LookRides collects, uses, and protects your personal data when you book intercity cabs.',
  openGraph: {
    title: 'Privacy Policy | LookRides',
    description: 'How LookRides collects, uses, and protects your personal data when you book intercity cabs.',
    images: siteUrl + '/og-image.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | LookRides',
    description: 'How LookRides protects your personal data when you book cabs.',
    images: siteUrl + '/og-image.png',
  },
  alternates: { canonical: siteUrl + '/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div className="container">
          <p className={styles.headerLabel}>Legal</p>
          <h1 className={styles.pageTitle}>Privacy Policy</h1>
          <p className={styles.headerSubtitle}>
            How we collect, use, and safeguard your personal information when you book with us.
          </p>
        </div>
      </header>

      <section className={styles.content}>
        <div className={styles.inner}>
          <p className={styles.lastUpdated}>Last updated: July 1, 2026</p>

          <div className={styles.section}>
            <h2>1. Information We Collect</h2>
            <p>When you use LookRides, we collect only the information necessary to provide and improve our intercity cab booking service:</p>
            <ul>
              <li><strong>Contact details:</strong> Your name, phone number, and email address when you make a booking or enquiry.</li>
              <li><strong>Trip information:</strong> Pickup and drop-off locations, travel dates, times, and any special instructions you provide.</li>
              <li><strong>Communication records:</strong> WhatsApp messages, phone call logs, and email correspondence related to your bookings.</li>
              <li><strong>Usage data:</strong> Pages visited, routes viewed, and interactions with our website to help us improve your experience.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>2. How We Use Your Information</h2>
            <p>Your information is used exclusively for the following purposes:</p>
            <ul>
              <li>Processing and confirming your booking requests.</li>
              <li>Communicating trip updates, driver allocation, and ride status via WhatsApp or phone.</li>
              <li>Sharing your phone number and pickup location with your assigned chauffeur solely for the purpose of facilitating your trip.</li>
              <li>Improving our services, website experience, and route offerings.</li>
              <li>Responding to your enquiries and support requests.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>3. Information Sharing</h2>
            <p>We do not sell, rent, or trade your personal information. We share data only in these limited circumstances:</p>
            <ul>
              <li><strong>With your chauffeur:</strong> Your name, phone number, and pickup location are shared with the assigned driver to complete your booking.</li>
              <li><strong>Service providers:</strong> Trusted third parties who help us operate our platform (cloud hosting, SMS/WhatsApp delivery, analytics) — all contractually bound to keep your data confidential.</li>
              <li><strong>Legal compliance:</strong> When required by law or to protect our rights and safety.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>4. Cookies & Tracking</h2>
            <p>Our website uses minimal cookies and tracking technologies to enhance your experience:</p>
            <ul>
              <li><strong>Essential cookies:</strong> Required for the website to function properly (session management, security).</li>
              <li><strong>Analytics:</strong> Anonymous usage data to understand how visitors use our site and improve our services.</li>
              <li><strong>No advertising cookies:</strong> We do not use tracking cookies for advertising or remarketing purposes.</li>
            </ul>
            <p>You can control cookies through your browser settings. Disabling essential cookies may affect website functionality.</p>
          </div>

          <div className={styles.section}>
            <h2>5. Data Retention</h2>
            <p>We retain your personal information only for as long as necessary:</p>
            <ul>
              <li><strong>Booking records:</strong> Retained for 3 years after your last trip for operational and legal purposes.</li>
              <li><strong>Communications:</strong> WhatsApp and email records kept for 1 year.</li>
              <li><strong>Analytics data:</strong> Anonymized and retained for up to 2 years.</li>
            </ul>
            <p>When data is no longer needed, it is securely deleted or anonymized.</p>
          </div>

          <div className={styles.section}>
            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access</strong> the personal data we hold about you.</li>
              <li><strong>Correct</strong> any inaccurate or incomplete data.</li>
              <li><strong>Request deletion</strong> of your data, subject to legal retention requirements.</li>
              <li><strong>Object</strong> to certain processing activities.</li>
              <li><strong>Withdraw consent</strong> at any time for consent-based processing.</li>
            </ul>
            <p>To exercise any of these rights, contact us at the details below.</p>
          </div>

          <div className={styles.section}>
            <h2>7. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your data:</p>
            <ul>
              <li>Secure server infrastructure with encrypted database storage.</li>
              <li>HTTPS encryption for all website communications.</li>
              <li>Restricted access to personal data on a need-to-know basis.</li>
              <li>Regular security reviews of our systems and practices.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>8. Third-Party Services</h2>
            <p>Our platform uses the following third-party services, each with their own privacy practices:</p>
            <ul>
              <li><strong>Supabase</strong> — Database hosting and authentication.</li>
              <li><strong>WhatsApp Business API</strong> — Booking confirmations and customer communication.</li>
              <li><strong>Vercel</strong> — Website hosting and deployment.</li>
            </ul>
            <p>We encourage you to review the privacy policies of these providers.</p>
          </div>

          <div className={styles.section}>
            <h2>9. Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. We encourage you to review this page periodically.</p>
          </div>

          <div className={styles.section}>
            <h2>10. Contact Us</h2>
            <p>If you have questions, concerns, or requests regarding your personal data, please reach out:</p>
            <ul>
              <li>Phone / WhatsApp: {BUSINESS_PHONE_DISPLAY}</li>
              <li>Email: info@lookride.in</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
