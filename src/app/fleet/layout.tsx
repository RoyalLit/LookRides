import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Our Fleet | Premium Sedan, Innova Crysta & Tempo Traveller | LookRides',
  description: 'Explore LookRides premium taxi fleet — Toyota Innova Crysta, Etios, Maruti Dzire & Tempo Traveller for outstation trips & airport transfers. All AC, GPS-equipped, sanitized. Book now.',
  keywords: [
    'innova crysta hire chandigarh', 'etios taxi chandigarh',
    'tempo traveller booking chandigarh', 'sedan cab chandigarh',
    'suv rental chandigarh', 'premium taxi fleet',
    'chandigarh taxi car models', 'luxury cab chandigarh',
    'acar taxi chandigarh', 'innova rental chandigarh',
    'toyota innova on rent', 'tempo traveller on rent chandigarh',
  ],
  openGraph: {
    title: 'LookRides Fleet | Innova Crysta, Etios, Dzire & Tempo Traveller',
    description: 'Premium fleet of AC, sanitized vehicles with verified drivers for outstation trips and airport transfers. Innova Crysta, Etios, Dzire & Tempo Traveller.',
    images: '/og-image.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LookRides Premium Fleet',
    description: 'AC, sanitized taxi fleet for outstation trips & airport transfers.',
    images: [SITE_URL + '/og-image.png'],
  },
  alternates: { canonical: `${SITE_URL}/fleet` },
};

const fleetJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Fleet", "item": SITE_URL + "/fleet" },
      ],
    },
    {
      "@type": "ItemList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "item": { "@type": "Vehicle", "name": "Toyota Etios / Maruti Dzire" } },
        { "@type": "ListItem", "position": 2, "item": { "@type": "Vehicle", "name": "Toyota Innova Crysta" } },
        { "@type": "ListItem", "position": 3, "item": { "@type": "Vehicle", "name": "Tempo Traveller" } },
      ],
    },
  ],
};

export default function FleetLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(fleetJsonLd) }} />
      {children}
    </>
  );
}
