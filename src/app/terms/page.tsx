import React from 'react';
import type { Metadata } from 'next';
import { BUSINESS_PHONE_DISPLAY, SITE_URL } from '@/lib/config';
import styles from '../legal.module.css';

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  title: 'Terms & Conditions | LookRides',
  description: 'Terms and conditions for booking intercity cabs with LookRides. Read about booking, pricing, passenger responsibilities, and more.',
  openGraph: {
    title: 'Terms & Conditions | LookRides',
    description: 'Terms and conditions for booking intercity cabs with LookRides.',
    images: siteUrl + '/og-image.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Conditions | LookRides',
    description: 'Booking terms for LookRides intercity cab service.',
    images: siteUrl + '/og-image.png',
  },
  alternates: { canonical: siteUrl + '/terms' },
};

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div className="container">
          <p className={styles.headerLabel}>Legal</p>
          <h1 className={styles.pageTitle}>Terms &amp; Conditions</h1>
          <p className={styles.headerSubtitle}>
            Please read these terms carefully before booking your intercity cab with us.
          </p>
        </div>
      </header>

      <section className={styles.content}>
        <div className={styles.inner}>
          <p className={styles.lastUpdated}>Last updated: July 1, 2026</p>

          <div className={styles.section}>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing the LookRides website or booking a ride through our platform, you confirm that you have read, understood, and agree to be bound by these terms. If you do not agree, please do not use our services.</p>
          </div>

          <div className={styles.section}>
            <h2>2. The Service</h2>
            <p>LookRides is an intercity cab booking platform that connects passengers with verified chauffeur-driven vehicles. We act as an aggregator and booking facilitator — the actual transportation service is provided by our partner chauffeurs and fleet operators.</p>
          </div>

          <div className={styles.section}>
            <h2>3. Booking &amp; Pricing</h2>
            <h3>3.1 No Upfront Payment</h3>
            <p>For standard intercity bookings, we do not charge any upfront booking fees or advance payments. You pay the driver directly at the end of your trip based on the agreed fare.</p>

            <h3>3.2 Fixed Pricing</h3>
            <p>All prices quoted on our website are fixed for the selected route and vehicle type. The fare includes the driver&apos;s service and vehicle fuel costs for the quoted distance. Additional charges may apply for:</p>
            <ul>
              <li>Tolls and state taxes (charged at actuals).</li>
              <li>Parking fees at destinations.</li>
              <li>Mid-trip itinerary changes requested by the passenger.</li>
              <li>Night driving charges (between 11 PM and 6 AM) for select routes.</li>
            </ul>

            <h3>3.3 Booking Confirmation</h3>
            <p>A booking is confirmed when you receive a WhatsApp or SMS confirmation from our team. Until confirmed, the vehicle availability and pricing may be subject to change.</p>
          </div>

          <div className={styles.section}>
            <h2>4. Passenger Responsibilities</h2>
            <ul>
              <li>Provide accurate pickup location, drop-off destination, and contact information.</li>
              <li>Be ready at the designated pickup location at the scheduled time.</li>
              <li>Treat the chauffeur and vehicle with respect at all times.</li>
              <li>Smoking, alcohol, and tobacco consumption inside the vehicle is strictly prohibited.</li>
              <li>Passengers are liable for any damage caused to the vehicle during the trip.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>5. No-Show Policy</h2>
            <p>If you are unreachable at the provided contact number or not present at the pickup location for more than 30 minutes past the scheduled time, the booking may be considered a no-show and the driver may be released. Since we do not take upfront payments for standard bookings, no charges apply.</p>
          </div>

          <div className={styles.section}>
            <h2>6. Mid-Trip Changes</h2>
            <p>If you need to modify your itinerary during the trip (additional stops, route changes, extended waiting), please discuss with your chauffeur. Additional distance and time incurred will be charged at mutually agreed rates. We recommend contacting our support team to confirm revised pricing.</p>
          </div>

          <div className={styles.section}>
            <h2>7. Limitation of Liability</h2>
            <p>LookRides acts as a booking platform and is not the transportation provider. To the maximum extent permitted by law:</p>
            <ul>
              <li>We are not liable for delays caused by traffic, weather, road conditions, vehicle breakdowns, or circumstances beyond our reasonable control.</li>
              <li>In the event of a vehicle breakdown, we will make our best effort to arrange an alternate vehicle as soon as possible.</li>
              <li>Our total liability for any claim arising from the use of our platform is limited to the fare amount of the specific trip in question.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>8. Insurance</h2>
            <p>All our partner vehicles are equipped with valid third-party insurance as mandated by Indian law. Passengers are encouraged to verify insurance details with the chauffeur before the trip. Personal accident or travel insurance is not provided by LookRides — passengers may arrange their own coverage.</p>
          </div>

          <div className={styles.section}>
            <h2>9. Prohibited Uses</h2>
            <p>You agree not to use our platform or services for:</p>
            <ul>
              <li>Any illegal activity or transportation of prohibited goods.</li>
              <li>Booking under false or fraudulent identity.</li>
              <li>Harassing, abusing, or threatening our chauffeurs or support staff.</li>
              <li>Reselling or subletting booked rides to third parties.</li>
            </ul>
            <p>We reserve the right to refuse service or cancel bookings for violations of these terms without notice.</p>
          </div>

          <div className={styles.section}>
            <h2>10. Governing Law &amp; Dispute Resolution</h2>
            <p>These terms are governed by the laws of India. Any disputes arising from or relating to these terms or your use of our services shall first be attempted to be resolved through informal negotiation. If unresolved, disputes shall be subject to the exclusive jurisdiction of the courts in Chandigarh, India.</p>
          </div>

          <div className={styles.section}>
            <h2>11. Modifications</h2>
            <p>We reserve the right to update these terms at any time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. Continued use of the service after changes constitutes acceptance of the revised terms.</p>
          </div>

          <div className={styles.section}>
            <h2>12. Contact</h2>
            <p>For questions or concerns about these terms, please contact us:</p>
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
