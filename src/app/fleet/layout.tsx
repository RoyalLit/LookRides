import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Fleet | Premium Sedan, SUV & Tempo Traveler - LookRides',
  description: 'Explore LookRides fleet — Toyota Etios, Maruti Dzire, Innova Crysta & Tempo Traveler. All AC, GPS-equipped, sanitized. Perfect for outstation trips & airport transfers.',
  keywords: [
    'innova crysta hire chandigarh', 'etios taxi chandigarh',
    'tempo traveler booking chandigarh', 'sedan cab chandigarh',
    'suv rental chandigarh', 'premium taxi fleet',
    'chandigarh taxi car models', 'luxury cab chandigarh',
    'acar taxi chandigarh', 'innova rental chandigarh',
  ],
  openGraph: {
    title: 'LookRides Fleet | Sedan, Innova & Tempo Traveler',
    description: 'Premium fleet of AC, sanitized vehicles with verified drivers. Choose from Etios, Dzire, Innova Crysta or Tempo Traveler.',
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
