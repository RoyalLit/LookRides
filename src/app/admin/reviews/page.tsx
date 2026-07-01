'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Edit2, Trash2, Save, X, Star, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { SkeletonTable } from '@/components/Skeleton';
import styles from '../admin.module.css';

interface GoogleReview {
  id: string;
  author: string;
  text: string;
  rating: number;
  city: string;
  is_visible: boolean;
  created_at: string;
}

export default function ReviewsManagement() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<GoogleReview>>({});

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/reviews');
      if (res.ok) setReviews(await res.json());
    } catch {
      console.error('Failed to fetch reviews');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSync = useCallback(async () => {
    setSyncing(true);
    setSyncMessage('');
    try {
      const res = await fetch('/api/admin/reviews/sync', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        setSyncMessage('Sync failed: ' + (data.error || 'Unknown error'));
        return;
      }
      setSyncMessage(`Sync complete! Rating: ${data.rating} ★, Total: ${data.total_reviews}, Imported: ${data.imported}, Skipped: ${data.skipped}`);
      fetchReviews();
    } catch (err: unknown) {
      setSyncMessage('Sync failed: ' + (err instanceof Error ? err.message : 'Network error'));
    }
    setSyncing(false);
    setTimeout(() => setSyncMessage(''), 6000);
  }, []);

  const handleToggleVisibility = useCallback(async (review: GoogleReview) => {
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: review.id, is_visible: !review.is_visible }),
      });
      if (res.ok) fetchReviews();
    } catch {
      console.error('Failed to toggle visibility');
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('Delete this review?')) return;
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchReviews();
    } catch {
      console.error('Failed to delete review');
    }
  }, []);

  const handleSave = useCallback(async () => {
    try {
      const url = '/api/admin/reviews';
      if (editingId === 'new') {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Failed to save');
      } else {
        const res = await fetch(url, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...formData }),
        });
        if (!res.ok) throw new Error('Failed to save');
      }
      fetchReviews();
      setEditingId(null);
    } catch (err: unknown) {
      console.error('Failed to save review:', err);
    }
  }, []);

  const handleEdit = useCallback((review: GoogleReview) => {
    setEditingId(review.id);
    setFormData(review);
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.pageHeader}>
        <h1>Customer Reviews</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className="btn btn-outline btn-sm"
            onClick={handleSync}
            disabled={syncing}
            title="Import latest reviews from Google Business Profile"
          >
            <RefreshCw size={16} style={syncing ? { animation: 'spin 1s linear infinite' } : undefined} /> {syncing ? 'Syncing...' : 'Sync from Google'}
          </button>
          <button className="btn btn-outline btn-sm" onClick={() => { setEditingId('new'); setFormData({ author: '', text: '', rating: 5, city: '', is_visible: true }); }}>
            <Plus size={16} /> Add Review
          </button>
        </div>
      </header>

      {syncMessage && (
        <div style={{
          padding: '0.75rem 1rem', marginBottom: '1rem', borderRadius: '6px',
          background: syncMessage.includes('failed') ? '#fef2f2' : '#f0fdf4',
          color: syncMessage.includes('failed') ? '#991b1b' : '#166534',
          fontSize: '0.875rem', border: `1px solid ${syncMessage.includes('failed') ? '#fecaca' : '#bbf7d0'}`
        }}>
          {syncMessage}
        </div>
      )}

      {editingId && (
        <div className={`glass-panel ${styles.tableContainer}`} style={{ marginBottom: '2rem' }}>
          <h2>{editingId === 'new' ? 'Add Review' : 'Edit Review'}</h2>
          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <label>Customer Name</label>
              <input 
                value={formData.author || ''} 
                onChange={e => setFormData({...formData, author: e.target.value})} 
              />
            </div>
            <div className={styles.formField}>
              <label>City</label>
              <input 
                value={formData.city || ''} 
                onChange={e => setFormData({...formData, city: e.target.value})} 
              />
            </div>
            <div className={styles.formField}>
              <label>Rating (1-5)</label>
              <select 
                value={formData.rating || 5} 
                onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})}
              >
                {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
              </select>
            </div>
            <div className={styles.formField} style={{ gridColumn: 'span 2' }}>
              <label>Review Text</label>
              <textarea 
                rows={3}
                value={formData.text || ''} 
                onChange={e => setFormData({...formData, text: e.target.value})} 
              />
            </div>
          </div>
          <div className={styles.actionCell} style={{ marginTop: '1.5rem', justifyContent: 'flex-end' }}>
            <button className="btn btn-outline btn-sm" onClick={() => setEditingId(null)}>
              <X size={16} /> Cancel
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleSave}>
              <Save size={16} /> Save Review
            </button>
          </div>
        </div>
      )}

      <div className={styles.tableContainer}>
        {loading ? (
          <SkeletonTable rows={5} />
        ) : reviews.length === 0 ? (
          <div className={styles.emptyState}>
            <Star size={48} opacity={0.2} style={{ marginBottom: '1rem' }} />
            <p>No reviews found. Click "Add Review" to add one.</p>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Review</th>
                <th>Rating</th>
                <th>Visible</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r) => (
                <tr key={r.id}>
                  <td style={{ verticalAlign: 'top' }}>
                    <div style={{ fontWeight: 600 }}>{r.author}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-secondary)' }}>{r.city}</div>
                  </td>
                  <td style={{ maxWidth: '400px' }}>
                    <p style={{ fontSize: '0.85rem', lineHeight: 1.4 }}>{r.text}</p>
                  </td>
                  <td style={{ color: 'var(--admin-accent)' }}>{"★".repeat(r.rating)}</td>
                  <td>
                    <button 
                      onClick={() => handleToggleVisibility(r)}
                      className={r.is_visible ? styles.editBtn : styles.deleteBtn}
                      title={r.is_visible ? 'Visible on site' : 'Hidden from site'}
                    >
                      {r.is_visible ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </td>
                  <td className={styles.actionCell}>
                    <button className={styles.editBtn} onClick={() => handleEdit(r)}>
                      <Edit2 size={16} />
                    </button>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(r.id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
