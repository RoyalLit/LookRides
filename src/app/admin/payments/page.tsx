'use client';

import { useEffect, useState, useCallback } from 'react';
import { Copy, Link as LinkIcon, MessageCircle, Mail, Plus, Check } from 'lucide-react';
import { SkeletonTable } from '@/components/Skeleton';
import styles from '../admin.module.css';

interface PaymentLink {
  id: string;
  amount: number;
  customer_email: string | null;
  customer_phone: string | null;
  purpose: string | null;
  status: string;
  created_at: string;
}

export default function PaymentsManagement() {
  const [links, setLinks] = useState<PaymentLink[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [purpose, setPurpose] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchLinks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/payment-links');
      if (res.ok) setLinks(await res.json());
    } catch {
      console.error('Failed to fetch payment links');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/payment-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount),
          customer_email: email,
          customer_phone: phone,
          purpose
        })
      });

      if (res.ok) {
        setAmount(''); setEmail(''); setPhone(''); setPurpose('');
        fetchLinks();
      } else {
        alert('Failed to create link');
      }
    } catch (err) {
      console.error(err);
      alert('Error creating link');
    }
    setIsSubmitting(false);
  };

  const copyToClipboard = (id: string) => {
    const url = `${window.location.origin}/pay/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openWhatsApp = (link: PaymentLink) => {
    const url = `${window.location.origin}/pay/${link.id}`;
    const text = `Hello! Please click the link below to securely pay ₹${link.amount} for your LookRides booking. \n\n${link.purpose ? `Details: ${link.purpose}\n\n` : ''}Payment Link: ${url}`;
    const waUrl = `https://wa.me/${link.customer_phone?.replace(/\D/g, '') || ''}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  const sendEmail = async (id: string) => {
    if (!confirm('Are you sure you want to send the payment link via email?')) return;
    try {
      const res = await fetch('/api/payments/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentLinkId: id })
      });
      if (res.ok) {
        alert('Email sent successfully!');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to send email');
      }
    } catch (err) {
      console.error(err);
      alert('Error sending email');
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'success': return <span className={`${styles.statusBadge} ${styles.statusActive}`}>Paid</span>;
      case 'failed': return <span className={`${styles.statusBadge} ${styles.statusInactive}`}>Failed</span>;
      default: return <span className={`${styles.statusBadge}`} style={{background: '#f5b754', color: '#1a1a1a'}}>Pending</span>;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.pageHeader}>
        <h1>Payment Links</h1>
        <p>Generate and manage PhonePe payment links for customers</p>
      </header>

      <div className={styles.formGrid}>
        {/* Create Link Form */}
        <div className={`glass-panel ${styles.tableContainer}`} style={{ gridColumn: 'span 1' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--admin-border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>Create New Link</h2>
          </div>
          <div style={{ padding: '1.5rem' }}>
            <form onSubmit={handleCreate}>
              <div className={styles.formField} style={{ marginBottom: '1.5rem' }}>
                <label>Amount (₹) *</label>
                <input 
                  type="number" 
                  min="1" 
                  step="0.01" 
                  required 
                  value={amount} 
                  onChange={e => setAmount(e.target.value)}
                  placeholder="e.g. 1500"
                />
              </div>
              <div className={styles.formField} style={{ marginBottom: '1.5rem' }}>
                <label>Customer Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Required for email delivery"
                />
              </div>
              <div className={styles.formField} style={{ marginBottom: '1.5rem' }}>
                <label>Customer Phone</label>
                <input 
                  type="tel" 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)}
                  placeholder="For WhatsApp (e.g. 919876543210)"
                />
              </div>
              <div className={styles.formField} style={{ marginBottom: '1.5rem' }}>
                <label>Purpose / Reference</label>
                <input 
                  type="text" 
                  value={purpose} 
                  onChange={e => setPurpose(e.target.value)}
                  placeholder="e.g. Advance for Chandigarh to Manali"
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                <Plus size={18} /> {isSubmitting ? 'Generating...' : 'Generate Payment Link'}
              </button>
            </form>
          </div>
        </div>

        {/* Recent Links */}
        <div className={`glass-panel ${styles.tableContainer}`} style={{ gridColumn: 'span 1' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--admin-border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>Generated Links</h2>
          </div>
          {loading ? <div style={{ padding: '1.5rem' }}><SkeletonTable /></div> : (
            <div className={styles.tableResponsive}>
              <table className={styles.adminTable}>
                <thead>
                  <tr>
                    <th>Amount</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {links.map(link => (
                    <tr key={link.id}>
                      <td><strong>₹{link.amount}</strong></td>
                      <td>
                        <div style={{fontSize: '0.85rem', color: '#888'}}>
                          {link.customer_email && <div>{link.customer_email}</div>}
                          {link.customer_phone && <div>{link.customer_phone}</div>}
                          {link.purpose && <div><em>{link.purpose}</em></div>}
                          {!link.customer_email && !link.customer_phone && !link.purpose && '-'}
                        </div>
                      </td>
                      <td>{getStatusBadge(link.status)}</td>
                      <td>
                        <div className={styles.actionButtons}>
                          <button onClick={() => copyToClipboard(link.id)} className={styles.iconBtn} title="Copy Link">
                            {copiedId === link.id ? <Check size={16} color="#4ade80" /> : <Copy size={16} />}
                          </button>
                          <button onClick={() => openWhatsApp(link)} className={styles.iconBtn} title="Share via WhatsApp">
                            <MessageCircle size={16} color="#25D366" />
                          </button>
                          {link.customer_email && (
                            <button onClick={() => sendEmail(link.id)} className={styles.iconBtn} title="Send Email">
                              <Mail size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {links.length === 0 && (
                    <tr><td colSpan={4} style={{textAlign: 'center', padding: '2rem'}}>No payment links generated yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
