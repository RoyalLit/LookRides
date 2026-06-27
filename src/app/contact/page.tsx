import type { Metadata } from 'next';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import ContactForm from './ContactForm';
import styles from './contact.module.css';

export const metadata: Metadata = {
  title: 'Contact LookRides | Taxi Booking in Derabassi & Chandigarh',
  description: 'Contact LookRides for taxi bookings, corporate travel, and support. Call +91 97804 26567 or email info@lookride.in. Based in Derabassi, near Chandigarh.',
  openGraph: {
    title: 'Contact LookRides | 24/7 Taxi Booking Support',
    description: 'Call +91 97804 26567 or email info@lookride.in. Available 24/7 for airport transfers, outstation trips & corporate travel across North India.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact LookRides Taxi Service',
    description: 'Book your ride: +919780426567. 24/7 customer support for bookings & inquiries.',
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lookrides.com" },
        { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://lookrides.com/contact" },
      ],
    },
    {
      "@type": "ContactPoint",
      "telephone": "+91-9780426567",
      "contactType": "customer service",
      "availableLanguage": ["Hindi", "English", "Punjabi"],
      "areaServed": ["IN"],
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "00:00",
        "closes": "23:59",
      },
    },
  ],
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }} />
      <header className={styles.pageHeader}>
        <div className="container">
          <p className={styles.headerLabel}>We&apos;re Here to Help</p>
          <h1 className={styles.pageTitle}>Get In Touch</h1>
          <p className={styles.headerSubtitle}>
            Available 24/7 for bookings, queries, and corporate travel arrangements.
          </p>
        </div>
      </header>

      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactGrid}>

            {/* Left: Info */}
            <div className={styles.infoPanel}>
              <h2>Contact Information</h2>
              <p className={styles.infoDesc}>
                Reach out to us anytime. Our team typically responds within minutes.
              </p>

              <div className={styles.infoItems}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}><Phone size={20} strokeWidth={1.5} /></div>
                  <div>
                    <h3>Phone</h3>
                    <a href="tel:+919780426567">+91 97804 26567</a>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}><Mail size={20} strokeWidth={1.5} /></div>
                  <div>
                    <h3>Email</h3>
                    <a href="mailto:info@lookride.in">info@lookride.in</a>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}><MapPin size={20} strokeWidth={1.5} /></div>
                  <div>
                    <h3>Location</h3>
                    <p>Tricity Area, Punjab<br />North India</p>
                  </div>
                </div>
              </div>

              <div className={styles.availability}>
                <div className={styles.availDot} />
                <span>Available 24 hours a day, 7 days a week</span>
              </div>
            </div>

            {/* Right: Live Form */}
            <div className={styles.formPanel}>
              <div className={styles.formHeader}>
                <MessageSquare size={20} strokeWidth={1.5} />
                <h3>Send Us a Message</h3>
              </div>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
