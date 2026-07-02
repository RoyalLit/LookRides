import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Fleet | Premium Sedan, Innova Crysta & Tempo Traveler | LookRides',
  description: 'Explore LookRides premium taxi fleet — Toyota Innova Crysta, Etios, Maruti Dzire & Tempo Traveler for outstation trips & airport transfers. All AC, GPS-equipped, sanitized. Book now.',
  keywords: [
    'innova crysta hire chandigarh', 'etios taxi chandigarh',
    'tempo traveler booking chandigarh', 'sedan cab chandigarh',
    'suv rental chandigarh', 'premium taxi fleet',
    'chandigarh taxi car models', 'luxury cab chandigarh',
    'acar taxi chandigarh', 'innova rental chandigarh',
    'toyota innova on rent', 'tempo traveller on rent chandigarh',
  ],
  openGraph: {
    title: 'LookRides Fleet | Innova Crysta, Etios, Dzire & Tempo Traveler',
    description: 'Premium fleet of AC, sanitized vehicles with verified drivers for outstation trips and airport transfers. Innova Crysta, Etios, Dzire & Tempo Traveler.',
    images: '/og-image.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LookRides Premium Fleet',
    description: 'AC, sanitized taxi fleet for outstation trips & airport transfers.',
  },
};

const fleetJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lookrides.com" },
        { "@type": "ListItem", "position": 2, "name": "Fleet", "item": "https://lookrides.com/fleet" },
      ],
    },
    {
      "@type": "ItemList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "item": { "@type": "Vehicle", "name": "Toyota Etios / Maruti Dzire" } },
        { "@type": "ListItem", "position": 2, "item": { "@type": "Vehicle", "name": "Toyota Innova Crysta" } },
        { "@type": "ListItem", "position": 3, "item": { "@type": "Vehicle", "name": "Tempo Traveler" } },
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
