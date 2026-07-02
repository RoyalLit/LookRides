'use client';

import { useState, useEffect, useCallback } from 'react';
import { Users, Shield, ShieldOff, Mail, Plus, X, Calendar } from 'lucide-react';
import { SkeletonTable } from '@/components/Skeleton';
import styles from '../admin.module.css';

interface AdminUser {
  id: string;
  email: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  is_admin: boolean;
  confirmed_at: string | null;
}

export default function UsersManagement() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteAdmin, setInviteAdmin] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [sending, setSending] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) setUsers(await res.json());
    } catch {
      console.error('Failed to fetch users');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, [fetchUsers]);

  const handleInvite = useCallback(async () => {
    if (!inviteEmail.trim()) { alert('Email is required.'); return; }
    setSending(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail, is_admin: inviteAdmin }),
      });
      if (!res.ok) { const err = await res.json(); alert('Invite failed: ' + (err.error || 'Unknown error')); return; }
      alert('Invitation sent successfully!');
      setShowInvite(false);
      setInviteEmail('');
      setInviteAdmin(false);
      fetchUsers();
    } catch (err: unknown) {
      alert('An error occurred: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
    setSending(false);
  }, [inviteEmail, inviteAdmin, fetchUsers]);

  const handleToggleAdmin = useCallback(async (targetUser: AdminUser) => {
    if (targetUser.email === users.find(u => u.is_admin)?.email && targetUser.is_admin) {
      if (!confirm('Removing admin access from the last admin may lock everyone out. Continue?')) return;
    }
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: targetUser.id, is_admin: !targetUser.is_admin }),
      });
      if (res.ok) fetchUsers();
    } catch {
      console.error('Failed to toggle admin');
    }
  }, [users, fetchUsers]);

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.pageHeader}>
        <h1>User Management</h1>
        <button className="btn btn-primary btn-sm" onClick={() => setShowInvite(true)}>
          <Plus size={16} /> Invite User
        </button>
      </header>

      {showInvite && (
        <div className={`glass-panel ${styles.tableContainer}`} style={{ marginBottom: '2rem' }}>
          <h2>Invite New User</h2>
          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <label>Email Address</label>
              <input
                type="email"
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
                placeholder="user@example.com"
                onKeyDown={e => e.key === 'Enter' && handleInvite()}
              />
            </div>
            <div className={styles.formField}>
              <label>Access Level</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.25rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={inviteAdmin}
                    onChange={e => setInviteAdmin(e.target.checked)}
                  />
                  Grant admin privileges
                </label>
              </div>
            </div>
          </div>
          <div className={styles.actionCell} style={{ marginTop: '1rem', justifyContent: 'flex-end' }}>
            <button className="btn btn-outline btn-sm" onClick={() => setShowInvite(false)} disabled={sending}>
              <X size={16} /> Cancel
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleInvite} disabled={sending}>
              <Mail size={16} /> {sending ? 'Sending...' : 'Send Invite'}
            </button>
          </div>
        </div>
      )}

      <div className={styles.tableContainer}>
        {loading ? (
          <SkeletonTable rows={5} />
        ) : users.length === 0 ? (
          <div className={styles.emptyState}>
            <Users size={48} opacity={0.2} style={{ marginBottom: '1rem' }} />
            <p>No users found.</p>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Joined</th>
                <th>Last Sign In</th>
                <th>Status</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td style={{ fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Mail size={14} />
                      {u.email || 'Unknown'}
                    </div>
                  </td>
                  <td style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Calendar size={14} />
                      {new Date(u.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td style={{ fontSize: '0.85rem' }}>
                    {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleDateString() : 'Never'}
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${u.confirmed_at ? styles.confirmed : styles.cancelled}`}>
                      {u.confirmed_at ? 'Active' : 'Pending'}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleToggleAdmin(u)}
                      className={u.is_admin ? styles.editBtn : styles.deleteBtn}
                      title={u.is_admin ? 'Admin (click to revoke)' : 'Not admin (click to promote)'}
                      style={{ border: 'none', cursor: 'pointer' }}
                    >
                      {u.is_admin ? <Shield size={18} /> : <ShieldOff size={18} />}
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
