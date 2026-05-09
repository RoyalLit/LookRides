'use client';

import { useEffect, useState } from 'react';
import { supabase, BookingRequest } from '@/lib/supabase';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from('booking_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (!error && data) {
        setBookings(data);
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
          <p>Loading records...</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
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
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking, idx) => (
                  <tr key={booking.id || idx}>
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
