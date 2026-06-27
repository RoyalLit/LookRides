import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | LookRides',
  description: 'Read the latest updates, travel tips, and stories from LookRides.',
};

export default function BlogPage() {
  return (
    <div style={{ paddingTop: '100px', paddingBottom: '60px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
      <h1>Blog</h1>
      <p>Welcome to our blog. Stay tuned for travel tips, destination guides, and more!</p>
    </div>
  );
}
