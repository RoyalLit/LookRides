'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabaseBrowser as supabase } from '@/lib/supabase-browser';
import { LayoutDashboard, Car, Map, Star, Settings, LogOut, CalendarCheck } from 'lucide-react';
import Logo from '@/components/Logo';
import styles from './admin.module.css';
import type { Session } from '@supabase/supabase-js';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Load initial session + subscribe to auth changes once
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  // React to session/pathname changes — redirect if needed
  useEffect(() => {
    if (loading) return;
    if (!session && pathname !== '/admin/login') {
      router.replace('/admin/login');
    } else if (session && pathname === '/admin/login') {
      router.replace('/admin');
    }
  }, [session, pathname, loading, router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Logo variant="dark" height={40} />
            <button onClick={handleSignOut} className={styles.mobileSignOutBtn} aria-label="Sign Out">
              <LogOut size={20} />
            </button>
          </div>
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
