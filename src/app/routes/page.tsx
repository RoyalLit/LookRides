import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, Activity, Plane } from 'lucide-react';
import { allRoutes } from '@/lib/routes-data';
import { SITE_URL } from '@/lib/config';
import styles from './routes.module.css';
import { getPricingRoutes } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'All Popular Routes | LookRides',
  description: 'Explore all premium intercity outstation routes and airport transfer routes served by LookRides. Book taxi from Chandigarh to Delhi, Manali, Shimla, Amritsar & more.',
  openGraph: {
    title: 'All Taxi Routes from Chandigarh | LookRides',
    description: 'Book outstation taxi from Chandigarh to Delhi, Manali, Shimla, Amritsar & more. Fixed pricing, verified drivers.',
    images: '/og-image.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Taxi Routes | LookRides',
    description: 'Premium outstation cab routes from Chandigarh. Book online.',
    images: [SITE_URL + '/og-image.png'],
  },
  alternates: { canonical: SITE_URL + '/routes' },
};

export const revalidate = 60;

const routesIndexJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Routes", "item": SITE_URL + "/routes" },
      ],
    },
    {
      "@type": "CollectionPage",
      "name": "All Taxi Routes from Chandigarh & Tricity",
      "description": "Browse all outstation and airport transfer routes served by LookRides across North India.",
    },
  ],
};

export default async function RoutesIndexPage() {
  // Fetch live pricing from Supabase via centralized queries
  const dbRoutes = await getPricingRoutes();
  
  // Merge static route data with live DB pricing
  const mergedRoutes = allRoutes.map(staticRoute => {
    const livePricing = dbRoutes?.find(r => r.from_city === staticRoute.fromCity && r.to_city === staticRoute.toCity);
    return {
      ...staticRoute,
      sedanPrice: livePricing?.sedan_price || staticRoute.sedanPrice,
      suvPrice: livePricing?.suv_price || staticRoute.suvPrice,
    };
  });

  const outstationRoutes = mergedRoutes.filter(r => r.category === 'outstation');
  const airportRoutes = mergedRoutes.filter(r => r.category === 'airport');

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(routesIndexJsonLd) }} />
      
      {/* HEADER SECTION */}
      <section className={styles.pageHeader}>
        <div className={styles.headerGlow} />
        <div className="container">
          <span className={styles.headerLabel}>Directory</span>
          <h1 className={styles.pageTitle}>Explore Our Routes</h1>
          <p className={styles.headerSubtitle}>
            Whether it's a scenic hill station getaway or a reliable airport transfer, 
            experience stress-free travel across North India with our fixed-price premium cabs.
          </p>
        </div>
      </section>

      {/* ROUTES SECTIONS */}
      <section className={styles.routesSection}>
        <div className="container">
          
          {/* OUTSTATION CABS */}
          <div style={{ marginBottom: '5rem' }}>
            <h2 className={styles.sectionTitle}>Outstation Journeys</h2>
            <p className={styles.sectionSubtitle}>Premium intercity travel to the most popular destinations in North India.</p>
            
            <div className={styles.routesGrid}>
              {outstationRoutes.map((r) => (
                <Link key={r.slug} href={`/routes/${r.slug}`} className={styles.routeCard}>
                  
                  <div className={styles.routePath}>
                    <div className={styles.cityNode}>
                      <span className={styles.cityName}>{r.from}</span>
                    </div>
                    <ArrowRight size={20} className={styles.pathArrow} />
                    <div className={styles.cityNode}>
                      <span className={styles.cityName}>{r.to}</span>
                    </div>
                  </div>

                  <div className={styles.routeBadges}>
                    <span className={styles.badge}><Activity size={14} /> {r.distance}</span>
                    <span className={styles.badge}><Clock size={14} /> {r.duration}</span>
                  </div>

                  <div className={styles.routeFooter}>
                    <div>
                      <div className={styles.priceLabel}>Starting at</div>
                      <div className={styles.priceValue}>{r.sedanPrice}</div>
                    </div>
                    <span className={styles.exploreLink}>Explore <ArrowRight size={16} /></span>
                  </div>

                </Link>
              ))}
            </div>
          </div>

          {/* AIRPORT TRANSFERS */}
          <div>
            <h2 className={styles.sectionTitle}>Direct Airport Transfers</h2>
            <p className={styles.sectionSubtitle}>Timely and reliable rides to and from major regional airports.</p>
            
            <div className={styles.routesGrid}>
              {airportRoutes.map((r) => (
                <Link key={r.slug} href={`/routes/${r.slug}`} className={styles.routeCard}>
                  
                  <div className={styles.routePath}>
                    <div className={styles.cityNode}>
                      <span className={styles.cityName}>{r.from}</span>
                    </div>
                    <ArrowRight size={20} className={styles.pathArrow} />
                    <div className={styles.cityNode}>
                      <span className={styles.cityName}>{r.to}</span>
                    </div>
                  </div>

                  <div className={styles.routeBadges}>
                    <span className={styles.badge}><Plane size={14} /> {r.distance}</span>
                    <span className={styles.badge}><Clock size={14} /> {r.duration}</span>
                  </div>

                  <div className={styles.routeFooter}>
                    <div>
                      <div className={styles.priceLabel}>Starting at</div>
                      <div className={styles.priceValue}>{r.sedanPrice}</div>
                    </div>
                    <span className={styles.exploreLink}>Explore <ArrowRight size={16} /></span>
                  </div>

                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
