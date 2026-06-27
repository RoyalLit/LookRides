'use client';

import { useState, useEffect, useCallback } from 'react';
import { Save, Globe, Star } from 'lucide-react';
import { SkeletonTable, Spinner } from '@/components/Skeleton';
import styles from '../admin.module.css';

export default function SettingsManagement() {
  const [settings, setSettings] = useState<{key: string, value: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/settings');
      if (!res.ok) {
        const err = await res.json();
        alert('Failed to load settings: ' + (err.error || 'Unknown error'));
        return;
      }
      const data = await res.json();
      setSettings(data);
    } catch (err: unknown) {
      alert('Failed to load settings: ' + (err instanceof Error ? err.message : 'Network error'));
    }
    setLoading(false);
  }, []);

  const handleUpdate = useCallback((key: string, value: string) => {
    setSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s));
  }, []);

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    setMessage('');
    try {
      const results = await Promise.allSettled(
        settings.map(setting =>
          fetch('/api/admin/settings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key: setting.key, value: setting.value }),
          }).then(async res => {
            if (!res.ok) throw new Error((await res.json()).error || 'Unknown error');
          })
        )
      );

      const failed = results.filter(r => r.status === 'rejected');
      if (failed.length > 0) {
        setMessage(`Saved ${settings.length - failed.length}/${settings.length} settings. Some failed.`);
      } else {
        setMessage('All settings saved successfully!');
      }
    } catch (err: unknown) {
      setMessage('Failed to save settings: ' + (err instanceof Error ? err.message : 'Network error'));
    }
    setSaving(false);
    setTimeout(() => setMessage(''), 4000);
  }, [settings]);

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.pageHeader}>
        <h1>Site Settings</h1>
        <button className="btn btn-primary btn-sm" onClick={handleSave} disabled={saving}>
          {saving ? <Spinner size={16} light /> : <Save size={16} />} {saving ? '' : 'Save All Settings'}
        </button>
      </header>
      {message && (
        <div style={{
          padding: '0.75rem 1rem', marginBottom: '1rem', borderRadius: '6px',
          background: message.includes('failed') ? '#fef2f2' : '#f0fdf4',
          color: message.includes('failed') ? '#991b1b' : '#166534',
          fontSize: '0.875rem', border: `1px solid ${message.includes('failed') ? '#fecaca' : '#bbf7d0'}`
        }}>
          {message}
        </div>
      )}

      {loading ? (
        <SkeletonTable rows={4} />
      ) : (
      <div className={styles.formGrid}>
        <div className={`glass-panel ${styles.tableContainer}`} style={{ gridColumn: 'span 1' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Star size={24} color="#FCA311" />
            <h2 style={{ margin: 0 }}>Social Proof</h2>
          </div>
          
          <div className={styles.formField} style={{ marginBottom: '1.5rem' }}>
            <label>Google Business Rating</label>
            <input 
              type="text" 
              value={settings.find(s => s.key === 'google_rating')?.value || ''} 
              onChange={e => handleUpdate('google_rating', e.target.value)}
              placeholder="e.g. 4.8"
            />
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Shown in the Hero badge.</p>
          </div>

          <div className={styles.formField}>
            <label>Verified Review Count</label>
            <input 
              type="text" 
              value={settings.find(s => s.key === 'review_count')?.value || ''} 
              onChange={e => handleUpdate('review_count', e.target.value)}
              placeholder="e.g. 54"
            />
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total review count displayed on site.</p>
          </div>

        </div>

        <div className={`glass-panel ${styles.tableContainer}`} style={{ gridColumn: 'span 1' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Globe size={24} color="#60a5fa" />
            <h2 style={{ margin: 0 }}>Notifications</h2>
          </div>
          
          <div className={styles.formField} style={{ marginBottom: '1.5rem' }}>
            <label>Admin Notification Email</label>
            <input 
              type="email" 
              value={settings.find(s => s.key === 'notification_email')?.value || ''} 
              onChange={e => handleUpdate('notification_email', e.target.value)}
              placeholder="e.g. admin@lookride.in"
            />
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Bookings will be sent here via Resend.</p>
          </div>

          <div className={styles.formField}>
            <label>Telegram Chat ID</label>
            <input 
              type="text" 
              value={settings.find(s => s.key === 'telegram_chat_id')?.value || ''} 
              onChange={e => handleUpdate('telegram_chat_id', e.target.value)}
              placeholder="Enter your Chat ID"
            />
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Get instant WhatsApp-like alerts for FREE.</p>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
