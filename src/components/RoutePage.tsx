import Link from 'next/link';
import { ArrowRight, Clock, Shield, CheckCircle, Star } from 'lucide-react';
import type { RouteData } from '@/lib/routes-data';
import { allRoutes } from '@/lib/routes-data';
import styles from './RoutePage.module.css';

const siteUrl = 'https://lookrides.com';

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
        "@type": "Product",
        "name": `${route.from} to ${route.to} Taxi Service`,
        "description": route.metaDesc,
        "brand": { "@type": "Brand", "name": "LookRides" },
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

const fid = (s: string) => typeof s === 'string' ? encodeURIComponent(s.trim()) : '';

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
    <section className="routeHero">
      <style>{`
        .routeHero {
          background: linear-gradient(135deg, #0B132B 0%, #1a2744 100%);
          padding: 4rem 0;
          color: white;
        }
        .routeHero .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
        .routeBreadcrumb { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-bottom: 1.5rem; flex-wrap: wrap; }
        .routeBreadcrumb a { color: rgba(255,255,255,0.5); transition: color 200ms; }
        .routeBreadcrumb a:hover { color: #FCA311; }
        .routeHeroTitle { font-size: clamp(2rem, 5vw, 3.75rem); font-weight: 800; margin-bottom: 1rem; line-height: 1.1; color: #FFFFFF; }
        .routeHeroSubtitle { font-size: 1.15rem; color: rgba(255,255,255,0.85); max-width: 650px; margin-bottom: 2.5rem; line-height: 1.6; }
        .routeHeroStats { display: flex; gap: 3rem; flex-wrap: wrap; }
        .routeStat { display: flex; flex-direction: column; gap: 0.25rem; }
        .routeStatValue { font-size: 1.6rem; font-weight: 700; color: #FCA311; }
        .routeStatLabel { font-size: 0.8rem; opacity: 0.8; text-transform: uppercase; letter-spacing: 0.1em; }
        @media (max-width: 768px) { 
          .routeHero { padding: 3rem 0; }
          .routeHeroStats { gap: 1.5rem; justify-content: space-between; } 
          .routeStatValue { font-size: 1.25rem; }
        }
      `}</style>
      <div className="container">
        <nav className="routeBreadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/services">Services</Link>
          <span>/</span>
          <span>{route.from} to {route.to}</span>
        </nav>
        
        <h1 className="routeHeroTitle">
          {route.from} to {route.to} Taxi Service
        </h1>
        <p className="routeHeroSubtitle">{route.description}</p>
        
        <div className="routeHeroStats">
          <div className="routeStat">
            <span className="routeStatValue">{route.distance}</span>
            <span className="routeStatLabel">Distance</span>
          </div>
          <div className="routeStat">
            <span className="routeStatValue">{route.duration}</span>
            <span className="routeStatLabel">Duration</span>
          </div>
          <div className="routeStat">
            <span className="routeStatValue">24/7</span>
            <span className="routeStatLabel">Availability</span>
          </div>
          {route.via && (
            <div className="routeStat">
              <span className="routeStatValue">{route.via}</span>
              <span className="routeStatLabel">Via</span>
            </div>
          )}
        </div>

        <div style={{ marginTop: '2.5rem', background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', maxWidth: '800px' }}>
          <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.6', fontSize: '0.95rem' }}>
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
    <section style={{ padding: '4rem 0', background: '#F8F9FA' }}>
      <style>{`
        .rp-inner { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
        .rp-inner h2 { font-size: 1.75rem; text-align: center; margin-bottom: 0.5rem; color: #0B132B; font-family: Outfit, sans-serif; }
        .rp-sub { text-align: center; color: #64748B; margin-bottom: 3rem; }
        .rp-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; max-width: 700px; margin: 0 auto; }
        .rp-card { background: white; border: 1px solid #E2E8F0; border-radius: 1rem; padding: 2rem; text-align: center; position: relative; transition: all 0.3s; }
        .rp-card:hover { border-color: #FCA311; box-shadow: 0 8px 24px rgba(252,163,17,0.12); transform: translateY(-3px); }
        .rp-popular { border-color: #FCA311; box-shadow: 0 0 0 2px rgba(252,163,17,0.2); }
        .rp-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #FCA311; color: #0B132B; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 1rem; border-radius: 20px; text-transform: uppercase; }
        .rp-card h3 { font-size: 1.5rem; margin-bottom: 0.25rem; color: #0B132B; font-family: Outfit, sans-serif; }
        .rp-vehicle { color: #64748B; font-size: 0.9rem; margin-bottom: 1rem; }
        .rp-cap { display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 0.9rem; color: #64748B; }
        .rp-cap svg { color: #FCA311; }
        .rp-price { font-size: 2.5rem; font-weight: 800; color: #0B132B; margin: 1rem 0 0.25rem; }
        .rp-label { font-size: 0.85rem; color: #64748B; margin-bottom: 1.5rem; }
        .rp-card :global(.btn) { display: inline-flex; align-items: center; gap: 0.4rem; }
      `}</style>
      <div className="rp-inner">
        <h2>Transparent Pricing</h2>
        <p className="rp-sub">All-inclusive fares. Toll, fuel &amp; GST included. No hidden charges.</p>
        
        <div className="rp-grid">
          <div className="rp-card">
            <h3>Sedan</h3>
            <p className="rp-vehicle">Toyota Etios / Maruti Dzire</p>
            <p className="rp-cap"><CheckCircle size={16} /> 4 Passengers</p>
            <p className="rp-cap"><CheckCircle size={16} /> 3 Bags</p>
            <p className="rp-price">{route.sedanPrice}</p>
            <p className="rp-label">One-way trip</p>
            <Link href={`/?pickup=${fid(route.from)}&drop=${fid(route.to)}`} className="btn btn-primary">
              Book Sedan <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className={`rp-card ${route.popularBadge ? 'rp-popular' : ''}`}>
            {route.popularBadge && <span className="rp-badge">{route.popularBadge}</span>}
            <h3>SUV</h3>
            <p className="rp-vehicle">Toyota Innova Crysta</p>
            <p className="rp-cap"><CheckCircle size={16} /> 6 Passengers</p>
            <p className="rp-cap"><CheckCircle size={16} /> 5 Bags</p>
            <p className="rp-price">{route.suvPrice}</p>
            <p className="rp-label">One-way trip</p>
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
    <section style={{ padding: '4rem 0', background: 'white' }}>
      <style>{`
        .rf-inner { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
        .rf-inner h2 { font-size: 1.75rem; text-align: center; margin-bottom: 3rem; color: #0B132B; font-family: Outfit, sans-serif; }
        .rf-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
        .rf-card { padding: 2rem; border-radius: 1rem; text-align: center; border: 1px solid #E2E8F0; transition: all 0.3s; }
        .rf-card:hover { border-color: #FCA311; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(252,163,17,0.1); }
        .rf-card svg { color: #FCA311; margin-bottom: 1rem; }
        .rf-card h3 { font-size: 1.1rem; margin-bottom: 0.5rem; color: #0B132B; font-family: Outfit, sans-serif; }
        .rf-card p { font-size: 0.9rem; color: #64748B; line-height: 1.5; }
      `}</style>
      <div className="rf-inner">
        <h2>Why Choose LookRides for {route.from}–{route.to}?</h2>
        
        <div className="rf-grid">
          <div className="rf-card">
            <Shield size={32} />
            <h3>Safety First</h3>
            <p>Background-verified drivers, live GPS tracking, and 24/7 emergency support.</p>
          </div>
          <div className="rf-card">
            <Clock size={32} />
            <h3>Always On Time</h3>
            <p>Professional drivers with route experience. We guarantee timely pickup and delivery.</p>
          </div>
          <div className="rf-card">
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
    <section style={{ padding: '4rem 0', background: '#F8F9FA' }}>
      <style>{`
        .rh-inner { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
        .rh-inner h2 { font-size: 1.5rem; text-align: center; margin-bottom: 2rem; color: #0B132B; font-family: Outfit, sans-serif; }
        .rh-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; max-width: 800px; margin: 0 auto; list-style: none; }
        .rh-list li { display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: white; border-radius: 0.625rem; border: 1px solid #E2E8F0; }
        .rh-list svg { color: #FCA311; flex-shrink: 0; }
      `}</style>
      <div className="rh-inner">
        <h2>What&apos;s Included</h2>
        <ul className="rh-list">
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
    <section style={{ padding: '4rem 0', background: 'white' }}>
      <style>{`
        .ro-inner { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
        .ro-inner h2 { font-size: 1.5rem; text-align: center; margin-bottom: 1rem; color: #0B132B; font-family: Outfit, sans-serif; }
        .ro-desc { text-align: center; max-width: 700px; margin: 0 auto 2rem; color: #64748B; line-height: 1.6; }
        .ro-stops { display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap; padding: 2rem; background: #F8F9FA; border-radius: 1rem; border: 1px solid #E2E8F0; max-width: 900px; margin: 0 auto; }
        .ro-stops span { font-weight: 600; color: #0B132B; }
        .ro-stop { color: #64748B !important; font-weight: 400 !important; }
        .ro-stop::before { content: '→'; margin-right: 0.75rem; color: #FCA311; }
        .ro-stop:first-of-type::before { content: none; }
        .ro-final { color: #FCA311 !important; }
      `}</style>
      <div className="ro-inner">
        <h2>Route Overview</h2>
        <p className="ro-desc">{route.description}</p>
        <div className="ro-stops">
          <span>{route.from}</span>
          {route.stops.map((stop) => (
            <span key={stop} className="ro-stop">{stop}</span>
          ))}
          <span className="ro-final">{route.to}</span>
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
          <a href="tel:+919780426567" className="btn btn-outline-white btn-lg">
            Call +91 97804 26567
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
