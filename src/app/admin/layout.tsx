'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
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
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session && pathname !== '/admin/login') {
          router.push('/admin/login');
        } else if (session && pathname === '/admin/login') {
          router.push('/admin');
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch {
        setAuthError(true);
        setLoading(false);
      }
    };

    checkSession();
  }, [router, pathname]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch {
      // signOut failed silently
    }
    router.push('/admin/login');
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
        <button onClick={() => router.push('/admin/login')} className="btn btn-primary btn-sm">
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
