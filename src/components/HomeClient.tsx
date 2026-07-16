'use client';

import { useRef, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BUSINESS_PHONE } from '@/lib/config';
import {
  Users, Star, ArrowRight, CheckCircle, Phone,
  Luggage, Shield, Clock, ShieldCheck,
  BadgeCheck, HeadphonesIcon, Car, Navigation, Check,
} from "lucide-react";
import { FleetVehicle, GoogleReview } from "@/lib/supabase";
import dynamic from "next/dynamic";
import BookingForm from "@/components/BookingForm";
import { SkeletonSlide, SkeletonReviewCard } from "@/components/Skeleton";

const CircularGallery = dynamic(() => import("@/components/CircularGallery"), {
  ssr: false,
  loading: () => <div style={{ height: '550px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>Loading gallery...</div>,
});

const OfficeLocationMap = dynamic(() => import("@/components/home/OfficeLocationMap"), {
  ssr: false,
  loading: () => null,
});
import styles from "@/app/page.module.css";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const trustFeatures = [
  { Icon: BadgeCheck, title: "Verified Drivers", desc: "Every chauffeur undergoes biometric & criminal background checks." },
  { Icon: Shield, title: "Fixed All-Inclusive Fares", desc: "No toll surprises or night charges. You pay exactly what you see." },
  { Icon: ShieldCheck, title: "100% Secure Payments", desc: "Pay securely via PhonePe. All major UPI apps, cards & netbanking accepted." },
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
    image: "/destinations/delhi.webp",
    route: "/routes/chandigarh-to-delhi"
  },
  {
    name: "Shimla",
    desc: "The serene Queen of Hills, featuring pine-filled trails and colonial ridge vistas.",
    time: "3 hours",
    image: "/destinations/shimla.webp",
    route: "/routes/chandigarh-to-shimla"
  },
  {
    name: "Manali",
    desc: "Breathtaking mountain slopes, Aut tunnel highway runs, and Solang snow adventures.",
    time: "7 hours",
    image: "/destinations/manali.webp",
    route: "/routes/chandigarh-to-manali"
  },
  {
    name: "Dharamshala",
    desc: "Nestled in Dhauladhars, offering rich spiritual vibes and scenic tea garden paths.",
    time: "5.5 hours",
    image: "/destinations/dharamshala.webp",
    route: "/routes/chandigarh-to-dharamshala"
  },
  {
    name: "Mussoorie",
    desc: "Gateway to Mist, highlighting beautiful cascades and walking paths above clouds.",
    time: "5.5 hours",
    image: "/destinations/mussoorie.webp",
    route: "/routes/chandigarh-to-dehradun"
  },
  {
    name: "Dehradun",
    desc: "Sprawling valley beauty bounded by Ganges and Yamuna, lush forest trails.",
    time: "4.5 hours",
    image: "/destinations/dehradun.webp",
    route: "/routes/chandigarh-to-dehradun"
  },
  {
    name: "Jammu",
    desc: "Holy city of Temples and the primary baseline for the Vaishno Devi pilgrimage.",
    time: "6.5 hours",
    image: "/destinations/jammu.webp",
    route: "/routes/chandigarh-to-jammu"
  },
  {
    name: "Amritsar",
    desc: "Home to the spectacular Golden Temple, rich Wagah history, and vibrant local cuisine.",
    time: "4 hours",
    image: "/destinations/amritsar.webp",
    route: "/routes/chandigarh-to-amritsar"
  }
];

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

const galleryItems = popularDestinations.map(d => ({ 
  image: d.image, 
  text: d.name,
  desc: d.desc,
  time: d.time,
  route: d.route
}));

interface HomeClientProps {
  fleet: FleetVehicle[];
  reviews: GoogleReview[];
  settings: { google_rating: string; review_count: string };
  loading: boolean;
}

export default function HomeClient({ fleet, reviews, settings, loading }: HomeClientProps) {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 3500, stopOnInteraction: true })]);
  const [reviewsRef] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 4500, stopOnInteraction: true })]);
  const [scrollProgress, setScrollProgress] = useState<number | undefined>(undefined);

  const galleryContainerRef = useRef<HTMLDivElement>(null);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  const addToRefs = useCallback((el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });
    revealRefs.current.forEach(ref => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleGalleryScroll = () => {
      if (!galleryContainerRef.current) return;
      const rect = galleryContainerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const stickyTop = windowHeight * 0.1; // 10vh
      const stickyHeight = windowHeight * 0.8; // 80vh
      const stickyBottom = stickyTop + stickyHeight;
      
      if (rect.top <= stickyTop && rect.bottom >= stickyBottom) {
        const totalScroll = rect.height - stickyHeight;
        const currentScroll = stickyTop - rect.top;
        setScrollProgress(Math.min(Math.max(currentScroll / totalScroll, 0), 1));
      } else if (rect.top > stickyTop) {
        setScrollProgress(0);
      } else {
        setScrollProgress(1);
      }
    };
    window.addEventListener('scroll', handleGalleryScroll, { passive: true });
    handleGalleryScroll();
    return () => window.removeEventListener('scroll', handleGalleryScroll);
  }, []);


  const stats = [
    { val: settings.google_rating, label: "Google Rating", suffix: " ★" },
    { val: "5k+", label: "Completed Trips", suffix: "" },
    { val: "50+", label: "Outstation Routes", suffix: "" },
    { val: "24/7", label: "Support Line", suffix: "" },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "How do I book a cab?", "acceptedAnswer": { "@type": "Answer", "text": "Fill the booking form with your pickup, drop, date and time. We confirm via WhatsApp or phone within minutes. Or just call us at +91 97804 26567." } },
      { "@type": "Question", "name": "What are your service areas?", "acceptedAnswer": { "@type": "Answer", "text": "We cover the entire Tricity area plus outstation routes to Delhi, Manali, Shimla, Amritsar, Dehradun, Dharamshala, Jammu, and all of North India." } },
      { "@type": "Question", "name": "Do you offer one-way cabs?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Our one-way service means you only pay for the onward journey. Perfect for airport drops and single-direction travel. No return fare charges." } },
      { "@type": "Question", "name": "How are your drivers verified?", "acceptedAnswer": { "@type": "Answer", "text": "All drivers undergo background verification, document checks, and professional training. They are experienced on highways and hill roads." } },
      { "@type": "Question", "name": "What vehicles do you offer?", "acceptedAnswer": { "@type": "Answer", "text": "We have Toyota Etios/Maruti Dzire (sedan, 4 seats), Toyota Innova Crysta (SUV, 6 seats), and Tempo Traveller (12 seats). All AC and sanitized." } },
      { "@type": "Question", "name": "Can I modify or cancel my booking?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can call or WhatsApp us to modify or cancel. We offer flexible cancellation policies." } },
    ],
  };

  return (
    <>
      <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      {/* 1. HERO SECTION */}
      <section className={styles.hero} data-journey="hero">
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
              <span>{settings.google_rating} ★ on Google</span>
              <span className={styles.heroBadgeDot}>·</span>
              <span>{settings.review_count} Verified Reviews</span>
            </div>

            <h1 className={styles.heroTitle}>
              <span className="text-gradient">Premium Taxi Service in Chandigarh</span><br />
              Fixed Prices, Verified Drivers, 24/7 Support
            </h1>

            <p className={styles.heroSubtitle}>
              Experience stress-free travel across North India with LookRides — the most trusted cab service in Chandigarh, Mohali, and Zirakpur. Book top-rated outstation 
              taxis and direct airport transfers with fully verified professional chauffeurs, 
              zero hidden fees, and 24/7 dedicated support.
            </p>

            <div className={styles.heroActions}>
              <a href={`tel:${BUSINESS_PHONE}`} className={`btn btn-primary btn-lg ${styles.callBtn}`} aria-label="Call our 24/7 helpline">
                <Phone size={18} />
                Call Helpline (24/7)
              </a>
              <a href="https://wa.me/919780426567?text=Hi!%20I%20want%20to%20book%20a%20ride%20with%20LookRides." 
                 target="_blank" rel="noopener noreferrer"
                 className={`btn btn-gold-outline btn-lg ${styles.whatsappBtn}`}
                 aria-label="Book via WhatsApp">
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

      {/* 2. TRUST MARKERS */}
      <section className={`${styles.trustedSection} reveal-on-scroll`} ref={addToRefs} data-journey="trust">
        <div className={styles.blobGold} style={{ top: '-150px', right: '-150px' }} />
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

      {/* 5. EXPLORE POPULAR DESTINATIONS */}
      <section className={`${styles.destinationsSection} reveal-on-scroll`} ref={addToRefs} data-journey="destinations" data-journey-label="Explore Destinations">
        <div className={styles.blobBlue} style={{ top: '-200px', left: '-150px' }} />
        <div className="container">
          <div className={`${styles.sectionHead} ${styles.revealUp}`}>
            <span className="section-label">Explore Destinations</span>
            <h2>Where to Next? Discover North India</h2>
            <p>Inspiring travel ideas for your next road trip. Scroll to explore customized routing details.</p>
          </div>

        </div>
        
        <div className={styles.scrollJackContainer} ref={galleryContainerRef}>
          <div className={styles.stickyGallery}>
            <CircularGallery
              items={galleryItems}
              bend={3}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollSpeed={2}
              scrollEase={0.02}
              scrollProgress={scrollProgress}
            />
          </div>
        </div>
      </section>

      {/* 4. PREMIUM FLEET PREVIEW */}
      <section className={`${styles.fleetSection} reveal-on-scroll`} ref={addToRefs} data-journey="fleet" data-journey-label="Premium Fleet">
        <div className={styles.blobGold} style={{ top: '10%', left: '-200px' }} />
        <div className={styles.blobBlue} style={{ bottom: '20%', right: '-150px' }} />
        <div className="container">
          <div className={`${styles.sectionHead} ${styles.revealUp}`}>
            <span className="section-label">Our Fleet</span>
            <h2>Select Your Comfort Level</h2>
            <p>Meticulously maintained, fully air-conditioned cabs driven by highway specialists.</p>
          </div>

          <div className={styles.embla} ref={emblaRef} role="region" aria-label="Fleet vehicles carousel" aria-roledescription="carousel">
            <div className={styles.embla__container}>
              {loading ? (
                <SkeletonSlide count={3} />
              ) : fleet.map((v, i) => {
                const details = getFleetDetails(v.category);
                return (
                  <div key={v.id} className={`${styles.embla__slide} ${styles.revealUp}`} style={{ transitionDelay: `${i * 0.1}s` }} role="group" aria-roledescription="slide" aria-label={`Vehicle ${i + 1} of ${fleet.length}`}>
                    <div className={styles.fleetCardV2}>
                      <div className={styles.fleetImgWrap}>
                        <Image 
                          src={v.image_url} 
                          alt={v.name} 
                          fill 
                          style={{ objectFit: "contain", padding: "1.5rem" }} 
                          sizes="(max-width: 768px) 100vw, 33vw" 
                          className={styles.fleetImgFloat}
                          priority={true}
                          unoptimized={true}
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
                            href="#booking-widget" 
                            className="btn btn-primary btn-sm"
                            scroll={true}
                          >
                            Book Now
                          </Link>
                        </div>
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
      <section className={`${styles.aboutExperience} reveal-on-scroll`} ref={addToRefs} data-journey="story">
        <div className={styles.blobGold} style={{ bottom: '-150px', left: '-150px' }} />
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
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SAFETY SECTION */}
      <section className={`${styles.safetySection} reveal-on-scroll`} ref={addToRefs} data-journey="safety">
        <div className={styles.blobBlue} style={{ top: '10%', right: '-100px' }} />
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

      {/* 8. TESTIMONIALS */}
      <section className={`${styles.testimonialsSection} reveal-on-scroll`} ref={addToRefs} data-journey="testimonials" data-journey-label="Customer Stories">
        <div className={styles.blobGold} style={{ top: '-150px', right: '-150px' }} />
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
              <div className={styles.embla} ref={reviewsRef} role="region" aria-label="Customer reviews carousel" aria-roledescription="carousel">
                <div className={styles.embla__container}>
                  {reviews.map((t, idx) => (
                    <div key={t.id} className={`${styles.embla__slide} ${styles.revealUp}`} style={{ transitionDelay: `${idx * 0.1}s` }} role="group" aria-roledescription="slide" aria-label={`Review ${idx + 1} of ${reviews.length}`}>
                      <div className={styles.testimonialCardV2} style={{ height: '100%' }}>
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
                          <span className={styles.tCardRatingVal}>{t.rating}.0</span>
                        </div>

                        <p className={styles.tCardText}>&ldquo;{t.text}&rdquo;</p>
                        
                        <div className={styles.tCardFooter}>
                          <span className={styles.tCardVerifiedBadge}>✓ Verified Customer Review</span>
                          <span className={styles.tCardDate}>{t.created_at ? new Date(t.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={styles.reviewsMore}>
                <Link href="/contact" className="btn btn-outline">Read All Google Reviews <ArrowRight size={15} /></Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* 9. FAQS */}
      <section className={`${styles.faqSection} reveal-on-scroll`} ref={addToRefs} data-journey="faq">
        <div className={styles.blobBlue} style={{ bottom: '-100px', left: '-100px' }} />
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
              <details key={i} className={styles.faqItem}>
                <summary className={styles.faqQ} aria-label={faq.q}>
                  <span>{faq.q}</span>
                </summary>
                <div className={styles.faqA}>
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9.5 LOCATION MAP */}
      <OfficeLocationMap />

      {/* 10. FINAL CTA */}
      <section className={`${styles.ctaSection} reveal-on-scroll`} ref={addToRefs} data-journey="cta">
        <div className="container">
          <div className={styles.ctaBox}>
            <div className={styles.ctaContent}>
              <h2>Experience the Premium Way to Travel</h2>
              <p>Book your outstation ride in under 30 seconds. No advance payments required.</p>
              <div className={styles.ctaActions}>
                <Link href="/" className={`btn btn-primary btn-lg`} scroll={false}>Book Your Ride Now</Link>
                <a href={`tel:${BUSINESS_PHONE}`} className={`btn btn-outline-white btn-lg ${styles.ctaPhone}`}>
                  <Phone size={18} /> Call Helpline: +91 97804 26567
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div></>
  );
}
