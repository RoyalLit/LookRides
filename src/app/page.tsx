'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plane, Route, Users,
  Star, ArrowRight, CheckCircle, Phone,
  Luggage, Shield, Clock, ThumbsUp, ChevronDown,
  BadgeCheck, HeadphonesIcon, Car, Navigation,
  Sparkles, Check, CheckSquare, Heart
} from "lucide-react";
import { supabase, FleetVehicle, PricingRoute, GoogleReview } from "@/lib/supabase";
import BookingForm from "@/components/BookingForm";
import { SkeletonSlide, SkeletonReviewCard } from "@/components/Skeleton";
import styles from "./page.module.css";
import { allRoutes, getPopularRoutes, RouteData } from "@/lib/routes-data";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const steps = [
  { n: "01", title: "Fill the Booking Form", desc: "Enter your pickup, drop, date and time. Takes 30 seconds." },
  { n: "02", title: "Get Instant Confirmation", desc: "We confirm via WhatsApp or call within minutes with driver details and exact fare." },
  { n: "03", title: "Enjoy Your Ride", desc: "Your verified driver arrives on time. Relax in a clean, sanitized cab all the way." },
];

const trustFeatures = [
  { Icon: BadgeCheck, title: "Verified Drivers", desc: "Every chauffeur undergoes biometric & criminal background checks." },
  { Icon: Shield, title: "Fixed All-Inclusive Fares", desc: "No toll surprises or night charges. You pay exactly what you see." },
  { Icon: Clock, title: "Flight-Delay Monitoring", desc: "We track your flight in real-time to adjust pickup timings dynamically." },
  { Icon: HeadphonesIcon, title: "24/7 Dedicated Helpline", desc: "Round-the-clock support dispatch for complete peace of mind." },
];

const safetyFeatures = [
  { Icon: Shield, title: "Background-Verified Drivers", desc: "All chauffeurs undergo thorough verification and long-distance highway training." },
  { Icon: Navigation, title: "Real-Time GPS Tracking", desc: "Every trip is tracked live. Share your tracking link with friends & family." },
  { Icon: Car, title: "Sanitized Premium Fleet", desc: "Vehicles are meticulously deep-cleaned, vacuumed, and sanitized before every pickup." },
  { Icon: Clock, title: "Late-Night Safety Protocol", desc: "Special dispatch guidelines and active driver communication for night journeys." },
];

const popularDestinations = [
  {
    name: "Delhi",
    desc: "Capital connection to historical landmarks, commercial hubs, and IGI terminal 3.",
    time: "4.5 hours",
    image: "/destinations/delhi.jpg",
    route: "/routes/chandigarh-to-delhi"
  },
  {
    name: "Shimla",
    desc: "The serene Queen of Hills, featuring pine-filled trails and colonial ridge vistas.",
    time: "3 hours",
    image: "/destinations/shimla.jpg",
    route: "/routes/chandigarh-to-shimla"
  },
  {
    name: "Manali",
    desc: "Breathtaking mountain slopes, Aut tunnel highway runs, and Solang snow adventures.",
    time: "7 hours",
    image: "/destinations/manali.jpg",
    route: "/routes/chandigarh-to-manali"
  },
  {
    name: "Dharamshala",
    desc: "Nestled in Dhauladhars, offering rich spiritual vibes and scenic tea garden paths.",
    time: "5.5 hours",
    image: "/destinations/dharamshala.jpg",
    route: "/routes/chandigarh-to-dharamshala"
  },
  {
    name: "Mussoorie",
    desc: "Gateway to Mist, highlighting beautiful cascades and walking paths above clouds.",
    time: "5.5 hours",
    image: "/destinations/mussoorie.jpg",
    route: "/routes/chandigarh-to-dehradun"
  },
  {
    name: "Dehradun",
    desc: "Sprawling valley beauty bounded by Ganges and Yamuna, lush forest trails.",
    time: "4.5 hours",
    image: "/destinations/dehradun.jpg",
    route: "/routes/chandigarh-to-dehradun"
  },
  {
    name: "Jammu",
    desc: "Holy city of Temples and the primary baseline for the Vaishno Devi pilgrimage.",
    time: "6.5 hours",
    image: "/destinations/jammu.jpg",
    route: "/routes/chandigarh-to-jammu"
  },
  {
    name: "Amritsar",
    desc: "Home to the spectacular Golden Temple, rich Wagah history, and vibrant local cuisine.",
    time: "4 hours",
    image: "/destinations/amritsar.jpg",
    route: "/routes/chandigarh-to-amritsar"
  }
];

const reviewerAvatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80",
];

const routeImages: Record<string, string> = {
  'chandigarh-to-delhi': '/destinations/delhi.jpg',
  'chandigarh-to-manali': '/destinations/manali.jpg',
  'chandigarh-to-shimla': '/destinations/shimla.jpg',
  'chandigarh-to-amritsar': '/destinations/amritsar.jpg',
};

const getFleetDetails = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes('sedan')) {
    return {
      idealTrip: "Best for quick, economical intercity commutes & airport drops",
      comfortLevel: "Ergonomic seating with smooth highway suspension",
      ac: "Dual-zone climate control AC"
    };
  } else if (cat.includes('suv')) {
    return {
      idealTrip: "Ideal for family vacations, group travel & luggage-heavy runs",
      comfortLevel: "Plush leather-feel captain seats with generous legroom",
      ac: "Multi-vent rear AC control"
    };
  } else {
    return {
      idealTrip: "Perfect for large family gatherings, corporate trips & tours",
      comfortLevel: "Luxury pushback reclining seats with dual armrests",
      ac: "Roof-mounted powerful blowers AC"
    };
  }
};

export default function Home() {
  const [fleet, setFleet] = useState<FleetVehicle[]>([]);
  const [pricing, setPricing] = useState<PricingRoute[]>([]);
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [settings, setSettings] = useState({ rating: '4.8', reviews: '54' });
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const popRoutes = getPopularRoutes();
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 3500, stopOnInteraction: true })]);

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

  const [stats] = useState([
    { val: "4.8", label: "Google Rating", suffix: " ★" },
    { val: "5k+", label: "Completed Trips", suffix: "" },
    { val: "50+", label: "Outstation Routes", suffix: "" },
    { val: "24/7", label: "Support Line", suffix: "" },
  ]);

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
      
      {/* 1. HERO SECTION */}
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
              <Star size={13} fill="currentColor" className={styles.heroBadgeStar} />
              <span>{settings.rating} ★ on Google</span>
              <span className={styles.heroBadgeDot}>·</span>
              <span>{settings.reviews} Verified Reviews</span>
            </div>

            <h1 className={styles.heroTitle}>
              <span className="text-gradient">Premium Intercity Cabs</span><br />
              With Fixed, Honest Pricing
            </h1>

            <p className={styles.heroSubtitle}>
              Experience stress-free travel across North India. Book top-rated outstation 
              taxis and direct airport transfers with fully verified professional chauffeurs, 
              zero hidden fees, and 24/7 dedicated support.
            </p>

            <div className={styles.heroActions}>
              <a href="tel:+919780426567" className={`btn btn-primary btn-lg ${styles.callBtn}`}>
                <Phone size={18} />
                Call Helpline (24/7)
              </a>
              <a href="https://wa.me/919780426567?text=Hi!%20I%20want%20to%20book%20a%20cab%20with%20LookRides." 
                 target="_blank" rel="noopener noreferrer"
                 className={`btn btn-gold-outline btn-lg ${styles.whatsappBtn}`}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Book via WhatsApp
              </a>
            </div>

            <div className={styles.heroStatsGrid}>
              {stats.map((s) => (
                <div key={s.label} className={styles.heroStatItem}>
                  <span className={styles.heroStatNum}>{s.val}<span className={styles.heroStatSuffix}>{s.suffix}</span></span>
                  <span className={styles.heroStatLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.heroFormWrap}>
            <div className={styles.bookingWidget} id="booking-widget">
              <div className={styles.widgetHead}>
                <div className={styles.widgetHeadTop}>
                  <h2>Secure Booking Request</h2>
                  <span className={styles.widgetBadge}>No Upfront Payment</span>
                </div>
                <p>Enter details for a quick fixed-fare quote via WhatsApp</p>
              </div>
              <BookingForm />
            </div>
            <div className={styles.trustBar}>
              <span><CheckCircle size={13} /> Guaranteed Fixed Fare</span>
              <span><CheckCircle size={13} /> Zero Hidden Charges</span>
              <span><CheckCircle size={13} /> Sanitized Vehicles Only</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST METRICS SECTION */}
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

      {/* 3. POPULAR ROUTES UPGRADE */}
      <section className={`${styles.routesPreview} reveal-on-scroll`} ref={addToRefs}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">Popular Routes</span>
            <h2>Most Booked Highway Connections</h2>
            <p>Direct door-to-door luxury taxi services on our most highly requested travel lines.</p>
          </div>
          
          <div className={styles.routesGrid}>
            {popRoutes.map(r => (
              <div key={r.slug} className={styles.routeCardV2}>
                <div className={styles.routeCardImgWrap}>
                  <Image 
                    src={routeImages[r.slug] || "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80"} 
                    alt={`${r.from} to ${r.to}`} 
                    fill 
                    style={{ objectFit: "cover" }} 
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className={styles.routeImgOverlay} />
                  <span className={styles.routePopularBadge}>
                    {r.slug === 'chandigarh-to-delhi' ? '★ Most Popular' : '★ Verified Driver'}
                  </span>
                </div>
                
                <div className={styles.routeCardBody}>
                  <div className={styles.routeCardDirections}>
                    <h3>{r.from} to {r.to}</h3>
                    <p className={styles.routeMetrics}>
                      <span>{r.distance}</span>
                      <span className={styles.routeMetricsDot}>·</span>
                      <span>{r.duration}</span>
                    </p>
                  </div>
                  
                  <div className={styles.routeCardPriceBlock}>
                    <span className={styles.priceLabel}>Fares starting from</span>
                    <span className={styles.priceTag}>{r.sedanPrice} <span className={styles.priceSuffix}>onwards</span></span>
                  </div>

                  <div className={styles.routeCardActions}>
                    <Link href={`/?pickup=${encodeURIComponent(r.from)}&drop=${encodeURIComponent(r.to)}`} className="btn btn-primary btn-sm">
                      Book Now
                    </Link>
                    <Link href={`/routes/${r.slug}`} className={styles.exploreRouteLink}>
                      Details <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.routesMore}>
            <Link href="/routes" className="btn btn-outline">Explore All Intercity Routes <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* 4. EXPLORE POPULAR DESTINATIONS */}
      <section className={`${styles.destinationsSection} reveal-on-scroll`} ref={addToRefs}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">Explore Destinations</span>
            <h2>Where to Next? Discover North India</h2>
            <p>Inspiring travel ideas for your next road trip. Click a destination to view customized routing details.</p>
          </div>

          <div className={styles.destinationsGrid}>
            {popularDestinations.map((d) => (
              <Link key={d.name} href={d.route} className={styles.destinationCard}>
                <div className={styles.destCardImgWrap}>
                  <Image 
                    src={d.image} 
                    alt={d.name} 
                    fill 
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className={styles.destImage}
                  />
                  <div className={styles.destOverlay} />
                  <div className={styles.destText}>
                    <div className={styles.destHeader}>
                      <h3>{d.name}</h3>
                      <span className={styles.destDuration}><Clock size={12} style={{ display: 'inline', marginRight: '3px' }} /> {d.time}</span>
                    </div>
                    <p>{d.desc}</p>
                    <span className={styles.destExploreLink}>
                      Explore Route <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PREMIUM FLEET PREVIEW */}
      <section className={`${styles.fleetSection} reveal-on-scroll`} ref={addToRefs}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">Our Fleet</span>
            <h2>Select Your Comfort Level</h2>
            <p>Meticulously maintained, fully air-conditioned cabs driven by highway specialists.</p>
          </div>

          <div className={styles.embla} ref={emblaRef}>
            <div className={styles.embla__container}>
              {loading ? (
                <SkeletonSlide count={3} />
              ) : fleet.map((v) => {
                const details = getFleetDetails(v.category);
                return (
                  <div key={v.id} className={`${styles.fleetCardV2} ${styles.embla__slide}`}>
                  <div className={styles.fleetImgWrap}>
                    <Image 
                      src={v.image_url} 
                      alt={v.name} 
                      fill 
                      style={{ objectFit: "contain", padding: "1.5rem" }} 
                      sizes="(max-width: 768px) 100vw, 33vw" 
                      className={styles.fleetImgFloat}
                    />
                    <span className={`badge badge-navy ${styles.fleetTypeBadge}`}>{v.category} Class</span>
                  </div>

                  <div className={styles.fleetBodyV2}>
                    <div className={styles.fleetHeaderV2}>
                      <h3>{v.name}</h3>
                      <span className={styles.acBadge}>AC</span>
                    </div>
                    
                    <p className={styles.fleetIdealTrip}>{details.idealTrip}</p>

                    <div className={styles.fleetSpecsV2}>
                      <span><Users size={14} /> {v.seats} Passengers</span>
                      <span><Luggage size={14} /> {v.bags} Bags Max</span>
                    </div>

                    <p className={styles.fleetComfortText}>{details.comfortLevel}</p>

                    <div className={styles.fleetFooterV2}>
                      <span className={styles.acDetailsText}>{details.ac}</span>
                      <Link 
                        href={`/?pickup=Chandigarh&drop=${v.category === 'Sedan' ? 'Delhi' : 'Manali'}#booking-widget`} 
                        className="btn btn-primary btn-sm"
                        scroll={true}
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>

          <div className={styles.fleetMore}>
            <Link href="/fleet" className="btn btn-outline">Compare Full Fleet Specifications <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* 6. BRAND STORYTELLING SECTION */}
      <section className={`${styles.aboutExperience} reveal-on-scroll`} ref={addToRefs}>
        <div className="container">
          <div className={styles.aboutStoryGrid}>
            <div className={styles.aboutStoryContent}>
              <span className="section-label">The LookRides Standard</span>
              <h2>Why We Built LookRides</h2>
              <p>
                In 2014, we set out to build something that did not exist in North India: a premium intercity 
                transport platform that put safety, predictability, and driver wellness first.
              </p>
              <p>
                Unlike traditional aggregator platforms that use unpredictable pricing structures and unverified 
                contractors, we believe in **quality control**. We select only the most experienced highway and 
                mountain drivers, guarantee fixed point-to-point fares, and verify that every vehicle is in 
                showroom condition.
              </p>
              <ul className={styles.aboutPillarsList}>
                <li>
                  <span className={styles.checkWrap}><Check size={14} /></span>
                  <strong>Biometric Verification</strong> — Comprehensive background verification of every driver.
                </li>
                <li>
                  <span className={styles.checkWrap}><Check size={14} /></span>
                  <strong>Professional Etiquette</strong> — Chauffeurs trained in passenger safety, route navigation, and hill-driving rules.
                </li>
                <li>
                  <span className={styles.checkWrap}><Check size={14} /></span>
                  <strong>Zero Billing Surprises</strong> — Fixed upfront quotes inclusive of all toll plazas, state border taxes, and fuel.
                </li>
              </ul>
            </div>
            
            <div className={styles.aboutStoryVisual}>
              <div className={styles.aboutVisualBorderWrap}>
                <Image 
                  src="/company-fleet.jpg" 
                  alt="LookRides Verified Highway Chauffeurs" 
                  fill 
                  style={{ objectFit: "cover" }} 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.aboutVisualImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SAFETY SECTION */}
      <section className={`${styles.safetySection} reveal-on-scroll`} ref={addToRefs}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">Your Safety Matters</span>
            <h2>Zero Compromise Safety Architecture</h2>
            <p>Every outstation journey is secured by our strict passenger-safety standards.</p>
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

      {/* 8. TESTIMONIALS UPGRADE */}
      <section className={`${styles.testimonialsSection} reveal-on-scroll`} ref={addToRefs}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">Verified Testimonials</span>
            <h2>Real Reviews from Real Travelers</h2>
            <p>Discover why family, business, and leisure travelers consistently rate us 5 stars on Google.</p>
          </div>

          {loading ? (
            <div className={styles.testimonialsGrid}>
              <SkeletonReviewCard count={3} />
            </div>
          ) : reviews.length === 0 ? (
            <div className={styles.loadingText}>No reviews found.</div>
          ) : (
            <>
              <div className={styles.testimonialsGrid}>
                {reviews.slice(0, 3).map((t, idx) => (
                  <div key={t.id} className={styles.testimonialCardV2}>
                    <div className={styles.tCardHeader}>
                      <div className={styles.tCardAvatarWrap}>
                        <div className={styles.tCardInitialAvatar}>
                          {t.author ? t.author[0].toUpperCase() : 'G'}
                        </div>
                        <span className={styles.tCardBadgeWrap}><Check size={10} style={{ color: 'white' }} /></span>
                      </div>
                      <div className={styles.tCardMetaInfo}>
                        <h4>{t.author}</h4>
                        <span className={styles.tCardRouteText}>{t.city || 'Verified Trip'} Route</span>
                      </div>
                    </div>

                    <div className={styles.tCardStars}>
                      {"★".repeat(t.rating)}
                      <span className={styles.tCardRatingVal}>5.0</span>
                    </div>

                    <p className={styles.tCardText}>&ldquo;{t.text}&rdquo;</p>
                    
                    <div className={styles.tCardFooter}>
                      <span className={styles.tCardVerifiedBadge}>✓ Verified Customer Review</span>
                      <span className={styles.tCardDate}>Mar 2026</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {reviews.length > 3 && (
                <div className={styles.reviewsMore}>
                  <Link href="/contact" className="btn btn-outline">Read All Google Reviews <ArrowRight size={15} /></Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* 9. FAQS */}
      <section className={`${styles.faqSection} reveal-on-scroll`} ref={addToRefs}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">Got Questions?</span>
            <h2>Frequently Asked Questions</h2>
            <p>Clear, direct answers regarding outstation cabs, pricing, and cancellations.</p>
          </div>
          <div className={styles.faqList}>
            {[
              { q: 'How do I book a cab?', a: 'Fill out the secure booking form with your pickup, destination, travel date, and time. We will immediately confirm pricing and driver details via WhatsApp or phone call. Alternatively, you can book directly by calling us at +91 97804 26567.' },
              { q: 'Is the pricing really fixed and all-inclusive?', a: 'Yes! The fare we quote you is fully fixed. It includes all toll taxes (like NH44/NH5 plazas), state entry taxes, fuel charges, and driver allowance. You will pay absolutely nothing extra during the journey.' },
              { q: 'Do you offer one-way drops?', a: 'Yes! Our one-way cab service means you only pay for the distance from your pickup to your destination. We do not charge any return fare, making it the most economical way to travel between Chandigarh, Delhi, and other major cities.' },
              { q: 'How are the drivers verified?', a: 'All LookRides chauffeurs undergo verification checks (identity & biometric), police record clearing, and regular training. They are highly experienced in both plain highways and hill terrains like Manali and Shimla.' },
              { q: 'What is your vehicle safety and sanitization policy?', a: 'Every vehicle undergoes regular mechanical checkups. Cabs are vacuumed, cleaned, and sanitized before and after each outstation ride to maintain high hygienic standards.' },
              { q: 'Can I cancel or reschedule my booking?', a: 'Yes, cancellations and rescheduling are completely free and flexible. Simply contact us via WhatsApp or phone call at least 4 hours before your scheduled pickup.' },
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

      {/* 10. FINAL CTA */}
      <section className={`${styles.ctaSection} reveal-on-scroll`} ref={addToRefs}>
        <div className="container">
          <div className={styles.ctaBox}>
            <div className={styles.ctaContent}>
              <h2>Experience the Premium Way to Travel</h2>
              <p>Book your outstation ride in under 30 seconds. No advance payments required.</p>
              <div className={styles.ctaActions}>
                <Link href="/" className={`btn btn-primary btn-lg`} scroll={false}>Book Your Ride Now</Link>
                <a href="tel:+919780426567" className={`btn btn-outline-white btn-lg ${styles.ctaPhone}`}>
                  <Phone size={18} /> Call Helpline: +91 97804 26567
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
