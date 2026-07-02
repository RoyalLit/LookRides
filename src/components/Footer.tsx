import Link from 'next/link';
import { Phone, Mail, MapPin, Star, Shield } from 'lucide-react';
import Logo from './Logo';
import { BUSINESS_PHONE, BUSINESS_PHONE_DISPLAY } from '@/lib/config';
import styles from './Footer.module.css';

const routeLinks = [
  { href: '/routes/chandigarh-to-delhi', label: 'Chandigarh to Delhi' },
  { href: '/routes/chandigarh-to-manali', label: 'Chandigarh to Manali' },
  { href: '/routes/chandigarh-to-shimla', label: 'Chandigarh to Shimla' },
  { href: '/routes/chandigarh-to-amritsar', label: 'Chandigarh to Amritsar' },
  { href: '/routes/chandigarh-to-dharamshala', label: 'Chandigarh to Dharamshala' },
  { href: '/routes/chandigarh-to-dehradun', label: 'Chandigarh to Dehradun' },
  { href: '/routes/chandigarh-to-jammu', label: 'Chandigarh to Jammu' },
];

const destinationLinks = [
  { href: '/routes/chandigarh-to-delhi', label: 'Delhi NCR' },
  { href: '/routes/chandigarh-to-shimla', label: 'Shimla Hills' },
  { href: '/routes/chandigarh-to-manali', label: 'Manali Valley' },
  { href: '/routes/chandigarh-to-dharamshala', label: 'Dharamshala' },
  { href: '/routes/chandigarh-to-dehradun', label: 'Dehradun & Mussoorie' },
  { href: '/routes/chandigarh-to-amritsar', label: 'Amritsar City' },
];

const airportLinks = [
  { href: '/routes/derabassi-to-chandigarh-airport', label: 'Derabassi to IXC Airport' },
  { href: '/routes/mohali-to-chandigarh-airport', label: 'Mohali to IXC Airport' },
  { href: '/routes/panchkula-to-chandigarh-airport', label: 'Panchkula to IXC Airport' },
  { href: '/routes/chandigarh-to-delhi-airport', label: 'Chandigarh to IGI Delhi' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>

        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <Logo variant="light" height={55} />
          </Link>
          <p className={styles.tagline}>
            North India&apos;s premium intercity travel platform. Professional highway chauffeurs, 
            guaranteed fixed pricing, and 24/7 support across Punjab, Haryana, Himachal & Delhi.
          </p>
          <div className={styles.rating}>
            <Star size={14} fill="currentColor" /> 4.8 ★ on Google
            <span className={styles.dot}>·</span>
            54 Verified Reviews
          </div>
          <div className={styles.contacts}>
            <a href={`tel:${BUSINESS_PHONE}`} className={styles.contactItem}>
              <Phone size={14} /> {BUSINESS_PHONE_DISPLAY}
            </a>
            <a href="mailto:info@lookride.in" className={styles.contactItem}>
              <Mail size={14} /> info@lookride.in
            </a>
            <span className={styles.contactItem}>
              <MapPin size={14} /> Tricity Dispatch — Serving North India
            </span>
          </div>
        </div>

        <div className={styles.linksGroup}>
          <h4>Popular Routes</h4>
          <ul>
            {routeLinks.map((r) => (
              <li key={r.href}><Link href={r.href}>{r.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className={styles.linksGroup}>
          <h4>Destinations</h4>
          <ul>
            {destinationLinks.map((d) => (
              <li key={d.href}><Link href={d.href}>{d.label}</Link></li>
            ))}
          </ul>
          <h4 style={{ marginTop: '2rem' }}>Airport Transfers</h4>
          <ul>
            {airportLinks.map((r) => (
              <li key={r.href}><Link href={r.href}>{r.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className={styles.linksGroup}>
          <h4>Company</h4>
          <ul>
            <li><Link href="/about">About Our Mission</Link></li>
            <li><Link href="/services">Travel Services</Link></li>
            <li><Link href="/fleet">Our Premium Fleet</Link></li>
            <li><Link href="/blog">Travel Guides & Blog</Link></li>
            <li><Link href="/contact">Get in Touch</Link></li>
          </ul>

          <h4 style={{ marginTop: '2rem' }}>Why LookRides</h4>
          <ul className={styles.whyList}>
            <li><Shield size={12} className={styles.whyIcon} /> Verified Chauffeurs</li>
            <li><Shield size={12} className={styles.whyIcon} /> Fixed Upfront Prices</li>
            <li><Shield size={12} className={styles.whyIcon} /> Sanitized AC Fleet</li>
            <li><Shield size={12} className={styles.whyIcon} /> Real-time Flight Monitoring</li>
          </ul>
        </div>

      </div>

      <div className={styles.footerBottom}>
        <div className={`container ${styles.footerBottomInner}`}>
          <div>
            <p>© {new Date().getFullYear()} LookRides. All rights reserved. Premium intercity travel platform.</p>
            <p>Serving Chandigarh · Mohali · Panchkula · Zirakpur · Derabassi · Punjab · Delhi NCR</p>
          </div>
          <div className={styles.legalLinks}>
            <Link href="/terms">Terms & Conditions</Link>
            <span className={styles.dot}>·</span>
            <Link href="/privacy">Privacy Policy</Link>
            <span className={styles.dot}>·</span>
            <Link href="/cancellation">Cancellation & Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
