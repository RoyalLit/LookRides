import React from 'react';
import type { Metadata } from 'next';
import { BUSINESS_PHONE_DISPLAY } from '@/lib/config';
import styles from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Cancellation & Refund Policy | LookRides',
  description: 'Our cancellation and refund policies for intercity cab bookings — no upfront payment, free cancellation.',
  openGraph: {
    title: 'Cancellation & Refund Policy | LookRides',
    description: 'Free cancellation for intercity cab bookings. No upfront payment required.',
    images: '/og-image.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cancellation & Refund Policy | LookRides',
    description: 'Flexible cancellation policy for LookRides cab bookings.',
  },
  alternates: { canonical: 'https://lookrides.com/cancellation' },
};

export default function CancellationPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div className="container">
          <p className={styles.headerLabel}>Legal</p>
          <h1 className={styles.pageTitle}>Cancellation &amp; Refund Policy</h1>
          <p className={styles.headerSubtitle}>
            Flexible cancellations with no upfront charges for standard bookings.
          </p>
        </div>
      </header>

      <section className={styles.content}>
        <div className={styles.inner}>
          <p className={styles.lastUpdated}>Last updated: July 1, 2026</p>

          <p><strong>LookRides is owned and operated by Tarun Kumar.</strong></p>

          <div className={styles.highlight}>
            <p><strong>Zero upfront payment.</strong> We do not charge any booking fees or advance payments for standard intercity routes. You pay the driver directly at the end of your trip. This makes cancellations simple and free.</p>
          </div>

          <div className={styles.section}>
            <h2>1. Standard Bookings — Free Cancellation</h2>
            <p>For all standard intercity bookings (sedans, SUVs, hatchbacks) where no advance payment has been taken:</p>
            <ul>
              <li>Cancellations are <strong>completely free of charge</strong> at any time.</li>
              <li>As a courtesy to our chauffeurs, we request that you notify us at least <strong>4 hours before</strong> your scheduled pickup time if your plans change.</li>
              <li>This allows us to release the driver and reassign the vehicle to another passenger.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>2. Large Fleet &amp; Custom Itineraries</h2>
            <p>For specialized vehicles (Tempo Traveller, Urbania, luxury buses) or multi-day customised itineraries, a token advance may be requested to block the specific vehicle:</p>
            <ul>
              <li><strong>Cancellation 24+ hours before pickup:</strong> Full 100% refund of the token amount.</li>
              <li><strong>Cancellation within 24 hours of pickup:</strong> The token advance may be forfeited as the vehicle could not be re-booked.</li>
            </ul>
            <p>All refunds are processed within <strong>5–7 business days</strong> to the original payment method.</p>
          </div>

          <div className={styles.section}>
            <h2>3. Driver-Initiated Cancellations</h2>
            <p>In the rare event that our chauffeur or fleet partner cancels a confirmed booking (due to vehicle breakdown, driver unavailability, or operational issues):</p>
            <ul>
              <li>We will immediately notify you via WhatsApp or phone call.</li>
              <li>We will make every effort to arrange an alternate vehicle at the same agreed fare.</li>
              <li>If an alternate vehicle cannot be arranged, any token advance paid will be fully refunded within 5–7 business days.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>4. How to Cancel</h2>
            <p>To cancel a booking, you can use any of the following methods:</p>
            <ul>
              <li>Reply to your WhatsApp booking confirmation message.</li>
              <li>Call or WhatsApp us at <strong>{BUSINESS_PHONE_DISPLAY}</strong> — our team is available 24/7.</li>
              <li>Email us at info@lookride.in with your booking details.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>5. Rescheduling</h2>
            <p>Need to change your travel date or time instead of cancelling? We are happy to help:</p>
            <ul>
              <li>Contact us via WhatsApp or phone with your revised schedule.</li>
              <li>We will update your booking to the new date/time, subject to vehicle availability.</li>
              <li>Rescheduling is free of charge for standard bookings.</li>
              <li>If the revised route is different, pricing may be adjusted accordingly.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>6. Refund Processing</h2>
            <p>When a refund is applicable (large fleet bookings or driver-initiated cancellations):</p>
            <ul>
              <li>Refunds are processed within <strong>5–7 business days</strong> from the date of cancellation.</li>
              <li>The amount is automatically routed back to your original payment method (UPI, credit/debit card, or netbanking) through our secure <strong>PhonePe</strong> gateway.</li>
              <li>You will receive a confirmation once the refund has been initiated.</li>
              <li>If you do not see the refund within 7 business days, please contact us for a status update.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>7. Questions?</h2>
            <p>If you have any questions about our cancellation or refund policies, please don&apos;t hesitate to reach out:</p>
            <ul>
              <li><strong>Owner:</strong> Tarun Kumar</li>
              <li>Phone / WhatsApp: {BUSINESS_PHONE_DISPLAY}</li>
              <li>Email: info@lookride.in</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
