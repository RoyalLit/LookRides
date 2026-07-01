'use client';

import { useEffect, useState } from 'react';
import { SkeletonTable } from '@/components/Skeleton';
import styles from './admin.module.css';

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

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('/api/admin/bookings');
        if (res.ok) {
          const data = await res.json();
          setBookings(data.slice(0, 20));
        }
      } catch {
        console.error('Failed to fetch bookings');
      }
      setLoading(false);
    };

    fetchBookings();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.dashboardHeader}>
        <h1>Overview</h1>
      </header>

      <div className={styles.statsGrid}>
        <div className={`glass-panel ${styles.statCard}`}>
          <h3>Total Requests</h3>
          <p className={styles.statValue}>{bookings.length}</p>
        </div>
        <div className={`glass-panel ${styles.statCard}`}>
          <h3>Pending</h3>
          <p className={styles.statValue}>
            {bookings.filter(b => b.status === 'pending').length}
          </p>
        </div>
        <div className={`glass-panel ${styles.statCard}`}>
          <h3>Confirmed</h3>
          <p className={styles.statValue}>
            {bookings.filter(b => b.status === 'confirmed').length}
          </p>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <h2>Recent Booking Requests</h2>
        {loading ? (
          <SkeletonTable rows={5} />
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Date Submitted</th>
                <th>Pickup</th>
                <th>Drop</th>
                <th>Travel Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking, idx) => (
                  <tr key={booking.id || idx}>
                    <td style={{ fontWeight: 600 }}>
                      {booking.passenger_name || 'Anonymous'}
                      {booking.phone && <div style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-muted)' }}>{booking.phone}</div>}
                    </td>
                    <td>{booking.created_at ? new Date(booking.created_at).toLocaleDateString() : 'N/A'}</td>
                    <td>{booking.pickup_location}</td>
                    <td>{booking.drop_location}</td>
                    <td>{booking.date}</td>
                    <td>{booking.time}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[booking.status || 'pending']}`}>
                        {booking.status || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
