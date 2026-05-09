import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import Logo from './Logo';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>

        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <Logo variant="light" height={60} />
          </Link>
          <p className={styles.tagline}>
            Premium taxi, outstation cabs & tour services across the Tricity and North India. Professional drivers, transparent pricing.
          </p>
          <div className={styles.contacts}>
            <a href="tel:+919780426567" className={styles.contactItem}>
              <Phone size={14} /> +91 97804 26567
            </a>
            <a href="mailto:info@lookride.in" className={styles.contactItem}>
              <Mail size={14} /> info@lookride.in
            </a>
            <span className={styles.contactItem}>
              <MapPin size={14} /> Tricity Area, Punjab
            </span>
          </div>
        </div>

        <div className={styles.linksGroup}>
          <h4>Services</h4>
          <ul>
            <li><Link href="/services#airport">Airport Transfers</Link></li>
            <li><Link href="/services#outstation">Outstation Cabs</Link></li>
            <li><Link href="/services#local">Local Rentals</Link></li>
          </ul>
        </div>

        <div className={styles.linksGroup}>
          <h4>Company</h4>
          <ul>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/fleet">Our Fleet</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className={styles.linksGroup}>
          <h4>Popular Routes</h4>
          <ul>
            <li><Link href="/?pickup=Derabassi&drop=Chandigarh">Derabassi to Chandigarh</Link></li>
            <li><Link href="/?pickup=Chandigarh&drop=Delhi">Chandigarh to Delhi</Link></li>
            <li><Link href="/?pickup=Zirakpur&drop=Manali">Zirakpur to Manali</Link></li>
            <li><Link href="/?pickup=Chandigarh&drop=Shimla">Chandigarh to Shimla</Link></li>
            <li><Link href="/?pickup=Mohali&drop=Chandigarh+Airport">Mohali Airport Cab</Link></li>
          </ul>
        </div>

      </div>

      <div className={styles.footerBottom}>
        <div className="container">
          <p>© {new Date().getFullYear()} LookRides. All rights reserved.</p>
          <p>Serving the Tricity &amp; North India</p>
        </div>
      </div>
    </footer>
  );
}
