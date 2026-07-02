'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { Spinner } from '@/components/Skeleton';
import { supabaseBrowser as supabase } from '@/lib/supabase-browser';

const MAX_ATTEMPTS = 5;
const INITIAL_COOLDOWN_MS = 5_000;

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cooldownMs, setCooldownMs] = useState(0);
  const attemptCountRef = useRef(0);
  const cooldownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
    };
  }, []);

  const startCooldown = () => {
    attemptCountRef.current += 1;
    const delay = attemptCountRef.current >= MAX_ATTEMPTS
      ? Math.min(60_000, INITIAL_COOLDOWN_MS * (2 ** (attemptCountRef.current - MAX_ATTEMPTS)))
      : INITIAL_COOLDOWN_MS;
    setCooldownMs(delay);

    cooldownTimerRef.current = setInterval(() => {
      setCooldownMs((prev) => {
        const next = prev - 1000;
        if (next <= 0) {
          if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
          return 0;
        }
        return next;
      });
    }, 1000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cooldownMs > 0) return;

    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        startCooldown();
        throw error;
      }

      if (!data.session) {
        startCooldown();
        throw new Error('Authentication failed');
      }

      const isAdmin = data.session.user?.user_metadata?.is_admin === true;
      if (!isAdmin) {
        await supabase.auth.signOut();
        startCooldown();
        setError('Access denied. Admin privileges required.');
        setLoading(false);
        return;
      }

      // Reset on success
      attemptCountRef.current = 0;
      router.push('/admin');
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={`glass-panel ${styles.loginBox}`}>
        <div className={styles.loginHeader}>
          <h1 className={styles.title}>Secure Portal</h1>
          <p className={styles.subtitle}>Authorized personnel only</p>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required 
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required 
            />
          </div>
          <button 
            type="submit" 
            className={`btn btn-primary ${styles.submitBtn}`}
            disabled={loading || cooldownMs > 0}
          >
            {loading ? (
              <Spinner size={18} light />
            ) : cooldownMs > 0 ? (
              `Wait ${Math.ceil(cooldownMs / 1000)}s`
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
