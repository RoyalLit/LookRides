'use client';

import { useState, useEffect } from 'react';
import { supabase, FleetVehicle } from '@/lib/supabase';
import { Plus, Edit2, Trash2, Save, X, Car } from 'lucide-react';
import styles from '../admin.module.css';

export default function FleetManagement() {
  const [vehicles, setVehicles] = useState<FleetVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<FleetVehicle>>({});

  const fetchFleet = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('fleet')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (!error && data) setVehicles(data);
    setLoading(false);
  };

  const handleEdit = (vehicle: FleetVehicle) => {
    setEditingId(vehicle.id);
    setFormData(vehicle);
  };

  useEffect(() => {
    fetchFleet();
  }, [fetchFleet]);

  const handleAddNew = () => {
    setEditingId('new');
    setFormData({
      name: '',
      category: 'Sedan',
      seats: 4,
      bags: 2,
      price_desc: 'from ₹10/km',
      image_url: '/etios.png',
      is_active: true,
      order_index: vehicles.length,
    });
  };

  const handleSave = async () => {
    if (editingId === 'new') {
      const { error } = await supabase.from('fleet').insert([formData]);
      if (!error) fetchFleet();
    } else {
      const { error } = await supabase.from('fleet').update(formData).eq('id', editingId);
      if (!error) fetchFleet();
    }
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to remove this vehicle?')) {
      const { error } = await supabase.from('fleet').delete().eq('id', id);
      if (!error) fetchFleet();
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.pageHeader}>
        <h1>Fleet Management</h1>
        <button className="btn btn-primary btn-sm" onClick={handleAddNew}>
          <Plus size={16} /> Add Vehicle
        </button>
      </header>

      {editingId && (
        <div className={`glass-panel ${styles.tableContainer}`} style={{ marginBottom: '2rem' }}>
          <h2>{editingId === 'new' ? 'Add New Vehicle' : 'Edit Vehicle'}</h2>
          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <label>Vehicle Name</label>
              <input 
                value={formData.name || ''} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                placeholder="e.g. Toyota Innova Crysta"
              />
            </div>
            <div className={styles.formField}>
              <label>Category</label>
              <select 
                value={formData.category || ''} 
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option value="Sedan">Sedan</option>
                <option value="Premium SUV">Premium SUV</option>
                <option value="Mini Bus">Mini Bus</option>
              </select>
            </div>
            <div className={styles.formField}>
              <label>Seats</label>
              <input 
                type="number" 
                value={formData.seats || 0} 
                onChange={e => setFormData({...formData, seats: parseInt(e.target.value)})}
              />
            </div>
            <div className={styles.formField}>
              <label>Luggage (Bags)</label>
              <input 
                type="number" 
                value={formData.bags || 0} 
                onChange={e => setFormData({...formData, bags: parseInt(e.target.value)})}
              />
            </div>
            <div className={styles.formField}>
              <label>Price Description</label>
              <input 
                value={formData.price_desc || ''} 
                onChange={e => setFormData({...formData, price_desc: e.target.value})}
                placeholder="e.g. from ₹16/km"
              />
            </div>
            <div className={styles.formField}>
              <label>Image Path/URL</label>
              <input 
                value={formData.image_url || ''} 
                onChange={e => setFormData({...formData, image_url: e.target.value})}
                placeholder="e.g. /innova.png"
              />
            </div>
          </div>
          <div className={styles.actionCell} style={{ marginTop: '1.5rem', justifyContent: 'flex-end' }}>
            <button className="btn btn-outline btn-sm" onClick={() => setEditingId(null)}>
              <X size={16} /> Cancel
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleSave}>
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>
      )}

      <div className={styles.tableContainer}>
        {loading ? (
          <p>Loading fleet...</p>
        ) : vehicles.length === 0 ? (
          <div className={styles.emptyState}>
            <Car size={48} opacity={0.2} style={{ marginBottom: '1rem' }} />
            <p>No vehicles in your fleet yet.</p>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Category</th>
                <th>Specs</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => (
                <tr key={v.id}>
                  <td style={{ fontWeight: 600 }}>{v.name}</td>
                  <td>{v.category}</td>
                  <td>{v.seats} Seats / {v.bags} Bags</td>
                  <td>{v.price_desc}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${v.is_active ? styles.confirmed : styles.cancelled}`}>
                      {v.is_active ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className={styles.actionCell}>
                    <button className={styles.editBtn} onClick={() => handleEdit(v)}>
                      <Edit2 size={16} />
                    </button>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(v.id)}>
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
