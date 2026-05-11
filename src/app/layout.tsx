import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollAnimations from "@/components/ScrollAnimations";
import MobileStickyCta from "@/components/MobileStickyCta";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], display: "swap" });

const siteUrl = "https://lookrides.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LookRides — Premium Intercity Cab Service in Chandigarh, Derabassi & Zirakpur",
    template: "%s | LookRides",
  },
  description:
    "North India's premium intercity cab service. Book outstation taxis & airport transfers across Chandigarh, Derabassi, Zirakpur, Mohali & Punjab. Fixed pricing, verified drivers, 24/7 support.",
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
    "tempo traveler booking", "sedan cab chandigarh", "suv rental chandigarh",
    "lookrides", "taxi booking chandigarh", "online cab booking",
    "24 hour taxi service", "best cab service in chandigarh",
    "chandigarh taxi service", "derabassi cab service",
  ],
  authors: [{ name: "LookRides", url: siteUrl }],
  creator: "LookRides",
  publisher: "LookRides",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "LookRides",
    title: "LookRides — Premium Intercity Cab Service in Chandigarh, Derabassi & Zirakpur",
    description: "North India's premium intercity cab service. Book outstation taxis & airport transfers. Fixed pricing, verified drivers, 24/7 support.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "LookRides — Premium Intercity Cab Service" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LookRides | Premium Intercity Cab Service",
    description: "Book outstation cabs & airport transfers in Chandigarh.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
    ],
    apple: "/logo.png",
  },
  alternates: { canonical: siteUrl },
  category: "travel",
  classification: "Transportation",
};

export const viewport = {
  themeColor: "#0B132B",
};

const faqData = [
  {
    "@type": "Question",
    "name": "How do I book a cab with LookRides?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Fill in the booking form on the homepage with your pickup, drop, date and time. We confirm via WhatsApp or phone within minutes. You can also call us directly at +91 97804 26567 for instant booking."
    }
  },
  {
    "@type": "Question",
    "name": "What is the fare from Chandigarh to Delhi?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "The one-way fare from Chandigarh to Delhi is ₹3,500 for a sedan (Etios/Dzire) and ₹5,500 for an Innova Crysta SUV. All tolls, fuel, and GST are included — no hidden charges."
    }
  },
  {
    "@type": "Question",
    "name": "Do you provide airport pick-up and drop?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes! We provide 24/7 airport transfers to and from Chandigarh (IXC) and Delhi (IGI) airports. Our drivers track flights for timely pickups. Fare from Derabassi to Chandigarh Airport starts at ₹600."
    }
  },
  {
    "@type": "Question",
    "name": "What vehicles do you have?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Our fleet includes Toyota Etios/Maruti Dzire (Sedan, 4 seats), Toyota Innova Crysta (SUV, 6 seats), and Tempo Traveler (MUV, 12 seats). All vehicles are well-maintained, sanitized, and AC equipped."
    }
  },
  {
    "@type": "Question",
    "name": "Are your drivers verified?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "All our drivers are background-verified, professionally trained, and follow strict hygiene protocols. They are experienced on routes across North India including hill roads and highways."
    }
  },
  {
    "@type": "Question",
    "name": "Do you offer one-way cabs?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Absolutely! Our one-way cab service means you only pay for the onward journey — no return fare. Perfect for airport drops, Delhi trips, and single-direction travel. Fixed fares based on destination."
    }
  },
  {
    "@type": "Question",
    "name": "What payment methods are accepted?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "We accept Cash, UPI (Google Pay, PhonePe, Paytm), and bank transfers. Payment is collected at the end of your journey. Online payment options coming soon."
    }
  },
  {
    "@type": "Question",
    "name": "Does LookRides serve my area?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "We serve the entire Tricity area plus outstation routes to Delhi, Manali, Shimla, Amritsar, Dehradun, Dharamshala, Jammu, and all of North India."
    }
  },
];

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
    breadcrumbData,
    {
      "@type": ["LocalBusiness", "TaxiService"],
      "@id": `${siteUrl}/#business`,
      name: "LookRides",
      alternateName: ["LookRide", "Look Ride"],
      description: "Premium intercity cab service, outstation taxi, and airport transfer service in Chandigarh, Derabassi, Zirakpur, and across North India.",
      url: siteUrl,
      telephone: "+919780426567",
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
    {
      "@type": "FAQPage",
      "mainEntity": faqData,
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <ScrollAnimations />
        <MobileStickyCta />
      </body>
    </html>
  );
}
