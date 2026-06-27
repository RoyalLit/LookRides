'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabaseBrowser as supabase, GoogleReview } from '@/lib/supabase-browser';
import { Plus, Edit2, Trash2, Save, X, Star, Eye, EyeOff } from 'lucide-react';
import { SkeletonTable } from '@/components/Skeleton';
import styles from '../admin.module.css';

export default function ReviewsManagement() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<GoogleReview>>({});

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) setReviews(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleToggleVisibility = useCallback(async (review: GoogleReview) => {
    const { error } = await supabase
      .from('reviews')
      .update({ is_visible: !review.is_visible })
      .eq('id', review.id);
    if (!error) fetchReviews();
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    if (confirm('Delete this review?')) {
      const { error } = await supabase.from('reviews').delete().eq('id', id);
      if (!error) fetchReviews();
    }
  }, []);

  const handleSave = useCallback(async () => {
    if (editingId === 'new') {
      const { error } = await supabase.from('reviews').insert([formData]);
      if (!error) fetchReviews();
    } else {
      const { error } = await supabase.from('reviews').update(formData).eq('id', editingId);
      if (!error) fetchReviews();
    }
    setEditingId(null);
  }, []);

  const handleEdit = useCallback((review: GoogleReview) => {
    setEditingId(review.id);
    setFormData(review);
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.pageHeader}>
        <h1>Customer Reviews</h1>
        <button className="btn btn-outline btn-sm" onClick={() => { setEditingId('new'); setFormData({ author: '', text: '', rating: 5, city: '', is_visible: true }); }}>
          <Plus size={16} /> Add Review
        </button>
      </header>

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
