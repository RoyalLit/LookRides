'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CreditCard, CheckCircle, XCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Logo from '@/components/Logo';

export default function PaymentClient({ link, payuFields }: { link: any; payuFields: any }) {
  const searchParams = useSearchParams();
  const [currentStatus, setCurrentStatus] = useState(link.status);

  useEffect(() => {
    const statusParam = searchParams.get('status');
    if (statusParam === 'success') {
      setCurrentStatus('success');
    } else if (statusParam === 'failed') {
      setCurrentStatus('failed');
    }
  }, [searchParams]);

  if (currentStatus === 'success') {
    return (
      <div className="glass-panel" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <CheckCircle size={64} color="#4ade80" style={{ margin: '0 auto 20px' }} />
        <h1 style={{ marginBottom: '10px' }}>Payment Successful!</h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>Thank you for your payment of ₹{link.amount}.</p>
        <p style={{ fontSize: '0.9rem', color: '#999' }}>Transaction ID: {link.transaction_id || 'N/A'}</p>
        <Link href="/" className="btn btn-primary" style={{ marginTop: '30px', display: 'inline-block' }}>Return Home</Link>
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
      <p style={{ color: '#666', marginBottom: '30px' }}>Securely complete your LookRides booking via PayU.</p>

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

      <form action={payuFields.payuUrl} method="POST">
        <input type="hidden" name="key" value={payuFields.key} />
        <input type="hidden" name="txnid" value={payuFields.txnid} />
        <input type="hidden" name="amount" value={payuFields.amount} />
        <input type="hidden" name="productinfo" value={payuFields.productinfo} />
        <input type="hidden" name="firstname" value={payuFields.firstname} />
        <input type="hidden" name="email" value={payuFields.email} />
        <input type="hidden" name="phone" value={payuFields.phone} />
        <input type="hidden" name="surl" value={payuFields.surl} />
        <input type="hidden" name="furl" value={payuFields.furl} />
        <input type="hidden" name="hash" value={payuFields.hash} />
        <input type="hidden" name="udf1" value={payuFields.udf1} />

        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ width: '100%', padding: '14px', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
        >
          <CreditCard size={20} />
          Pay ₹{link.amount} Securely
        </button>
      </form>

      <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        Secured by PayU
      </p>
    </div>
  );
}
