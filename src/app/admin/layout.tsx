'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { LayoutDashboard, Car, Map, Star, Settings, LogOut, CalendarCheck } from 'lucide-react';
import Logo from '@/components/Logo';
import styles from './admin.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const pathname = usePathname();

  const redirect = useCallback((to: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = to;
    }
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN') {
          if (pathname === '/admin/login') redirect('/admin');
          else setLoading(false);
        } else if (event === 'INITIAL_SESSION') {
          if (session) {
            if (pathname === '/admin/login') redirect('/admin');
            else setLoading(false);
          } else {
            if (pathname !== '/admin/login') redirect('/admin/login');
            else setLoading(false);
          }
        } else if (event === 'SIGNED_OUT') {
          if (pathname !== '/admin/login') redirect('/admin/login');
          else setLoading(false);
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, [pathname, redirect]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Verifying secure session...</p>
      </div>
    );
  }

  if (authError) {
    return (
      <div className={styles.loadingContainer}>
        <p>Failed to verify session. Please try logging in again.</p>
        <button onClick={() => redirect('/admin/login')} className="btn btn-primary btn-sm">
          Go to Login
        </button>
      </div>
    );
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Bookings', href: '/admin/bookings', icon: CalendarCheck },
    { label: 'Fleet', href: '/admin/fleet', icon: Car },
    { label: 'Pricing', href: '/admin/pricing', icon: Map },
    { label: 'Reviews', href: '/admin/reviews', icon: Star },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          <Logo variant="dark" height={40} />
          <span className={styles.adminBadge}>ADMIN PANEL</span>
        </div>
        <nav className={styles.sidebarNav}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`${styles.navLink} ${isActive ? styles.activeLink : ''}`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className={styles.sidebarFooter}>
          <button onClick={handleSignOut} className={styles.signOutBtn}>
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>
      <main className={styles.adminContent}>
        {children}
      </main>
    </div>
  );
}
