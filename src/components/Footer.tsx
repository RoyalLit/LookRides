import Link from 'next/link';
import { Phone, Mail, MapPin, Star, Shield } from 'lucide-react';
import Logo from './Logo';
import styles from './Footer.module.css';

const routeLinks = [
  { href: '/routes/chandigarh-to-delhi', label: 'Chandigarh to Delhi' },
  { href: '/routes/chandigarh-to-manali', label: 'Chandigarh to Manali' },
  { href: '/routes/chandigarh-to-shimla', label: 'Chandigarh to Shimla' },
  { href: '/routes/chandigarh-to-amritsar', label: 'Chandigarh to Amritsar' },
  { href: '/routes/chandigarh-to-delhi-airport', label: 'Chandigarh to Delhi Airport' },
  { href: '/routes/chandigarh-to-dharamshala', label: 'Chandigarh to Dharamshala' },
  { href: '/routes/chandigarh-to-dehradun', label: 'Chandigarh to Dehradun' },
  { href: '/routes/one-way-cab-chandigarh', label: 'One Way Cab Chandigarh' },
];

const airportLinks = [
  { href: '/routes/derabassi-to-chandigarh-airport', label: 'Derabassi to Airport' },
  { href: '/routes/mohali-to-chandigarh-airport', label: 'Mohali to Airport' },
  { href: '/routes/panchkula-to-chandigarh-airport', label: 'Panchkula to Airport' },
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
            North India&apos;s premium intercity cab service. Professional drivers, 
            transparent pricing, and 24/7 support across Chandigarh, Punjab, 
            Haryana, Himachal & Delhi.
          </p>
          <div className={styles.rating}>
            <Star size={14} fill="currentColor" /> 4.8 ★ on Google
            <span className={styles.dot}>·</span>
            54 Verified Reviews
          </div>
          <div className={styles.contacts}>
            <a href="tel:+919780426567" className={styles.contactItem}>
              <Phone size={14} /> +91 97804 26567
            </a>
            <a href="mailto:info@lookride.in" className={styles.contactItem}>
              <Mail size={14} /> info@lookride.in
            </a>
            <span className={styles.contactItem}>
              <MapPin size={14} /> Derabassi, Punjab — Serving Tricity & North India
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
          <h4>Airport Transfers</h4>
          <ul>
            {airportLinks.map((r) => (
              <li key={r.href}><Link href={r.href}>{r.label}</Link></li>
            ))}
          </ul>
          <h4 style={{ marginTop: '2rem' }}>Services</h4>
          <ul>
            <li><Link href="/services">All Services</Link></li>
            <li><Link href="/fleet">Our Fleet</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className={styles.linksGroup}>
          <h4>Why LookRides</h4>
          <ul>
            <li><Shield size={12} style={{ display: 'inline', marginRight: '0.25rem', opacity: 0.5 }} /> Verified Drivers</li>
            <li><Shield size={12} style={{ display: 'inline', marginRight: '0.25rem', opacity: 0.5 }} /> Fixed Pricing</li>
            <li><Shield size={12} style={{ display: 'inline', marginRight: '0.25rem', opacity: 0.5 }} /> GPS Tracked Rides</li>
            <li><Shield size={12} style={{ display: 'inline', marginRight: '0.25rem', opacity: 0.5 }} /> 24/7 Support</li>
            <li><Shield size={12} style={{ display: 'inline', marginRight: '0.25rem', opacity: 0.5 }} /> Sanitized Vehicles</li>
            <li><Shield size={12} style={{ display: 'inline', marginRight: '0.25rem', opacity: 0.5 }} /> Flight Tracking</li>
          </ul>
        </div>

      </div>

      <div className={styles.footerBottom}>
        <div className="container">
          <p>© {new Date().getFullYear()} LookRides. All rights reserved. Premium intercity taxi service in North India.</p>
          <p>Serving Chandigarh · Mohali · Panchkula · Derabassi · Zirakpur · Punjab</p>
        </div>
      </div>
    </footer>
  );
}
