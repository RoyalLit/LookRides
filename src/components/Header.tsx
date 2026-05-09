'use client';

import Link from 'next/link';
import { Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';
import styles from './Header.module.css';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/fleet', label: 'Our Fleet' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo} onClick={() => setMobileOpen(false)}>
          <Logo variant="dark" height={50} />
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav}>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className={styles.navLink}>{l.label}</Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className={styles.actions}>
          <a href="tel:+919780426567" className={styles.phone}>
            <Phone size={15} />
            +91 97804 26567
          </a>
          <Link href="/" className="btn btn-primary">Book Now</Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className={styles.mobileCta}>
            <a href="tel:+919780426567" className={styles.mobilePhone}>
              <Phone size={15} /> +91 97804 26567
            </a>
            <Link href="/" className="btn btn-primary" onClick={() => setMobileOpen(false)}>Book Now</Link>
          </div>
        </div>
      )}
    </header>
  );
}
