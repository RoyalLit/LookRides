'use client';

import { useEffect, useState, useCallback } from 'react';
import { Copy, Link as LinkIcon, Mail, Plus, Check } from 'lucide-react';
import { SkeletonTable } from '@/components/Skeleton';
import styles from '../admin.module.css';

const WhatsAppIcon = ({ size = 18, color = "#25D366" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

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
            <div className={styles.tableContainer} style={{ padding: 0, border: 'none', boxShadow: 'none' }}>
              <table className={styles.table}>
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
                          <button onClick={() => copyToClipboard(link.id)} className={styles.actionBtn} title="Copy Link">
                            {copiedId === link.id ? <Check size={18} color="#4ade80" /> : <Copy size={18} />}
                          </button>
                          <button onClick={() => openWhatsApp(link)} className={styles.actionBtn} title="Share via WhatsApp">
                            <WhatsAppIcon size={18} />
                          </button>
                          {link.customer_email && (
                            <button onClick={() => sendEmail(link.id)} className={styles.actionBtn} title="Send Email">
                              <Mail size={18} />
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
