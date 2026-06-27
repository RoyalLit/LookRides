'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabaseBrowser as supabase, PricingRoute } from '@/lib/supabase-browser';
import { Plus, Edit2, Trash2, Save, X, Map } from 'lucide-react';
import { SkeletonTable } from '@/components/Skeleton';
import styles from '../admin.module.css';

export default function PricingManagement() {
  const [routes, setRoutes] = useState<PricingRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<PricingRoute>>({});

  const fetchRoutes = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('pricing_routes')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (!error && data) setRoutes(data);
    setLoading(false);
  }, []);

  const handleEdit = useCallback((route: PricingRoute) => {
    setEditingId(route.id);
    setFormData(route);
  }, []);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleAddNew = useCallback(() => {
    setEditingId('new');
    setFormData({
      from_city: '',
      to_city: '',
      distance: '',
      sedan_price: '',
      suv_price: '',
      order_index: routes.length,
    });
  }, []);

  const handleSave = useCallback(async () => {
    if (!formData.from_city?.trim()) { alert('From (Source) location is required.'); return; }
    if (!formData.to_city?.trim()) { alert('To (Destination) location is required.'); return; }
    if (!formData.sedan_price?.toString().trim()) { alert('Sedan price is required.'); return; }
    if (!formData.suv_price?.toString().trim()) { alert('SUV price is required.'); return; }

    try {
      if (editingId === 'new') {
        const { error } = await supabase.from('pricing_routes').insert([formData]);
        if (error) { alert('Failed to add route: ' + error.message); return; }
      } else {
        const { error } = await supabase.from('pricing_routes').update(formData).eq('id', editingId);
        if (error) { alert('Failed to update route: ' + error.message); return; }
      }
      fetchRoutes();
      setEditingId(null);
    } catch (err: unknown) {
      alert('An unexpected error occurred: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('Are you sure you want to delete this route?')) return;
    try {
      const { error } = await supabase.from('pricing_routes').delete().eq('id', id);
      if (error) { alert('Failed to delete route: ' + error.message); return; }
      fetchRoutes();
    } catch (err: unknown) {
      alert('An unexpected error occurred: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.pageHeader}>
        <h1>Pricing & Routes</h1>
        <button className="btn btn-primary btn-sm" onClick={handleAddNew}>
          <Plus size={16} /> Add Route
        </button>
      </header>

      {editingId && (
        <div className={`glass-panel ${styles.tableContainer}`} style={{ marginBottom: '2rem' }}>
          <h2>{editingId === 'new' ? 'Add New Route' : 'Edit Route'}</h2>
          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <label>From (Source)</label>
              <input 
                value={formData.from_city || ''} 
                onChange={e => setFormData({...formData, from_city: e.target.value})} 
                placeholder="e.g. Chandigarh"
              />
            </div>
            <div className={styles.formField}>
              <label>To (Destination)</label>
              <input 
                value={formData.to_city || ''} 
                onChange={e => setFormData({...formData, to_city: e.target.value})} 
                placeholder="e.g. Delhi Airport"
              />
            </div>
            <div className={styles.formField}>
              <label>Distance</label>
              <input 
                value={formData.distance || ''} 
                onChange={e => setFormData({...formData, distance: e.target.value})} 
                placeholder="e.g. 250 km"
              />
            </div>
            <div className={styles.formField}>
              <label>Sedan Price</label>
              <input 
                value={formData.sedan_price || ''} 
                onChange={e => setFormData({...formData, sedan_price: e.target.value})} 
                placeholder="e.g. ₹3,500"
              />
            </div>
            <div className={styles.formField}>
              <label>SUV Price</label>
              <input 
                value={formData.suv_price || ''} 
                onChange={e => setFormData({...formData, suv_price: e.target.value})} 
                placeholder="e.g. ₹5,500"
              />
            </div>
          </div>
          <div className={styles.actionCell} style={{ marginTop: '1.5rem', justifyContent: 'flex-end' }}>
            <button className="btn btn-outline btn-sm" onClick={() => setEditingId(null)}>
              <X size={16} /> Cancel
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleSave}>
              <Save size={16} /> Save Route
            </button>
          </div>
        </div>
      )}

      <div className={styles.tableContainer}>
        {loading ? (
          <SkeletonTable rows={5} />
        ) : routes.length === 0 ? (
          <div className={styles.emptyState}>
            <Map size={48} opacity={0.2} style={{ marginBottom: '1rem' }} />
            <p>No pricing routes defined yet.</p>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Route (From → To)</th>
                <th>Distance</th>
                <th>Sedan Fare</th>
                <th>SUV Fare</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((r) => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 600 }}>
                    {r.from_city} → {r.to_city}
                  </td>
                  <td>{r.distance}</td>
                  <td>{r.sedan_price}</td>
                  <td>{r.suv_price}</td>
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
