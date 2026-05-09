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
    "Book affordable outstation cabs, airport transfers, and local rides with LookRides. Reliable taxi and tour service in Derabassi, Zirakpur, Chandigarh, Mohali, and across North India.",
  keywords: [
    "taxi derabassi", "cab derabassi", "taxi chandigarh", "outstation taxi chandigarh",
    "airport transfer chandigarh", "zirakpur cab", "mohali taxi",
    "innova crysta hire", "tempo traveler chandigarh", "manali cab",
    "shimla taxi", "lookrides", "lookride", "tour and travel derabassi",
  ],
  authors: [{ name: "LookRides", url: siteUrl }],
  creator: "LookRides",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "LookRides",
    title: "LookRides | Premium Taxi Service in Chandigarh & Zirakpur",
    description: "Book affordable outstation cabs, airport transfers, and local rides. Reliable service across Chandigarh, Zirakpur, and North India.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "LookRides — Premium Taxi Service" }],
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

// LocalBusiness + TaxiService + FAQPage JSON-LD structured data
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
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
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
      areaServed: ["Derabassi", "Chandigarh", "Zirakpur", "Mohali", "Panchkula", "Punjab", "Himachal Pradesh"],
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
