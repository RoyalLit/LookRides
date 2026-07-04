'use client';

import Link from 'next/link';
import { Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';
import { BUSINESS_PHONE, BUSINESS_PHONE_DISPLAY } from '@/lib/config';
import styles from './Header.module.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/fleet', label: 'Our Fleet' },
  { href: '/blog', label: 'Travel Blog' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

const routeLinks = [
  { href: '/airport-transfers', label: 'Airport Transfers' },
  { href: '/routes/chandigarh-to-delhi', label: 'Chandigarh→Delhi' },
  { href: '/routes/chandigarh-to-manali', label: 'Chandigarh→Manali' },
  { href: '/routes/chandigarh-to-shimla', label: 'Chandigarh→Shimla' },
  { href: '/routes/chandigarh-to-amritsar', label: 'Chandigarh→Amritsar' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [routesOpen, setRoutesOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo} onClick={() => setMobileOpen(false)}>
          <Logo variant="dark" height={46} />
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className={styles.navLink}>{l.label}</Link>
          ))}
          <div
            className={styles.dropdown}
            onMouseEnter={() => setRoutesOpen(true)}
            onMouseLeave={() => setRoutesOpen(false)}
            onFocus={() => setRoutesOpen(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setRoutesOpen(false);
              }
            }}
          >
            <button
              className={styles.navLink}
              style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
              aria-expanded={routesOpen}
              aria-haspopup="true"
              onClick={() => setRoutesOpen(!routesOpen)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setRoutesOpen(false);
              }}
            >
              Routes ▾
            </button>
            {routesOpen && (
              <div className={styles.dropdownMenu} role="menu">
                {routeLinks.map((r) => (
                  <Link key={r.href} href={r.href} className={styles.dropdownItem} role="menuitem">{r.label}</Link>
                ))}
                <Link href="/routes" className={styles.dropdownItem} style={{ borderTop: '1px solid var(--border)', marginTop: '0.25rem', paddingTop: '0.75rem' }} role="menuitem">
                  View All Routes →
                </Link>
              </div>
            )}
          </div>
        </nav>

        <div className={styles.actions}>
          <a href={`tel:${BUSINESS_PHONE}`} className={styles.phone}>
            <Phone size={15} />
            {BUSINESS_PHONE_DISPLAY}
          </a>
          <Link href="/" className="btn btn-primary btn-sm" scroll={false}>Book Now</Link>
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav} aria-label="Mobile navigation">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>
                {l.label}
              </Link>
            ))}
            <div className={styles.mobileSectionLabel}>Popular Routes</div>
            {routeLinks.map((r) => (
              <Link key={r.href} href={r.href} className={styles.mobileRouteLink} onClick={() => setMobileOpen(false)}>
                {r.label}
              </Link>
            ))}
          </nav>
          <div className={styles.mobileCta}>
            <a href={`tel:${BUSINESS_PHONE}`} className={styles.mobilePhone}>
              <Phone size={15} /> {BUSINESS_PHONE_DISPLAY}
            </a>
            <Link href="/" className="btn btn-primary" onClick={() => setMobileOpen(false)}>Book Now</Link>
          </div>
        </div>
      )}
    </header>
  );
}
