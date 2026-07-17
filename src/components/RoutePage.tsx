import Link from 'next/link';
import { ArrowRight, Clock, Shield, CheckCircle } from 'lucide-react';
import type { RouteData } from '@/lib/routes-data';
import { allRoutes } from '@/lib/routes-data';
import { BUSINESS_PHONE, BUSINESS_PHONE_DISPLAY, SITE_URL } from '@/lib/config';
import styles from './RoutePage.module.css';

const siteUrl = SITE_URL;

export function RoutePageJsonLd(route: RouteData) {
  const slug = route.slug;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": `${siteUrl}/services` },
          { "@type": "ListItem", "position": 3, "name": `${route.from} to ${route.to}`, "item": `${siteUrl}/routes/${slug}` },
        ],
      },
      {
        "@type": ["Service", "TaxiService"],
        "name": `${route.from} to ${route.to} Taxi Service`,
        "description": route.metaDesc,
        "provider": { "@type": "LocalBusiness", "@id": `${siteUrl}/#business`, "name": "LookRides" },
        "areaServed": [
          { "@type": "City", "name": route.from },
          { "@type": "City", "name": route.to },
        ],
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "INR",
          "lowPrice": route.sedanPrice.replace('₹', ''),
          "highPrice": route.suvPrice.replace('₹', ''),
          "offerCount": "2",
          "availability": "https://schema.org/InStock",
        },
      },
      {
        "@type": "FAQPage",
        "mainEntity": route.faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      },
    ],
  };
}

const fid = (s: string) => encodeURIComponent(s.trim());

export default function RoutePage({ route }: { route: RouteData }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(RoutePageJsonLd(route)) }}
      />
      <RouteHero route={route} />
      <RoutePricing route={route} />
      <RouteFeatures route={route} />
      <RouteHighlights route={route} />
      {route.stops.length > 1 && <RouteOverview route={route} />}
      <RouteFaqs route={route} />
      <RouteRelated currentRoute={route} />
      <RouteCta route={route} />
    </>
  );
}

function RouteHero({ route }: { route: RouteData }) {
  return (
    <section className={styles.routeHero}>
      <div className="container">
        <nav className={styles.routeBreadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/services">Services</Link>
          <span>/</span>
          <span>{route.from} to {route.to}</span>
        </nav>
        
        <h1 className={styles.routeHeroTitle}>
          {route.from} to {route.to} Taxi Service
        </h1>
        <p className={styles.routeHeroSubtitle}>{route.description}</p>
        
        <div className={styles.routeHeroStats}>
          <div className={styles.routeStat}>
            <span className={styles.routeStatValue}>{route.distance}</span>
            <span className={styles.routeStatLabel}>Distance</span>
          </div>
          <div className={styles.routeStat}>
            <span className={styles.routeStatValue}>{route.duration}</span>
            <span className={styles.routeStatLabel}>Duration</span>
          </div>
          <div className={styles.routeStat}>
            <span className={styles.routeStatValue}>24/7</span>
            <span className={styles.routeStatLabel}>Availability</span>
          </div>
          {route.via && (
            <div className={styles.routeStat}>
              <span className={styles.routeStatValue}>{route.via}</span>
              <span className={styles.routeStatLabel}>Via</span>
            </div>
          )}
        </div>

        <div className={styles.routeHeroSummary}>
          <p>
            The total driving distance for the <strong>{route.from} to {route.to} taxi route</strong> is approximately <strong>{route.distance}</strong>. 
            When booking with LookRides, your journey typically takes <strong>{route.duration}</strong> under normal traffic conditions{route.via ? ` via ${route.via}` : ''}. 
            We provide a premium, fully-sanitized fleet of Sedans and SUVs for this route, with fixed fares starting at just <strong>{route.sedanPrice}</strong>. 
            Our pricing is 100% transparent and inclusive of all toll taxes, state entries, and driver allowances.
          </p>
        </div>
      </div>
    </section>
  );
}

function RoutePricing({ route }: { route: RouteData }) {
  return (
    <section className={styles.rpSection}>
      <div className={styles.rpInner}>
        <h2>Transparent Pricing</h2>
        <p className={styles.rpSub}>All-inclusive fares. Toll, fuel &amp; GST included. No hidden charges.</p>
        
        <div className={styles.rpGrid}>
          <div className={styles.rpCard}>
            <h3>Sedan</h3>
            <p className={styles.rpVehicle}>Toyota Etios / Maruti Dzire</p>
            <p className={styles.rpCap}><CheckCircle size={16} /> 4 Passengers</p>
            <p className={styles.rpCap}><CheckCircle size={16} /> 3 Bags</p>
            <p className={styles.rpPrice}>{route.sedanPrice}</p>
            <p className={styles.rpLabel}>One-way trip</p>
            <Link href={`/?pickup=${fid(route.from)}&drop=${fid(route.to)}`} className="btn btn-primary">
              Book Sedan <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className={`${styles.rpCard} ${route.popularBadge ? styles.rpPopular : ''}`}>
            {route.popularBadge && <span className={styles.rpBadge}>{route.popularBadge}</span>}
            <h3>SUV</h3>
            <p className={styles.rpVehicle}>Toyota Innova Crysta</p>
            <p className={styles.rpCap}><CheckCircle size={16} /> 6 Passengers</p>
            <p className={styles.rpCap}><CheckCircle size={16} /> 5 Bags</p>
            <p className={styles.rpPrice}>{route.suvPrice}</p>
            <p className={styles.rpLabel}>One-way trip</p>
            <Link href={`/?pickup=${fid(route.from)}&drop=${fid(route.to)}`} className="btn btn-primary">
              Book SUV <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function RouteFeatures({ route }: { route: RouteData }) {
  return (
    <section className={styles.rfSection}>
      <div className={styles.rfInner}>
        <h2>Why Choose LookRides for {route.from}–{route.to}?</h2>
        
        <div className={styles.rfGrid}>
          <div className={styles.rfCard}>
            <Shield size={32} />
            <h3>Safety First</h3>
            <p>Background-verified drivers, live GPS tracking, and 24/7 emergency support.</p>
          </div>
          <div className={styles.rfCard}>
            <Clock size={32} />
            <h3>Always On Time</h3>
            <p>Professional drivers with route experience. We guarantee timely pickup and delivery.</p>
          </div>
          <div className={styles.rfCard}>
            <CheckCircle size={32} />
            <h3>All-Inclusive Pricing</h3>
            <p>Toll, fuel, and GST included. No surprises at the end of your journey.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RouteHighlights({ route }: { route: RouteData }) {
  return (
    <section className={styles.rhSection}>
      <div className={styles.rhInner}>
        <h2>What&apos;s Included</h2>
        <ul className={styles.rhList}>
          {route.highlights.map((h) => (
            <li key={h}><CheckCircle size={20} /> {h}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function RouteOverview({ route }: { route: RouteData }) {
  return (
    <section className={styles.roSection}>
      <div className={styles.roInner}>
        <h2>Route Overview</h2>
        <p className={styles.roDesc}>{route.description}</p>
        <div className={styles.roStops}>
          <span>{route.from}</span>
          {route.stops.map((stop) => (
            <span key={stop} className={styles.roStop}>{stop}</span>
          ))}
          <span className={styles.roFinal}>{route.to}</span>
        </div>
      </div>
    </section>
  );
}

function RouteFaqs({ route }: { route: RouteData }) {
  return (
    <section className={styles.faqSection}>
      <div className={styles.inner}>
        <h2>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          {route.faqs.map((faq, i) => (
            <details key={i} className={styles.faqItem}>
              <summary className={styles.faqQ}>{faq.q}</summary>
              <div className={styles.faqAnswer}>{faq.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function RouteCta({ route }: { route: RouteData }) {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaInner}>
        <h2>Ready to travel {route.from} to {route.to}?</h2>
        <p>Book now and get instant confirmation via WhatsApp or phone call.</p>
        <div className={styles.ctaActions}>
          <Link href={`/?pickup=${fid(route.from)}&drop=${fid(route.to)}`} className="btn btn-primary btn-lg">
            Book Now <ArrowRight size={18} />
          </Link>
          <a href={`tel:${BUSINESS_PHONE}`} className="btn btn-outline-white btn-lg">
            Call {BUSINESS_PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}

function RouteRelated({ currentRoute }: { currentRoute: RouteData }) {
  const otherRoutes = allRoutes
    .filter(r => r.slug !== currentRoute.slug && (r.category === currentRoute.category || r.from === currentRoute.from))
    .slice(0, 3);

  if (otherRoutes.length < 3) {
    const popular = allRoutes.filter(r => r.slug !== currentRoute.slug && !otherRoutes.some(o => o.slug === r.slug)).slice(0, 3 - otherRoutes.length);
    otherRoutes.push(...popular);
  }

  return (
    <section className={styles.relatedSection}>
      <div className={styles.relatedInner}>
        <h2>Other Popular Routes</h2>
        <p className={styles.relatedSub}>Explore other taxi routes we serve with fixed, transparent pricing.</p>
        
        <div className={styles.relatedGrid}>
          {otherRoutes.map((r) => (
            <div key={r.slug} className={styles.relatedCard}>
              <div>
                <h3>{r.from} to {r.to}</h3>
                <p className={styles.relatedDetails}>Distance: {r.distance} | Duration: {r.duration}</p>
              </div>
              <div className={styles.relatedPriceWrap}>
                <span className={styles.relatedPrice}>Starts at {r.sedanPrice}</span>
                <Link href={`/routes/${r.slug}`} style={{ color: '#FCA311', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: '600', fontSize: '0.9rem' }}>
                  View Route <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
