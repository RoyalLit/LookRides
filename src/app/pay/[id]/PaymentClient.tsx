'use client';

import { useState, useEffect } from 'react';
import { CreditCard, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Logo from '@/components/Logo';

export default function PaymentClient({ link }: { link: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const [currentStatus, setCurrentStatus] = useState(link.status);

  // If redirected back from PhonePe, we might want to check status again 
  // (PhonePe relies on S2S webhook, but we can poll or just show status based on query params initially)
  useEffect(() => {
    if (searchParams.get('status') === 'redirect') {
      // In a real app, you might poll the server here to wait for S2S webhook to complete.
      // For now, we'll just show a message.
    }
  }, [searchParams]);

  const handlePay = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentLinkId: link.id })
      });
      const data = await res.json();
      
      if (res.ok && data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        let errorMsg = data.error || 'Failed to initiate payment.';
        if (data.details && data.details.message) {
          errorMsg = `PhonePe Error: ${data.details.message}`;
        } else if (data.details && data.details.code) {
          errorMsg = `PhonePe Error: ${data.details.code}`;
        }
        setError(errorMsg);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while connecting to the payment gateway.');
      setLoading(false);
    }
  };

  if (currentStatus === 'success') {
    return (
      <div className="glass-panel" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <CheckCircle size={64} color="#4ade80" style={{ margin: '0 auto 20px' }} />
        <h1 style={{ marginBottom: '10px' }}>Payment Successful!</h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>Thank you for your payment of ₹{link.amount}.</p>
        <p style={{ fontSize: '0.9rem', color: '#999' }}>Transaction ID: {link.transaction_id || 'N/A'}</p>
        <a href="/" className="btn btn-primary" style={{ marginTop: '30px', display: 'inline-block' }}>Return Home</a>
      </div>
    );
  }

  if (currentStatus === 'failed') {
    return (
      <div className="glass-panel" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <XCircle size={64} color="#ef4444" style={{ margin: '0 auto 20px' }} />
        <h1 style={{ marginBottom: '10px' }}>Payment Failed</h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>Unfortunately, your payment could not be processed.</p>
        <button onClick={() => setCurrentStatus('pending')} className="btn btn-primary" style={{ marginTop: '20px' }}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ padding: '30px 20px', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <Logo variant="dark" height={40} />
      </div>
      
      <h1 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Payment Checkout</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>Securely complete your LookRides booking.</p>

      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '30px', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ color: '#666' }}>Amount Due:</span>
          <strong style={{ fontSize: '1.2rem' }}>₹{link.amount}</strong>
        </div>
        {link.purpose && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #eaeaea' }}>
            <span style={{ color: '#666' }}>Reference:</span>
            <span style={{ textAlign: 'right', maxWidth: '60%' }}>{link.purpose}</span>
          </div>
        )}
      </div>

      {error && (
        <div style={{ background: '#fee2e2', color: '#dc2626', padding: '12px', borderRadius: '6px', marginBottom: '20px', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      {searchParams.get('status') === 'redirect' && !error && (
        <div style={{ background: '#e0f2fe', color: '#0369a1', padding: '12px', borderRadius: '6px', marginBottom: '20px', fontSize: '0.9rem' }}>
          Verifying payment status... if you just paid, please wait a moment.
        </div>
      )}

      <button 
        onClick={handlePay} 
        disabled={loading}
        className="btn btn-primary" 
        style={{ width: '100%', padding: '14px', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
      >
        {loading ? <Loader2 className="spin" size={20} /> : <CreditCard size={20} />}
        {loading ? 'Processing...' : `Pay ₹${link.amount} Securely`}
      </button>

      <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        Secured by PhonePe
      </p>
    </div>
  );
}
