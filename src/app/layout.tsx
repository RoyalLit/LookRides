import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollAnimations from "@/components/ScrollAnimations";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], display: "swap" });

const siteUrl = "https://lookrides.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LookRides | Taxi Service in Derabassi, Chandigarh & Zirakpur",
    template: "%s | LookRides",
  },
  description:
    "Book affordable outstation cabs, airport transfers, and local rides with LookRides. Reliable taxi service in Derabassi, Zirakpur, Chandigarh, Mohali, Panchkula and across North India.",
  keywords: [
    // Primary service keywords
    "taxi service chandigarh", "cab service chandigarh", "taxi derabassi", "cab derabassi",
    "taxi zirakpur", "cab zirakpur", "taxi mohali", "cab mohali", "taxi panchkula",
    // Airport transfer keywords
    "airport transfer chandigarh", "chandigarh airport taxi", "ixc airport cab",
    "delhi airport taxi chandigarh", "igi airport pickup", "airport transfer derabassi",
    // Outstation routes
    "outstation taxi chandigarh", "chandigarh to delhi taxi", "chandigarh to manali taxi",
    "chandigarh to shimla taxi", "manali cab from chandigarh", "shimla taxi from chandigarh",
    "outstation cab service", "hill station taxi",
    // Vehicle keywords
    "innova crysta hire chandigarh", "etios taxi chandigarh", "tempo traveler booking",
    "sedan cab chandigarh", "suv rental chandigarh",
    // Brand and location
    "lookrides", "lookride", "tour and travel derabassi", "taxi booking chandigarh",
    "online cab booking", "24 hour taxi service",
  ],
  authors: [{ name: "LookRides", url: siteUrl }],
  creator: "LookRides",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "LookRides",
    title: "LookRides | Premium Taxi Service in Chandigarh & Zirakpur",
    description: "Book affordable outstation cabs, airport transfers, and local rides. Reliable taxi service across Chandigarh, Zirakpur, and North India.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "LookRides — Premium Taxi Service in Chandigarh" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LookRides | Premium Taxi Service in Chandigarh",
    description: "Book outstation cabs, airport transfers & local rides in Chandigarh.",
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
};

export const viewport = {
  themeColor: "#0B132B",
};

// LocalBusiness + TaxiService + FAQPage + BreadcrumbList JSON-LD structured data
const faqData = [
  {
    "@type": "Question",
    "name": "How do I book a cab with LookRides?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Simply fill in the booking form on the homepage with your pickup location, drop destination, date and time. We will confirm your booking via WhatsApp or phone call within minutes."
    }
  },
  {
    "@type": "Question",
    "name": "What is the fare from Chandigarh to Delhi?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "The one-way fare from Chandigarh to Delhi is approximately ₹3,500–₹4,000 for a sedan (Etios/Dzire) and ₹5,500–₹6,500 for an Innova Crysta SUV."
    }
  },
  {
    "@type": "Question",
    "name": "Do you provide airport pick-up and drop?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes! We provide 24/7 airport transfer service to and from Chandigarh (IXC) and Delhi (IGI) airports. Professional drivers track flights for timely pickups."
    }
  },
  {
    "@type": "Question",
    "name": "What vehicles do you have in your fleet?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Our fleet includes Toyota Etios (Sedan, 4 seats), Toyota Innova Crysta (SUV, 6 seats), and Tempo Traveler (MUV, 12 seats). All vehicles are well-maintained and sanitized."
    }
  },
  {
    "@type": "Question",
    "name": "Are your drivers verified and professional?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "All our drivers are background-verified, professionally trained, and follow strict hygiene protocols. They are knowledgeable about routes across North India."
    }
  },
  {
    "@type": "Question",
    "name": "Is LookRides available for outstation trips beyond Chandigarh?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Absolutely! We operate outstation cabs to Manali, Shimla, Dharamshala, Delhi, Amritsar, and all major destinations in North India. Both one-way and round-trip options available."
    }
  },
  {
    "@type": "Question",
    "name": "What payment methods do you accept?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "We accept Cash, UPI (Google Pay, PhonePe, Paytm), and bank transfers. Payment is collected at the end of your journey."
    }
  },
  {
    "@type": "Question",
    "name": "Do you offer round-trip packages?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes! We offer both one-way and round-trip packages. Round-trip fares to major destinations like Manali and Shimla are available at discounted rates."
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
      description: "Premium taxi, outstation cab, and tour & travel service in Derabassi, Zirakpur, Chandigarh, and across North India.",
      url: siteUrl,
      telephone: "+919780426567",
      email: "info@lookride.in",
      priceRange: "₹₹",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash, UPI",
      areaServed: [
        { "@type": "City", name: "Chandigarh" },
        { "@type": "City", name: "Derabassi" },
        { "@type": "City", name: "Zirakpur" },
        { "@type": "City", name: "Mohali" },
        { "@type": "City", name: "Panchkula" },
        { "@type": "State", name: "Punjab" },
        { "@type": "State", name: "Haryana" },
        { "@type": "State", name: "Himachal Pradesh" },
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
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Taxi Services",
        itemListElement: [
          { "@type": "Offer", name: "Airport Transfer", description: "24/7 airport pickup and drop service" },
          { "@type": "Offer", name: "Outstation One-way", description: "One-way cab service to destinations" },
          { "@type": "Offer", name: "Outstation Round-trip", description: "Round-trip cab packages" },
          { "@type": "Offer", name: "Local City Rental", description: "Hourly/daily rental within city" },
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
      </body>
    </html>
  );
}
