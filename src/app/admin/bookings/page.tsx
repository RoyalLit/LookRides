'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabaseBrowser as supabase, BookingRequest } from '@/lib/supabase-browser';
import { Check, X, Phone, User, Calendar } from 'lucide-react';
import styles from '../admin.module.css';

export default function BookingsManagement() {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('booking_requests')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) setBookings(data);
    setLoading(false);
  }, []);

  const updateStatus = useCallback(async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('booking_requests')
        .update({ status })
        .eq('id', id);
      if (error) {
        alert('Failed to update booking status: ' + error.message);
        return;
      }
      fetchBookings();
    } catch (err: unknown) {
      alert('An unexpected error occurred: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.pageHeader}>
        <h1>Manage Bookings</h1>
        <button className="btn btn-outline btn-sm" onClick={fetchBookings}>
          Refresh List
        </button>
      </header>

      <div className={styles.tableContainer}>
        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Route</th>
                <th>Schedule</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                      <User size={14} /> {b.passenger_name || 'Anonymous'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--accent-gold)' }}>
                      <Phone size={14} /> {b.phone}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.85rem' }}>{b.pickup_location}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>to {b.drop_location}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                      <Calendar size={14} /> {b.date}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>at {b.time}</div>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[b.status]}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className={styles.actionCell}>
                    {b.status === 'pending' && (
                      <>
                        <button className={styles.editBtn} title="Confirm" onClick={() => updateStatus(b.id, 'confirmed')}>
                          <Check size={18} />
                        </button>
                        <button className={styles.deleteBtn} title="Cancel" onClick={() => updateStatus(b.id, 'cancelled')}>
                          <X size={18} />
                        </button>
                      </>
                    )}
                    {b.status === 'confirmed' && (
                      <button className={styles.editBtn} title="Complete" onClick={() => updateStatus(b.id, 'completed')}>
                        Done
                      </button>
                    )}
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
