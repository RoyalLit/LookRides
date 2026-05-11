'use client';

import { Phone, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MobileStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 99,
        background: 'rgba(255,255,255,0.98)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid #E2E8F0',
        padding: '0.625rem 1rem',
        display: 'flex',
        gap: '0.625rem',
        alignItems: 'center',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
      }}
      className="mobile-cta-bar"
    >
      <a
        href="tel:+919780426567"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
          padding: '0.75rem 1rem',
          background: '#0B132B',
          color: '#fff',
          border: 'none',
          borderRadius: '0.625rem',
          fontSize: '0.875rem',
          fontWeight: 700,
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        <Phone size={16} />
        Call Now
      </a>
      <a
        href="https://wa.me/919780426567?text=Hi!%20I%20want%20to%20book%20a%20cab%20with%20LookRides."
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
          padding: '0.75rem 1rem',
          background: '#25D366',
          color: '#fff',
          border: 'none',
          borderRadius: '0.625rem',
          fontSize: '0.875rem',
          fontWeight: 700,
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        <MessageSquare size={16} />
        WhatsApp
      </a>
      <Link
        href="/"
        scroll={false}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
          padding: '0.75rem 1rem',
          background: '#FCA311',
          color: '#0B132B',
          border: 'none',
          borderRadius: '0.625rem',
          fontSize: '0.875rem',
          fontWeight: 700,
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        Book Now
      </Link>
    </div>
  );
}
