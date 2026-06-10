'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plane, Route, Users,
  Star, ArrowRight, CheckCircle, Quote, Phone,
  Luggage, Shield, Clock, ThumbsUp, Award, ChevronDown,
  BadgeCheck, HeadphonesIcon, Car, Navigation,
  Sparkles, Search
} from "lucide-react";
import { supabase, FleetVehicle, PricingRoute, GoogleReview } from "@/lib/supabase";
import BookingForm from "@/components/BookingForm";
import styles from "./page.module.css";
import { allRoutes, getPopularRoutes, RouteData } from "@/lib/routes-data";

const steps = [
  { n: "01", title: "Fill the Booking Form", desc: "Enter your pickup, drop, date and time. Takes 30 seconds." },
  { n: "02", title: "Get Instant Confirmation", desc: "We confirm via WhatsApp or call within minutes with driver details and exact fare." },
  { n: "03", title: "Enjoy Your Ride", desc: "Your verified driver arrives on time. Relax in a clean, sanitized cab all the way." },
];

const trustFeatures = [
  { Icon: BadgeCheck, title: "Verified Drivers", desc: "Background-checked, trained professionals" },
  { Icon: Shield, title: "Fixed Pricing", desc: "No hidden charges. Toll & fuel included." },
  { Icon: Clock, title: "Always On Time", desc: "GPS tracking & flight monitoring" },
  { Icon: HeadphonesIcon, title: "24/7 Support", desc: "Call or WhatsApp anytime" },
];

const safetyFeatures = [
  { Icon: Shield, title: "Verified Drivers", desc: "All drivers undergo thorough background verification before joining." },
  { Icon: Navigation, title: "Live GPS Tracking", desc: "Share your ride status with family. Real-time location tracking." },
  { Icon: Car, title: "Sanitized Vehicles", desc: "Every cab is cleaned and sanitized before and after each trip." },
  { Icon: Clock, title: "Night Ride Safety", desc: "24/7 support line, emergency contacts, and driver verification for late night trips." },
];

export default function Home() {
  const [fleet, setFleet] = useState<FleetVehicle[]>([]);
  const [pricing, setPricing] = useState<PricingRoute[]>([]);
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [settings, setSettings] = useState({ rating: '4.8', reviews: '54' });
  const [loading, setLoading] = useState(true);
  const [activeReview, setActiveReview] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const popRoutes = getPopularRoutes();

  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  const addToRefs = useCallback((el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.1 });
    revealRefs.current.forEach(ref => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

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
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setStats(prev => prev.map(s => {
        if (s.target === 24) return s;
        const current = Math.floor(ease * s.target);
        let display = current.toString();
        if (s.target >= 1000) display = (current / 1000).toFixed(current >= 1000 && current < 5000 ? 1 : 0).replace('.0', '');
        return { ...s, val: current, display: display + s.suffix };
      }));
      if (progress < 1) frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    async function q<T>(query: PromiseLike<{ data: T | null; error: any }>): Promise<{ data: T | null; error: any }> {
      try { return await query; } catch { return { data: null as T | null, error: 'Query failed' }; }
    }

    async function loadData() {
      const [fleetRes, pricingRes, reviewRes, settingsRes] = await Promise.all([
        q(supabase.from('fleet').select('*').eq('is_active', true).order('order_index')),
        q(supabase.from('pricing_routes').select('*').order('order_index')),
        q(supabase.from('reviews').select('*').eq('is_visible', true).order('created_at', { ascending: false }).limit(6)),
        q(supabase.from('site_settings').select('*'))
      ]);
      if (fleetRes.data) setFleet(fleetRes.data);
      if (pricingRes.data) setPricing(pricingRes.data);
      if (reviewRes.data) setReviews(reviewRes.data);
      if (settingsRes.data && Array.isArray(settingsRes.data)) {
        const r = settingsRes.data.find(s => s.key === 'google_rating')?.value;
        const c = settingsRes.data.find(s => s.key === 'review_count')?.value;
        setSettings({ rating: r || '4.8', reviews: c || '54' });
      }
      setLoading(false);
    }
    loadData();
  }, []);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const interval = setInterval(() => setActiveReview(prev => (prev + 1) % reviews.length), 5000);
    return () => clearInterval(interval);
  }, [reviews]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "How do I book a cab?", "acceptedAnswer": { "@type": "Answer", "text": "Fill the booking form with your pickup, drop, date and time. We confirm via WhatsApp or phone within minutes. Or just call us at +91 97804 26567." } },
      { "@type": "Question", "name": "What are your service areas?", "acceptedAnswer": { "@type": "Answer", "text": "We cover the entire Tricity area plus outstation routes to Delhi, Manali, Shimla, Amritsar, Dehradun, Dharamshala, Jammu, and all of North India." } },
      { "@type": "Question", "name": "Do you offer one-way cabs?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Our one-way service means you only pay for the onward journey. Perfect for airport drops and single-direction travel. No return fare charges." } },
      { "@type": "Question", "name": "How are your drivers verified?", "acceptedAnswer": { "@type": "Answer", "text": "All drivers undergo background verification, document checks, and professional training. They are experienced on highways and hill roads." } },
      { "@type": "Question", "name": "What vehicles do you offer?", "acceptedAnswer": { "@type": "Answer", "text": "We have Toyota Etios/Maruti Dzire (sedan, 4 seats), Toyota Innova Crysta (SUV, 6 seats), and Tempo Traveler (12 seats). All AC and sanitized." } },
      { "@type": "Question", "name": "Can I modify or cancel my booking?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can call or WhatsApp us to modify or cancel. We offer flexible cancellation policies." } },
    ],
  };

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroGlow1} />
          <div className={styles.heroGlow2} />
          <div className={styles.heroGlow3} />
          <div className={styles.heroGrid} />
        </div>

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <Star size={13} fill="currentColor" />
              <span>{settings.rating} ★ on Google</span>
              <span className={styles.heroBadgeDot}>·</span>
              <span>{settings.reviews} reviews</span>
              <span className={styles.heroBadgeDot}>·</span>
              <span className={styles.heroBadgeHighlight}>Trusted by 5,000+ Travelers</span>
            </div>

            <h1 className={styles.heroTitle}>
              <span className="text-gradient">Reliable Intercity Cabs</span><br />
              Book in Under 30 Seconds
            </h1>

            <p className={styles.heroSubtitle}>
              Fixed fares, verified drivers, 24/7 support. Premium outstation
              and airport transfers from Chandigarh, Mohali, Zirakpur,
              Panchkula &amp; Derabassi to Delhi, Manali, Shimla, Amritsar &amp; beyond.
            </p>

            <div className={styles.heroActions}>
              <a href="tel:+919780426567" className={`btn btn-primary btn-lg ${styles.callBtn}`}>
                <Phone size={18} />
                Call Now — 24/7
              </a>
              <a href="https://wa.me/919780426567?text=Hi!%20I%20want%20to%20book%20a%20cab%20with%20LookRides." 
                 target="_blank" rel="noopener noreferrer"
                 className={`btn btn-gold-outline btn-lg ${styles.whatsappBtn}`}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                WhatsApp
              </a>
            </div>

            <div className={styles.heroQuickRoutes}>
              <span className={styles.quickRoutesLabel}>Popular routes:</span>
              <div className={styles.quickRoutesList}>
                {popRoutes.slice(0, 4).map(r => (
                  <Link key={r.slug} href={`/routes/${r.slug}`} className={styles.quickRoute}>
                    {r.from} → {r.to}
                  </Link>
                ))}
              </div>
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

          <div className={styles.heroFormWrap}>
            <div className={styles.bookingWidget}>
              <div className={styles.widgetHead}>
                <div className={styles.widgetHeadTop}>
                  <h2>Book Your Ride</h2>
                  <span className={styles.widgetBadge}>Free Quote</span>
                </div>
                <p>Get instant confirmation via WhatsApp</p>
              </div>
              <BookingForm />
            </div>
            <div className={styles.trustBar}>
              <span><CheckCircle size={12} /> Fixed Pricing</span>
              <span><CheckCircle size={12} /> No Hidden Charges</span>
              <span><CheckCircle size={12} /> 24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.trustedSection} reveal-on-scroll`} ref={addToRefs}>
        <div className="container">
          <div className={styles.trustedGrid}>
            {trustFeatures.map(({ Icon, title, desc }) => (
              <div key={title} className={styles.trustedCard}>
                <div className={styles.trustedIcon}><Icon size={20} /></div>
                <div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.routesPreview} reveal-on-scroll`} ref={addToRefs}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">Popular Routes</span>
            <h2>Wherever You&apos;re Going, We&apos;ll Get You There</h2>
            <p>Fixed prices, no negotiation. From Chandigarh to Delhi, Manali, Shimla and beyond.</p>
          </div>
          <div className={styles.routesGrid}>
            {popRoutes.map(r => (
              <Link key={r.slug} href={`/routes/${r.slug}`} className={styles.routeCard}>
                <div className={styles.routeCardHead}>
                  <span className={styles.routeFrom}>{r.from}</span>
                  <ArrowRight size={14} />
                  <span className={styles.routeTo}>{r.to}</span>
                </div>
                <div className={styles.routeCardMeta}>
                  <span>{r.distance}</span>
                  <span className={styles.routeCardDot}>·</span>
                  <span>{r.duration}</span>
                </div>
                <div className={styles.routeCardPrice}>
                  from <strong>{r.sedanPrice}</strong>
                </div>
              </Link>
            ))}
          </div>
          <div className={styles.routesMore}>
            <Link href="/services" className="btn btn-outline">View All Routes <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className={`${styles.servicesSection} reveal-on-scroll`} ref={addToRefs}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">What We Offer</span>
            <h2>Tailored For Every Journey</h2>
          </div>
          <div className={styles.servicesGrid}>
            {[
              { Icon: Plane, title: "Airport Transfers", desc: "Punctual pickups and drops to Chandigarh & Delhi airports with flight tracking.", highlights: ['Flight tracking', 'Luggage assist', 'Terminal drop'] },
              { Icon: Route, title: "Outstation Cabs", desc: "One-way & round-trips to Delhi, Manali, Shimla, Amritsar, Dharamshala & beyond.", highlights: ['One-way available', 'Hill drivers', 'Hotel breaks'] },
            ].map(({ Icon, title, desc, highlights }) => (
              <div key={title} className={styles.serviceCard}>
                <div className={styles.serviceIconWrap}><Icon size={24} strokeWidth={1.5} /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <ul className={styles.serviceHighlights}>
                  {highlights.map(h => <li key={h}><CheckCircle size={14} /> {h}</li>)}
                </ul>
                <Link href="/services" className={styles.serviceLink}>Learn more <ArrowRight size={15} /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.processSection} reveal-on-scroll`} id="how-it-works" ref={addToRefs}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label section-label-white">Our Process</span>
            <h2 style={{ color: '#fff' }}>Booking Takes 30 Seconds</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>Fill form → Get confirmed → Enjoy your ride. That&apos;s it.</p>
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
          <div className={styles.processCta}>
            <Link href="/" className="btn btn-primary btn-lg" scroll={false}>Book Your Ride Now</Link>
            <a href="tel:+919780426567" className="btn btn-outline-white btn-lg">Call +91 97804 26567</a>
          </div>
        </div>
      </section>

      <section className={`${styles.fleetSection} reveal-on-scroll`} ref={addToRefs}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">Our Fleet</span>
            <h2>Choose Your Perfect Ride</h2>
          </div>
          <div className={styles.fleetGrid}>
            {loading ? (
              <div className={styles.loadingText}>Loading fleet...</div>
            ) : fleet.map((v) => (
              <div key={v.id} className={styles.fleetCard}>
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
                    <span className={styles.fleetFeature}>Premium & AC</span>
                    <Link href="/" className="btn btn-primary btn-sm" scroll={false}>Book</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.fleetMore}>
            <Link href="/fleet" className="btn btn-outline">View Full Fleet <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className={`${styles.safetySection} reveal-on-scroll`} ref={addToRefs}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">Your Safety Matters</span>
            <h2>Safe Travels, Every Time</h2>
          </div>
          <div className={styles.safetyGrid}>
            {safetyFeatures.map(({ Icon, title, desc }) => (
              <div key={title} className={styles.safetyCard}>
                <div className={styles.safetyIcon}><Icon size={24} /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.pricingSection} reveal-on-scroll`} ref={addToRefs}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">Transparent Pricing</span>
            <h2>What You See Is What You Pay</h2>
            <p>No surge pricing. No hidden fees. Toll, fuel & GST — all included.</p>
          </div>
          <div className={styles.pricingTableWrap}>
            <table className={styles.pricingTable}>
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
                    <td><span className={styles.routeFrom}>{r.from_city}</span> → <span className={styles.routeTo}>{r.to_city}</span></td>
                    <td className={styles.routeKm}>{r.distance}</td>
                    <td className={styles.routePrice}>{r.sedan_price}</td>
                    <td className={styles.routePrice}>{r.suv_price}</td>
                    <td><Link href={`/?pickup=${encodeURIComponent(r.from_city)}&drop=${encodeURIComponent(r.to_city)}`} className="btn btn-primary btn-sm" scroll={false}>Book</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.pricingNote}>Fares may vary based on season and availability. Contact us for exact quote.</p>
        </div>
      </section>

      <section className={`${styles.testimonialsSection} reveal-on-scroll`} ref={addToRefs}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">Testimonials</span>
            <h2>Real Reviews from Real Riders</h2>
          </div>
          {loading ? (
            <div className={styles.loadingText}>Loading reviews...</div>
          ) : reviews.length === 0 ? (
            <div className={styles.loadingText}>No reviews yet.</div>
          ) : (
            <>
              <div className={styles.testimonialsGrid}>
                {reviews.slice(0, 3).map((t) => (
                  <div key={t.id} className={styles.testimonialCard}>
                    <div className={styles.testimonialHeader}>
                      <div className={styles.authorAvatar}>{t.author[0]}</div>
                      <div className={styles.authorInfo}>
                        <strong>{t.author}</strong>
                      </div>
                    </div>
                    <div className={styles.stars}>{"★".repeat(t.rating)}</div>
                    <p className={styles.testimonialText}>&ldquo;{t.text}&rdquo;</p>
                  </div>
                ))}
              </div>
              {reviews.length > 3 && (
                <div className={styles.reviewsMore}>
                  <Link href="/contact" className="btn btn-outline">Read All Reviews <ArrowRight size={15} /></Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className={`${styles.faqSection} reveal-on-scroll`} ref={addToRefs}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">FAQs</span>
            <h2>Got Questions? We&apos;ve Got Answers</h2>
          </div>
          <div className={styles.faqList}>
            {[
              { q: 'How do I book a cab?', a: 'Fill the booking form with your pickup, drop, date and time. We confirm via WhatsApp or phone within minutes. Or just call us at +91 97804 26567.' },
              { q: 'What are your service areas?', a: 'We cover the entire Tricity area plus outstation routes to Delhi, Manali, Shimla, Amritsar, Dehradun, Dharamshala, Jammu, and all of North India.' },
              { q: 'Do you offer one-way cabs?', a: 'Yes! Our one-way service means you only pay for the onward journey. Perfect for airport drops and single-direction travel. No return fare charges.' },
              { q: 'How are your drivers verified?', a: 'All drivers undergo background verification, document checks, and professional training. They are experienced on highways and hill roads.' },
              { q: 'What vehicles do you offer?', a: 'We have Toyota Etios/Maruti Dzire (sedan, 4 seats), Toyota Innova Crysta (SUV, 6 seats), and Tempo Traveler (12 seats). All AC and sanitized.' },
              { q: 'Can I modify or cancel my booking?', a: 'Yes, you can call or WhatsApp us to modify or cancel. We offer flexible cancellation policies.' },
            ].map((faq, i) => (
              <div key={i} className={`${styles.faqItem} ${activeFaq === i ? styles.faqItemOpen : ''}`}>
                <button className={styles.faqQ} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <ChevronDown size={16} className={styles.faqChevron} />
                </button>
                <div className={styles.faqA} style={{ maxHeight: activeFaq === i ? '200px' : '0' }}>
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.ctaSection} reveal-on-scroll`} ref={addToRefs}>
        <div className="container">
          <div className={styles.ctaBox}>
            <div className={styles.ctaContent}>
              <h2>Ready to Ride?</h2>
              <p>Book your cab now and get instant confirmation. Or call us — we&apos;re available 24/7.</p>
              <div className={styles.ctaActions}>
                <Link href="/" className={`btn btn-primary btn-lg`} scroll={false}>Book Now — Free Quote</Link>
                <a href="tel:+919780426567" className={`btn btn-outline-white btn-lg ${styles.ctaPhone}`}>
                  <Phone size={18} /> +91 97804 26567
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
