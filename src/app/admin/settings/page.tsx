'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Save, ShieldCheck, Globe, Star } from 'lucide-react';
import styles from '../admin.module.css';

export default function SettingsManagement() {
  const [settings, setSettings] = useState<{key: string, value: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('site_settings').select('*');
    if (!error && data) setSettings(data);
    setLoading(false);
  };

  const handleUpdate = (key: string, value: string) => {
    setSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s));
  };

  const handleSave = async () => {
    setSaving(true);
    for (const setting of settings) {
      await supabase.from('site_settings').update({ value: setting.value }).eq('key', setting.key);
    }
    setSaving(false);
    alert('Settings updated successfully!');
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.pageHeader}>
        <h1>Site Settings</h1>
        <button className="btn btn-primary btn-sm" onClick={handleSave} disabled={saving}>
          <Save size={16} /> {saving ? 'Saving...' : 'Save All Settings'}
        </button>
      </header>

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

          <div className={styles.formField} style={{ marginBottom: '1.5rem' }}>
            <label>Telegram Bot Token (For Free Alerts)</label>
            <input 
              type="password" 
              value={settings.find(s => s.key === 'telegram_bot_token')?.value || ''} 
              onChange={e => handleUpdate('telegram_bot_token', e.target.value)}
              placeholder="Enter Bot Token from @BotFather"
            />
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
    </div>
  );
}
