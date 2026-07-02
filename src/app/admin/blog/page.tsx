'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Edit2, Trash2, Save, X, FileText, Eye, EyeOff } from 'lucide-react';
import { SkeletonTable } from '@/components/Skeleton';
import styles from '../admin.module.css';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  keywords: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export default function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<BlogPost>>({});

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/blog');
      if (res.ok) setPosts(await res.json());
    } catch {
      console.error('Failed to fetch posts');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPosts();
  }, [fetchPosts]);

  const handleEdit = useCallback((post: BlogPost) => {
    setEditingId(post.id);
    setFormData(post);
  }, []);

  const handleAddNew = useCallback(() => {
    setEditingId('new');
    setFormData({
      title: '',
      slug: '',
      date: new Date().toISOString().split('T')[0],
      excerpt: '',
      content: '',
      cover_image: '',
      keywords: '',
      published: true,
    });
  }, []);

  const slugify = useCallback((title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }, []);

  const handleSave = useCallback(async () => {
    if (!formData.title?.trim()) { alert('Title is required.'); return; }
    if (!formData.slug?.trim()) { alert('Slug is required.'); return; }
    if (!formData.excerpt?.trim()) { alert('Excerpt is required.'); return; }
    if (!formData.content?.trim()) { alert('Content is required.'); return; }

    try {
      const url = '/api/admin/blog';
      if (editingId === 'new') {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) { const err = await res.json(); alert('Failed to create post: ' + (err.error || 'Unknown error')); return; }
      } else {
        const res = await fetch(url, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...formData }),
        });
        if (!res.ok) { const err = await res.json(); alert('Failed to update post: ' + (err.error || 'Unknown error')); return; }
      }
      fetchPosts();
      setEditingId(null);
    } catch (err: unknown) {
      alert('An unexpected error occurred: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  }, [formData, editingId, fetchPosts]);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`/api/admin/blog?id=${id}`, { method: 'DELETE' });
      if (!res.ok) { const err = await res.json(); alert('Failed to delete post: ' + (err.error || 'Unknown error')); return; }
      fetchPosts();
    } catch (err: unknown) {
      alert('An unexpected error occurred: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  }, [fetchPosts]);

  const handleTogglePublish = useCallback(async (post: BlogPost) => {
    try {
      const res = await fetch('/api/admin/blog', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: post.id, published: !post.published }),
      });
      if (res.ok) fetchPosts();
    } catch {
      console.error('Failed to toggle publish status');
    }
  }, [fetchPosts]);

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.pageHeader}>
        <h1>Blog Management</h1>
        <button className="btn btn-primary btn-sm" onClick={handleAddNew}>
          <Plus size={16} /> New Post
        </button>
      </header>

      {editingId && (
        <div className={`glass-panel ${styles.tableContainer}`} style={{ marginBottom: '2rem' }}>
          <h2>{editingId === 'new' ? 'Create New Post' : 'Edit Post'}</h2>
          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <label>Title</label>
              <input
                value={formData.title || ''}
                onChange={e => setFormData({...formData, title: e.target.value, slug: editingId === 'new' ? slugify(e.target.value) : formData.slug})}
                placeholder="Post title"
              />
            </div>
            <div className={styles.formField}>
              <label>Slug</label>
              <input
                value={formData.slug || ''}
                onChange={e => setFormData({...formData, slug: e.target.value})}
                placeholder="my-post-slug"
              />
            </div>
            <div className={styles.formField}>
              <label>Date</label>
              <input
                type="date"
                value={formData.date || ''}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div className={styles.formField}>
              <label>Cover Image URL</label>
              <input
                value={formData.cover_image || ''}
                onChange={e => setFormData({...formData, cover_image: e.target.value})}
                placeholder="/blog-image.png"
              />
            </div>
            <div className={styles.formField} style={{ gridColumn: 'span 2' }}>
              <label>Excerpt</label>
              <textarea
                rows={2}
                value={formData.excerpt || ''}
                onChange={e => setFormData({...formData, excerpt: e.target.value})}
                placeholder="Brief description for blog cards and SEO"
              />
            </div>
            <div className={styles.formField} style={{ gridColumn: 'span 2' }}>
              <label>SEO Keywords (comma separated)</label>
              <input
                value={formData.keywords || ''}
                onChange={e => setFormData({...formData, keywords: e.target.value})}
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>
            <div className={styles.formField} style={{ gridColumn: 'span 2' }}>
              <label>
                Content (Markdown)
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                  — Supports standard markdown syntax
                </span>
              </label>
              <textarea
                rows={16}
                value={formData.content || ''}
                onChange={e => setFormData({...formData, content: e.target.value})}
                placeholder="Write your blog post content in markdown..."
                style={{ fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.6' }}
              />
            </div>
          </div>
          <div className={styles.actionCell} style={{ marginTop: '1rem', justifyContent: 'flex-end' }}>
            <button className="btn btn-outline btn-sm" onClick={() => setEditingId(null)}>
              <X size={16} /> Cancel
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleSave}>
              <Save size={16} /> {editingId === 'new' ? 'Create Post' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      <div className={styles.tableContainer}>
        {loading ? (
          <SkeletonTable rows={5} />
        ) : posts.length === 0 ? (
          <div className={styles.emptyState}>
            <FileText size={48} opacity={0.2} style={{ marginBottom: '1rem' }} />
            <p>No blog posts yet. Click "New Post" to create one.</p>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Slug</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 600, maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.title}
                  </td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    /blog/{p.slug}
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>{p.date}</td>
                  <td>
                    <button
                      onClick={() => handleTogglePublish(p)}
                      className={`${styles.statusBadge} ${p.published ? styles.confirmed : styles.cancelled}`}
                      style={{ cursor: 'pointer', border: 'none' }}
                      title={p.published ? 'Published' : 'Draft'}
                    >
                      {p.published ? <Eye size={14} /> : <EyeOff size={14} />}
                      {p.published ? ' Published' : ' Draft'}
                    </button>
                  </td>
                  <td className={styles.actionCell}>
                    <button className={styles.editBtn} onClick={() => handleEdit(p)}>
                      <Edit2 size={16} />
                    </button>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(p.id)}>
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
