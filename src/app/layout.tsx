import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollAnimations from "@/components/ScrollAnimations";
import MobileStickyCta from "@/components/MobileStickyCta";
import { BUSINESS_PHONE, SITE_URL } from "@/lib/config";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], display: "swap" });

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LookRides — Premium Cab Service in Chandigarh & Tricity",
    template: "%s | LookRides — Chandigarh Taxi Service",
  },
  description:
    "Book a taxi in Chandigarh ✓ Premium cab service in Chandigarh, Mohali & Zirakpur ✓ Outstation taxi to Delhi, Manali, Shimla ✓ Airport transfers ✓ Fixed pricing, verified drivers, 24/7 support ✓ Best taxi service in Chandigarh.",
  keywords: [
    "intercity cab service chandigarh", "premium taxi service chandigarh",
    "taxi service chandigarh", "cab service chandigarh", "taxi derabassi",
    "cab derabassi", "taxi zirakpur", "cab zirakpur", "taxi mohali",
    "cab mohali", "taxi panchkula",
    "airport transfer chandigarh", "chandigarh airport taxi", "ixc airport cab",
    "delhi airport taxi chandigarh", "igi airport pickup",
    "outstation taxi chandigarh", "chandigarh to delhi taxi",
    "chandigarh to manali taxi", "chandigarh to shimla taxi",
    "one way cab chandigarh", "chandigarh to amritsar taxi",
    "innova crysta hire chandigarh", "etios taxi chandigarh",
    "tempo traveller booking", "sedan cab chandigarh", "suv rental chandigarh",
    "lookrides", "taxi booking chandigarh", "online cab booking",
    "24 hour taxi service", "best cab service in chandigarh",
    "chandigarh taxi service", "derabassi cab service",
    "cab near me", "taxi near me", "chandigarh to jammu taxi",
    "chandigarh to dehradun taxi", "chandigarh to dharamshala taxi",
    "chandigarh to ludhiana taxi", "chandigarh airport to mohali",
    "chandigarh airport to panchkula", "chandigarh airport to zirakpur",
    "chandigarh to katra taxi", "chandigarh to haridwar taxi",
    "taxi service panchkula", "taxi service mohali",
    "car rental chandigarh", "chandigarh taxi fare",
    "outstation cab booking", "intercity taxi near me",
    "chandigarh cab service 24 hours", "round trip taxi chandigarh",
    "tempo traveller on rent chandigarh", "innova on rent chandigarh",
    "taxi for delhi airport from chandigarh",
  ],
  authors: [{ name: "LookRides", url: siteUrl }],
  creator: "LookRides",
  publisher: "LookRides",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "LookRides",
    title: "LookRides — Taxi in Chandigarh | Premium Cab Service Chandigarh, Mohali & Zirakpur",
    description: "Book a taxi in Chandigarh ₹499 onwards. Premium cab service in Chandigarh, Mohali, Zirakpur. Outstation taxi to Delhi, Manali, Shimla. Airport transfers IXC & IGI Delhi. Fixed pricing, verified drivers, 24/7 support.",
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: "LookRides — Premium Intercity Cab Service" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LookRides | Premium Cab Service Chandigarh",
    description: "Book taxi in Chandigarh ✓ Outstation cabs ✓ Airport transfers ✓ Fixed pricing.",
    images: [`${siteUrl}/og-image.png`],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  alternates: {
    canonical: siteUrl,
    languages: { 'en-in': '/', 'en': '/' },
  },
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
  },
  category: "travel",
  classification: "Transportation",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: "#0B132B",
};

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": `${siteUrl}/services` },
    { "@type": "ListItem", "position": 3, "name": "Our Fleet", "item": `${siteUrl}/fleet` },
    { "@type": "ListItem", "position": 4, "name": "Contact", "item": `${siteUrl}/contact` },
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": "LookRides",
      "description": "Premium intercity cab service in North India.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${siteUrl}/routes/{search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    },
    breadcrumbData,
    {
      "@type": ["LocalBusiness", "TaxiService"],
      "@id": `${siteUrl}/#business`,
      name: "LookRides",
      alternateName: ["LookRide", "Look Ride"],
      description: "Premium intercity cab service, outstation taxi, and airport transfer service in Chandigarh, Derabassi, Zirakpur, and across North India.",
      url: siteUrl,
      telephone: BUSINESS_PHONE,
      email: "info@lookride.in",
      priceRange: "₹₹",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash, UPI, Bank Transfer",
      areaServed: [
        { "@type": "City", name: "Chandigarh" },
        { "@type": "City", name: "Derabassi" },
        { "@type": "City", name: "Zirakpur" },
        { "@type": "City", name: "Mohali" },
        { "@type": "City", name: "Panchkula" },
        { "@type": "State", name: "Punjab" },
        { "@type": "State", name: "Haryana" },
        { "@type": "State", name: "Himachal Pradesh" },
        { "@type": "City", name: "Delhi" },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Village Mirpur, Teh",
        addressLocality: "Derabassi",
        addressRegion: "Punjab",
        postalCode: "140201",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "30.6039",
        longitude: "76.8353",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
      sameAs: [
        "https://wa.me/919780426567",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Taxi Services",
        itemListElement: [
          { "@type": "Offer", name: "Airport Transfer", description: "24/7 airport pickup and drop to Chandigarh & Delhi airports" },
          { "@type": "Offer", name: "Outstation One-way", description: "One-way cab service to Delhi, Manali, Shimla, Amritsar & more" },
          { "@type": "Offer", name: "Outstation Round-trip", description: "Round-trip packages to hill stations and cities" },
        ],
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "54",
        bestRating: "5",
      },
      review: [
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Vivak Anand" },
          reviewRating: { "@type": "Rating", ratingValue: "5" },
          reviewBody: "The Innova Crysta was clean and comfortable. Driver was on time and professional for our trip from Chandigarh to Delhi Airport.",
        },
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Abhishek Kumar" },
          reviewRating: { "@type": "Rating", ratingValue: "5" },
          reviewBody: "Toyota Innova Crysta is a statement of comfort and reliability. Great experience on the Chandigarh to Shimla route.",
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://photon.komoot.io" />
        <link rel="dns-prefetch" href="https://*.supabase.co" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppButton />
        <ScrollAnimations />
        <MobileStickyCta />
      </body>
      <GoogleAnalytics gaId="G-KWGEYR8M8Q" />
    </html>
  );
}
