'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plane, Route, MapPin, Users,
  Star, ArrowRight, CheckCircle, Quote, Phone,
  Luggage
} from "lucide-react";
import { supabase, FleetVehicle, PricingRoute, GoogleReview } from "@/lib/supabase";
import BookingForm from "@/components/BookingForm";
import styles from "./page.module.css";

/* ── Static Data (Fallbacks or non-managed) ───────────── */
const steps = [
  { n: "01", title: "Fill the Booking Form", desc: "Enter your pickup, drop, date and time. Takes 30 seconds." },
  { n: "02", title: "Get Instant Confirmation", desc: "We confirm via WhatsApp or call within minutes with driver details and exact fare." },
  { n: "03", title: "Enjoy Your Ride", desc: "Your verified driver arrives on time. Relax in a clean, sanitized cab all the way." },
];

const PARTICLES = [
  { left: '12%', top: '145%', w: '4.2px', h: '3.8px', delay: '1.2s', dur: '12.4s' },
  { left: '34%', top: '110%', w: '3.1px', h: '4.0px', delay: '0.4s', dur: '18.1s' },
  { left: '88%', top: '178%', w: '5.5px', h: '2.5px', delay: '3.1s', dur: '15.9s' },
  { left: '55%', top: '133%', w: '2.2px', h: '3.1px', delay: '4.5s', dur: '11.2s' },
  { left: '21%', top: '190%', w: '4.8px', h: '5.2px', delay: '2.3s', dur: '19.8s' },
  { left: '76%', top: '125%', w: '3.9px', h: '3.9px', delay: '1.8s', dur: '14.5s' },
  { left: '43%', top: '155%', w: '2.7px', h: '4.6px', delay: '0.9s', dur: '17.3s' },
  { left: '91%', top: '118%', w: '5.1px', h: '5.0px', delay: '2.7s', dur: '13.6s' },
  { left: '6%',  top: '166%', w: '3.4px', h: '2.8px', delay: '3.9s', dur: '10.5s' },
  { left: '67%', top: '182%', w: '4.5px', h: '4.2px', delay: '1.5s', dur: '16.7s' },
  { left: '29%', top: '105%', w: '2.9px', h: '5.5px', delay: '4.1s', dur: '19.1s' },
  { left: '82%', top: '140%', w: '5.8px', h: '3.5px', delay: '2.6s', dur: '12.9s' },
  { left: '15%', top: '195%', w: '3.6px', h: '4.8px', delay: '0.5s', dur: '15.4s' },
  { left: '58%', top: '120%', w: '4.1px', h: '2.9px', delay: '3.4s', dur: '18.6s' },
  { left: '96%', top: '160%', w: '2.5px', h: '5.1px', delay: '1.9s', dur: '11.8s' },
];

export default function Home() {
  const [fleet, setFleet] = useState<FleetVehicle[]>([]);
  const [pricing, setPricing] = useState<PricingRoute[]>([]);
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [settings, setSettings] = useState({ rating: '4.8', reviews: '54' });
  const [loading, setLoading] = useState(true);

  const [activeIndex, setActiveIndex] = useState(0);

  // Intersection Observer for scroll reveals
  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  const addToRefs = useCallback((el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    revealRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // 3D Tilt & Spotlight Mouse Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--sx', `${x}px`);
    card.style.setProperty('--sy', `${y}px`);

    // Calculate 3D rotation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6; // max 6deg
    const rotateY = ((x - centerX) / centerX) * 6;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.setProperty('--sx', `50%`);
    card.style.setProperty('--sy', `50%`);
  };

  // Animated Counters
  const [stats, setStats] = useState([
    { val: 0, target: 5000, suffix: "k+", label: "Happy Riders", display: "0" },
    { val: 0, target: 10, suffix: "+", label: "Premium Cabs", display: "0" },
    { val: 0, target: 12, suffix: "+", label: "Years Serving", display: "0" },
    { val: 24, target: 24, suffix: "/7", label: "Available", display: "24/7" },
  ]);

  useEffect(() => {
    let frameId: number;
    let startTime: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setStats(prev => prev.map(s => {
        if (s.target === 24) return s; // static
        const current = Math.floor(ease * s.target);
        // format 5000 as 5k+
        let display = current.toString();
        if (s.target >= 1000) {
          display = (current / 1000).toFixed(current >= 1000 && current < 5000 ? 1 : 0).replace('.0', '');
        }
        return { ...s, val: current, display: display + s.suffix };
      }));

      if (progress < 1) frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    async function loadData() {
      const [fleetRes, pricingRes, reviewRes, settingsRes] = await Promise.all([
        supabase.from('fleet').select('*').eq('is_active', true).order('order_index'),
        supabase.from('pricing_routes').select('*').order('order_index'),
        supabase.from('reviews').select('*').eq('is_visible', true).order('created_at', { ascending: false }).limit(6),
        supabase.from('site_settings').select('*')
      ]);

      if (fleetRes.data) setFleet(fleetRes.data);
      if (pricingRes.data) setPricing(pricingRes.data);
      if (reviewRes.data) setReviews(reviewRes.data);
      if (settingsRes.data) {
        const r = settingsRes.data.find(s => s.key === 'google_rating')?.value;
        const c = settingsRes.data.find(s => s.key === 'review_count')?.value;
        setSettings({ rating: r || '4.8', reviews: c || '54' });
      }
      setLoading(false);
    }
    loadData();
  }, []);

  // Auto-play for carousel
  useEffect(() => {
    if (reviews.length <= 3) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % (reviews.length - 2));
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews]);

  return (
    <div className={styles.page}>
      {/* ══ HERO ═══════════════════════════════════════════════ */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.blobA} />
          <div className={styles.blobB} />
          <div className={styles.blobC} />
          {PARTICLES.map((p, i) => (
            <div 
              key={i} 
              className={styles.particle} 
              style={{
                left: p.left,
                top: p.top,
                width: p.w,
                height: p.h,
                animationDelay: p.delay,
                animationDuration: p.dur
              }}
            />
          ))}
          <div className={styles.gridOverlay} />
        </div>

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <div className={`badge badge-white ${styles.heroBadge}`}>
              <Star size={13} fill="currentColor" />
              {settings.rating}★ on Google &nbsp;·&nbsp; {settings.reviews} Verified Reviews
            </div>

            <h1 className={styles.heroTitle}>
              Premium Cab Service<br />
              <span className="text-gradient">Across the Tricity</span>
            </h1>

            <p className={styles.heroSubtitle}>
              Outstation cabs, airport transfers & local rentals from the Tricity to anywhere in North India.
              Professional drivers, fixed pricing, zero hidden charges.
            </p>

            <div className={styles.heroActions}>
              <a href="tel:+919780426567" className={`btn btn-primary btn-lg ${styles.callBtn}`}>
                <Phone size={18} />
                Call Now — 24/7
              </a>
              <button 
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} 
                className="btn btn-outline-white"
              >
                How it works
              </button>
            </div>

            <div className={styles.heroStats}>
              {stats.map((s) => (
                <div key={s.label} className={styles.stat}>
                  <span className={styles.statVal}>{s.display}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.heroFormWrap} id="booking">
            <div className={styles.bookingWidget}>
              <div className={styles.widgetHead}>
                <h2>Book Your Ride</h2>
                <p>Free quote in seconds</p>
              </div>
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ═══════════════════════════════════════════ */}
      <section className={`${styles.servicesSection} reveal-on-scroll`} ref={addToRefs}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">What We Offer</span>
            <h2>Tailored For Every Journey</h2>
          </div>
          <div className={styles.servicesGrid}>
            {[
              { Icon: Plane, title: "Airport Transfers", desc: "Punctual pickups and drops to Chandigarh & Delhi airports." },
              { Icon: Route, title: "Outstation Cabs", desc: "One-way & round-trips to Manali, Shimla, Delhi, Dharamshala." },
              { Icon: MapPin, title: "Local City Rentals", desc: "Hire by the hour across the Tricity. Multi-stop allowed." },
            ].map(({ Icon, title, desc }) => (
              <div 
                key={title} 
                className={styles.serviceCard}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className={styles.serviceIconWrap}><Icon size={26} strokeWidth={1.5} /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <Link href="/services" className={styles.serviceLink}>Learn more <ArrowRight size={15} /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══ FLEET (Dynamic) ════════════════════════════════════ */}
      <section className={`${styles.fleetSection} reveal-on-scroll`} ref={addToRefs}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">Our Fleet</span>
            <h2>Choose Your Perfect Ride</h2>
          </div>
          <div className={styles.fleetGrid}>
            {loading ? (
              <div className={styles.statLabel}>Loading fleet...</div>
            ) : fleet.map((v) => (
              <div 
                key={v.id} 
                className={styles.fleetCard}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className={styles.fleetImg}>
                  <Image src={v.image_url} alt={v.name} fill style={{ objectFit: "contain", padding: "1rem" }} sizes="(max-width: 768px) 100vw, 33vw" />
                  <span className={`badge badge-navy ${styles.typeBadge}`}>{v.category}</span>
                </div>
                <div className={styles.fleetBody}>
                  <h3>{v.name}</h3>
                  <div className={styles.fleetSpecs}>
                    <span><Users size={14} /> {v.seats} seats</span>
                    <span><Luggage size={14} /> {v.bags} bags</span>
                  </div>
                  <div className={styles.fleetFooter}>
                    <strong className={styles.fleetPrice}>{v.price_desc}</strong>
                    <Link href="/" className="btn btn-primary btn-sm">Book</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ═══════════════════════════════════════ */}
      <section className={`${styles.processSection} reveal-on-scroll`} id="how-it-works" ref={addToRefs}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">Our Process</span>
            <h2>How It Works</h2>
          </div>
          <div className={styles.processGrid}>
            {steps.map((s) => (
              <div key={s.title} className={styles.processStep}>
                <div className={styles.stepNumber}>{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ POPULAR ROUTES (Dynamic) ═══════════════════════════ */}
      <section className={`${styles.routesSection} reveal-on-scroll`} ref={addToRefs}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">Popular Routes</span>
            <h2>Transparent Pricing — No Surprises</h2>
          </div>
          <div className={styles.routesTableWrap}>
            <table className={styles.routesTable}>
              <thead>
                <tr>
                  <th>Route</th>
                  <th>Distance</th>
                  <th>Sedan</th>
                  <th>Innova</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5}>Loading routes...</td></tr>
                ) : pricing.map((r) => (
                  <tr key={r.id}>
                    <td>{r.from_city} → {r.to_city}</td>
                    <td>{r.distance}</td>
                    <td className={styles.routePrice}>{r.sedan_price}</td>
                    <td className={styles.routePrice}>{r.suv_price}</td>
                    <td><Link href="/" className="btn btn-primary btn-sm">Book</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS (Multi-Card Carousel) ═══════════════════ */}
      <section className={`${styles.testimonialsSection} reveal-on-scroll`} ref={addToRefs}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">What Customers Say</span>
            <h2>Real Reviews from Real Riders</h2>
          </div>
          
          <div className={styles.carouselContainer}>
            <div 
              className={styles.carouselTrack} 
              style={{ transform: `translateX(-${activeIndex * (100 / (typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3))}%)` }}
            >
              {loading ? (
                <div className={styles.statLabel} style={{ padding: '4rem' }}>Loading reviews...</div>
              ) : reviews.length === 0 ? (
                <div className={styles.statLabel} style={{ padding: '4rem' }}>No reviews found.</div>
              ) : (
                reviews.map((t) => (
                  <div key={t.id} className={styles.carouselSlide}>
                    <div 
                      className={styles.testimonialCard}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className={styles.testimonialHeader}>
                        <div className={styles.authorAvatar}>{t.author[0]}</div>
                        <div className={styles.authorInfo}>
                          <strong>{t.author}</strong>
                        </div>
                      </div>
                      <div className={styles.stars}>{"★".repeat(t.rating)}</div>
                      <p className={styles.testimonialText}>&ldquo;{t.text}&rdquo;</p>
                      <Quote size={20} className={styles.quoteIcon} />
                    </div>
                  </div>
                ))
              )}
            </div>

            {reviews.length > 3 && (
              <div className={styles.carouselDots}>
                {reviews.slice(0, reviews.length - 2).map((_, i) => (
                  <button 
                    key={i} 
                    className={`${styles.dot} ${i === activeIndex ? styles.activeDot : ''}`}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
