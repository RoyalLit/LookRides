'use client';

import { Phone, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './MobileStickyCta.module.css';

export default function MobileStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`${styles.mobileCtaBar} ${visible ? styles.visible : styles.hidden}`}>
      <a
        href="tel:+919780426567"
        className={`${styles.btn} ${styles.call}`}
      >
        <Phone size={16} />
        Call Now
      </a>
      <a
        href="https://wa.me/919780426567?text=Hi!%20I%20want%20to%20book%20a%20cab%20with%20LookRides."
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.btn} ${styles.whatsapp}`}
      >
        <MessageSquare size={16} />
        WhatsApp
      </a>
      <Link
        href="/"
        scroll={false}
        className={`${styles.btn} ${styles.book}`}
      >
        Book Now
      </Link>
    </div>
  );
}
