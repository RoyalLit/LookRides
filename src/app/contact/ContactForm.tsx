'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import styles from './contact.module.css';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get('name'),
      email: fd.get('email'),
      phone: fd.get('phone'),
      message: fd.get('message'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send.');
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div aria-live="polite" role="status">
        {success && (
          <div className={styles.successBox}>✓ &nbsp;Message sent! We&apos;ll get back to you shortly.</div>
        )}
        {error && (
          <div className={styles.errorBox}>{error}</div>
        )}
      </div>

      <div className={styles.formRow}>
        <div className={styles.field}>
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" placeholder="John Doe" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" placeholder="+91 98765 43210" />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" placeholder="john@example.com" required />
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={5} placeholder="Tell us how we can help…" required />
      </div>

      <button type="submit" className={styles.submitBtn} disabled={loading}>
        <Send size={16} />
        {loading ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
