'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { Check, X, Phone, User, Calendar, MapPin, Clock, Search, Download } from 'lucide-react';
import { SkeletonTable } from '@/components/Skeleton';
import styles from '../admin.module.css';

interface BookingRequest {
  id: string;
  pickup_location: string;
  drop_location: string;
  passenger_name: string | null;
  phone: string | null;
  date: string;
  time: string;
  status: string;
  created_at: string;
}

type StatusFilter = 'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled';

export default function BookingsManagement() {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/bookings');
      if (res.ok) setBookings(await res.json());
    } catch {
      console.error('Failed to fetch bookings');
    }
    setLoading(false);
  }, []);

  const filtered = useMemo(() => {
    let result = bookings;
    if (statusFilter !== 'all') {
      result = result.filter(b => b.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(b =>
        (b.passenger_name?.toLowerCase().includes(q) ?? false) ||
        (b.phone?.includes(q)) ||
        b.pickup_location.toLowerCase().includes(q) ||
        b.drop_location.toLowerCase().includes(q)
      );
    }
    return result;
  }, [bookings, search, statusFilter]);

  const updateStatus = useCallback(async (id: string, status: string) => {
    const label = status === 'confirmed' ? 'confirm' : status === 'completed' ? 'complete' : 'cancel';
    if (!confirm(`Are you sure you want to ${label} this booking?`)) return;
    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) {
        const err = await res.json();
        console.error('Failed to update booking:', err.error);
        return;
      }
      fetchBookings();
    } catch (err: unknown) {
      console.error('Failed to update booking status:', err);
    }
  }, [fetchBookings]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBookings();
  }, [fetchBookings]);

  const statuses: { label: string; value: StatusFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.pageHeader}>
        <h1>Manage Bookings</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-outline btn-sm" onClick={() => window.open('/api/admin/bookings/export', '_blank')}>
            <Download size={16} /> Export CSV
          </button>
          <button className="btn btn-outline btn-sm" onClick={fetchBookings}>
            Refresh List
          </button>
        </div>
      </header>

    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '240px', maxWidth: '400px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input
            type="text"
            placeholder="Search by name, phone, or route..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ 
              padding: '0 1rem 0 2.25rem', 
              width: '100%', 
              height: '38px',
              borderRadius: '8px', 
              border: '1px solid #CBD5E1',
              fontSize: '0.875rem',
              color: '#1E293B',
              outline: 'none',
              boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {statuses.map(s => (
            <button
              key={s.value}
              onClick={() => setStatusFilter(s.value)}
              style={{
                height: '38px',
                padding: '0 1rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: statusFilter === s.value ? '1px solid var(--admin-accent)' : '1px solid #CBD5E1',
                background: statusFilter === s.value ? 'var(--admin-accent)' : 'white',
                color: statusFilter === s.value ? 'white' : '#475569',
                transition: 'all 0.2s',
                boxShadow: statusFilter === s.value ? '0 4px 6px -1px rgba(252,163,17,0.2)' : '0 1px 2px rgba(0,0,0,0.02)'
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
        <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500, marginLeft: 'auto' }}>
          {filtered.length} / {bookings.length} bookings
        </span>
      </div>

      <div>
        {loading ? (
          <SkeletonTable rows={5} />
        ) : filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>{bookings.length === 0 ? 'No Bookings Yet' : 'No Matching Bookings'}</h2>
            <p>{bookings.length === 0 ? 'New booking requests will appear here.' : 'Try adjusting your search or filters.'}</p>
          </div>
        ) : (
          <div className={styles.bookingGrid}>
            {filtered.map((b) => (
              <div className={styles.bookingCard} key={b.id}>
                {/* Header: Customer Info & Status Badge */}
                <div className={styles.cardHeader}>
                  <div className={styles.customerInfo}>
                    <div className={styles.customerName}>
                      <User size={16} /> {b.passenger_name || 'Anonymous'}
                    </div>
                    {b.phone && (
                      <div className={styles.customerPhone}>
                        <Phone size={14} /> {b.phone}
                      </div>
                    )}
                  </div>
                  <span className={`${styles.statusBadge} ${styles[b.status]}`}>
                    {b.status}
                  </span>
                </div>

                {/* Body: Route Details */}
                <div className={styles.cardRoute}>
                  <div className={styles.routePoint}>
                    <MapPin size={16} className={styles.routeIcon} color="#3B82F6" />
                    <div>
                      <div className={styles.routeLabel}>Pickup</div>
                      <div className={styles.routeText}>{b.pickup_location}</div>
                    </div>
                  </div>
                  <div style={{ marginLeft: '0.45rem', borderLeft: '2px dashed #CBD5E1', height: '1rem' }}></div>
                  <div className={styles.routePoint}>
                    <MapPin size={16} className={styles.routeIcon} color="#EF4444" />
                    <div>
                      <div className={styles.routeLabel}>Drop-off</div>
                      <div className={styles.routeText}>{b.drop_location}</div>
                    </div>
                  </div>
                </div>

                {/* Schedule details */}
                <div className={styles.cardSchedule}>
                  <div className={styles.scheduleItem}>
                    <span className={styles.scheduleLabel}>Date</span>
                    <span className={styles.scheduleValue}><Calendar size={14} color="#64748B"/> {b.date}</span>
                  </div>
                  <div className={styles.scheduleItem}>
                    <span className={styles.scheduleLabel}>Time</span>
                    <span className={styles.scheduleValue}><Clock size={14} color="#64748B"/> {b.time}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className={styles.cardActions}>
                  {b.status === 'pending' && (
                    <>
                      <button className={styles.btnConfirm} onClick={() => updateStatus(b.id, 'confirmed')}>
                        <Check size={16} /> Confirm
                      </button>
                      <button className={styles.btnCancel} onClick={() => updateStatus(b.id, 'cancelled')}>
                        <X size={16} /> Cancel
                      </button>
                    </>
                  )}
                  {b.status === 'confirmed' && (
                    <button className={styles.btnComplete} onClick={() => updateStatus(b.id, 'completed')}>
                      <Check size={16} /> Mark Completed
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
