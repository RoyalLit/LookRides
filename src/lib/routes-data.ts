export interface RouteData {
  slug: string;
  from: string;
  to: string;
  fromCity: string;
  toCity: string;
  distance: string;
  duration: string;
  sedanPrice: string;
  suvPrice: string;
  category: 'outstation' | 'airport' | 'local';
  metaTitle: string;
  metaDesc: string;
  keywords: string[];
  highlights: string[];
  stops: string[];
  faqs: { q: string; a: string }[];
  description: string;
  via?: string;
  popularBadge?: string;
}

export const allRoutes: RouteData[] = [
  {
    slug: 'chandigarh-to-delhi',
    from: 'Chandigarh', to: 'Delhi',
    fromCity: 'Chandigarh', toCity: 'Delhi',
    distance: '250 km', duration: '4.5 - 5 hours',
    sedanPrice: '₹3,999', suvPrice: '₹5,999',
    category: 'outstation',
    metaTitle: 'Chandigarh to Delhi Taxi @ ₹3,999 | Outstation Cab | LookRides',
    metaDesc: 'Book Chandigarh to Delhi taxi from ₹3,999. Sedan & Innova options. Door-to-door service, fixed pricing, all tolls & taxes included. 24/7 availability.',
    keywords: ['chandigarh to delhi taxi', 'chandigarh delhi cab', 'delhi airport taxi from chandigarh', 'outstation taxi chandigarh delhi'],
    highlights: [
      'Live GPS tracking for safety',
      'Professional highway drivers',
      'Complimentary water & Wi-Fi',
      'Toll & fuel included',
      'Sanitized & AC vehicles',
    ],
    stops: ['Ambala', 'Kurukshetra', 'Karnal', 'Panipat', 'Sonipat'],
    description: 'Our Chandigarh to Delhi taxi takes the NH-44 highway. The fastest and most comfortable way to reach the capital, perfect for business trips or family visits.',
    faqs: [
      { q: 'What is the Chandigarh to Delhi taxi fare?', a: 'The one-way fare starts at ₹3,999 for a sedan (Etios/Dzire) and ₹5,999 for an Innova Crysta. All tolls, fuel, and GST are included.' },
      { q: 'How long does Chandigarh to Delhi take by cab?', a: 'The journey takes approximately 4.5 to 5 hours via NH-44, depending on traffic conditions.' },
      { q: 'Do you offer one-way drops from Chandigarh to Delhi?', a: 'Yes! We specialize in one-way drops. You only pay for the onward journey — no return fare needed.' },
    ],
  },
  {
    slug: 'chandigarh-to-manali',
    from: 'Chandigarh', to: 'Manali',
    fromCity: 'Chandigarh', toCity: 'Manali',
    distance: '310 km', duration: '8 - 9 hours',
    sedanPrice: '₹5,499', suvPrice: '₹7,999',
    category: 'outstation',
    metaTitle: 'Chandigarh to Manali Taxi @ ₹5,499 | Hill Station Cab | LookRides',
    metaDesc: 'Book Chandigarh to Manali taxi from ₹5,499. Scenic mountain journey with experienced hill drivers. Sedan & Innova available. 24/7 bookings.',
    keywords: ['chandigarh to manali taxi', 'manali cab from chandigarh', 'chandigarh manali car rental', 'hill station cab', 'kullu manali taxi'],
    highlights: [
      'Experienced mountain drivers',
      'Scenic mountain passes',
      'Break stops at quality hotels',
      'AC vehicles for comfort',
      'Himalayan views throughout',
    ],
    stops: ['Ropar', 'Bilaspur', 'Sundernagar', 'Mandi', 'Kullu', 'Manali'],
    via: 'Kullu',
    description: 'Travel from Chandigarh to Manali via the scenic mountain route. Our drivers are experts in hill driving, ensuring a safe and memorable journey through the Himalayas.',
    popularBadge: 'Best for Hills',
    faqs: [
      { q: 'What is the Chandigarh to Manali taxi fare?', a: 'The one-way fare is ₹5,499 for a sedan and ₹7,999 for an Innova Crysta. Price includes toll, fuel, and mountain driving allowance.' },
      { q: 'How long does it take from Chandigarh to Manali by cab?', a: 'The journey takes 8-9 hours via the new highway and tunnels. We recommend starting early morning.' },
    ],
  },
  {
    slug: 'chandigarh-to-shimla',
    from: 'Chandigarh', to: 'Shimla',
    fromCity: 'Chandigarh', toCity: 'Shimla',
    distance: '110 km', duration: '3 - 3.5 hours',
    sedanPrice: '₹2,799', suvPrice: '₹4,499',
    category: 'outstation',
    metaTitle: 'Chandigarh to Shimla Taxi @ ₹2,799 | Hill Station Cab | LookRides',
    metaDesc: 'Book Chandigarh to Shimla taxi from ₹2,799. Quick 3-hour journey through scenic hills. Sedan & SUV options. 24/7 booking.',
    keywords: ['chandigarh to shimla taxi', 'shimla cab from chandigarh', 'chandigarh shimla car rental', 'shimla hill station taxi'],
    highlights: [
      'Short scenic hill drive',
      'Experienced drivers',
      'Flexible stop options',
      'AC comfortable vehicles',
      'Door-to-door service',
    ],
    stops: ['Parwanoo', 'Dharampur', 'Solan', 'Kandaghat', 'Shimla'],
    via: 'Solan',
    description: 'A beautiful 3-hour drive from Chandigarh to the Queen of Hills — Shimla. Perfect for quick getaways or business meetings.',
    faqs: [
      { q: 'What is the Chandigarh to Shimla taxi fare?', a: 'The one-way fare starts at ₹2,799 for a sedan and ₹4,499 for an Innova Crysta. All-inclusive pricing.' },
    ],
  },
  {
    slug: 'chandigarh-to-delhi-airport',
    from: 'Chandigarh', to: 'Delhi Airport',
    fromCity: 'Chandigarh', toCity: 'Delhi Airport (IGI)',
    distance: '260 km', duration: '4.5 - 5 hours',
    sedanPrice: '₹4,299', suvPrice: '₹6,499',
    category: 'airport',
    metaTitle: 'Chandigarh to Delhi Airport Taxi @ ₹4,299 | IGI Pickup | LookRides',
    metaDesc: 'Book Chandigarh to Delhi IGI Airport taxi from ₹4,299. Flight tracking, timely drop, luggage assistance. Sedan & Innova. 24/7 airport transfers.',
    keywords: ['chandigarh to delhi airport taxi', 'chandigarh to igi airport cab', 'delhi airport pickup chandigarh', 'ixc to del airport taxi'],
    highlights: [
      'Flight tracking for timely drop',
      'Luggage assistance',
      'Comfortable AC vehicles',
      'Direct highway route',
      '24/7 availability',
    ],
    stops: ['Ambala', 'Karnal', 'Panipat', 'IGI Airport'],
    description: 'Stress-free airport transfer from Chandigarh to Delhi IGI Airport. We monitor your flight to ensure timely drop-offs and pickups.',
    faqs: [
      { q: 'What is the Chandigarh to Delhi Airport taxi fare?', a: 'The fare is ₹4,299 for a sedan and ₹6,499 for an Innova Crysta. Toll and fuel included.' },
    ],
  },
  {
    slug: 'derabassi-to-chandigarh-airport',
    from: 'Derabassi', to: 'Chandigarh Airport',
    fromCity: 'Derabassi', toCity: 'Chandigarh Airport (IXC)',
    distance: '25 km', duration: '30 - 40 min',
    sedanPrice: '₹799', suvPrice: '₹1,199',
    category: 'airport',
    metaTitle: 'Derabassi to Chandigarh Airport Cab @ ₹799 | IXC Taxi | LookRides',
    metaDesc: 'Quick Derabassi to Chandigarh Airport taxi from ₹799. 30-minute ride, door-to-door service, flight tracking. Best airport cab in Derabassi.',
    keywords: ['derabassi to chandigarh airport taxi', 'derabassi airport cab', 'ixc airport taxi derabassi', 'chandigarh airport pickup derabassi'],
    highlights: [
      'Quick 30-minute ride',
      'Flight tracking included',
      'Affordable fixed pricing',
      'Professional driver',
      'Sanitized vehicles',
    ],
    stops: ['Zirakpur', 'Airport Road', 'Chandigarh Airport'],
    description: 'The fastest and most reliable airport transfer from Derabassi to Chandigarh Airport. Perfect for residents of Derabassi and nearby areas.',
    faqs: [
      { q: 'What is the fare from Derabassi to Chandigarh Airport?', a: 'The fare starts at ₹799 for a sedan and ₹1,199 for an SUV.' },
    ],
  },
  {
    slug: 'mohali-to-chandigarh-airport',
    from: 'Mohali', to: 'Chandigarh Airport',
    fromCity: 'Mohali', toCity: 'Chandigarh Airport (IXC)',
    distance: '15 km', duration: '20 - 30 min',
    sedanPrice: '₹599', suvPrice: '₹899',
    category: 'airport',
    metaTitle: 'Mohali to Chandigarh Airport Cab @ ₹599 | IXC Taxi | LookRides',
    metaDesc: 'Book Mohali to Chandigarh Airport taxi from ₹599. Fast 20-min ride, flight tracking, fixed pricing. Reliable airport cab service in Mohali.',
    keywords: ['mohali to chandigarh airport taxi', 'mohali airport cab', 'ixc taxi from mohali', 'chandigarh airport mohali pickup'],
    highlights: [
      'Only 20 minutes to airport',
      'Lowest price guaranteed',
      'Flight tracking service',
      'Professional drivers',
      'Clean & sanitized cabs',
    ],
    stops: ['Sector 70', 'Airport Road', 'Chandigarh Airport'],
    description: 'Affordable and quick airport transfer from any sector in Mohali to Chandigarh Airport.',
    faqs: [
      { q: 'How much is a cab from Mohali to Chandigarh Airport?', a: 'Our fare starts at ₹599 for a sedan and ₹899 for an SUV.' },
    ],
  },
  {
    slug: 'chandigarh-to-amritsar',
    from: 'Chandigarh', to: 'Amritsar',
    fromCity: 'Chandigarh', toCity: 'Amritsar',
    distance: '230 km', duration: '4 - 4.5 hours',
    sedanPrice: '₹3,499', suvPrice: '₹5,499',
    category: 'outstation',
    metaTitle: 'Chandigarh to Amritsar Taxi @ ₹3,499 | Golden Temple Cab | LookRides',
    metaDesc: 'Book Chandigarh to Amritsar taxi from ₹3,499. Visit the Golden Temple with comfort. Sedan & Innova. Fixed pricing, professional drivers.',
    keywords: ['chandigarh to amritsar taxi', 'amritsar cab from chandigarh', 'golden temple taxi', 'chandigarh amritsar car rental'],
    highlights: [
      'Direct NH-54 highway route',
      'Comfortable AC journey',
      'Stop at Jalandhar if needed',
      'Toll & fuel included',
      'Experienced highway drivers',
    ],
    stops: ['Ludhiana', 'Phagwara', 'Jalandhar', 'Amritsar'],
    via: 'Ludhiana',
    description: 'Travel from Chandigarh to the holy city of Amritsar. Perfect for a day trip to Golden Temple or Wagah Border.',
    faqs: [
      { q: 'What is the Chandigarh to Amritsar taxi fare?', a: 'The one-way fare is ₹3,499 for a sedan and ₹5,499 for an Innova Crysta. All-inclusive.' },
    ],
  },
  {
    slug: 'chandigarh-to-dharamshala',
    from: 'Chandigarh', to: 'Dharamshala',
    fromCity: 'Chandigarh', toCity: 'Dharamshala',
    distance: '250 km', duration: '5.5 - 6.5 hours',
    sedanPrice: '₹4,499', suvPrice: '₹6,499',
    category: 'outstation',
    metaTitle: 'Chandigarh to Dharamshala Taxi @ ₹4,499 | McLeodganj Cab | LookRides',
    metaDesc: 'Book Chandigarh to Dharamshala taxi from ₹4,499. Scenic drive to the Dalai Lama\'s home. Experienced hill drivers. Sedan & SUV options.',
    keywords: ['chandigarh to dharamshala taxi', 'dharamshala cab chandigarh', 'mcleodganj taxi', 'chandigarh kangra taxi'],
    highlights: [
      'Scenic Kangra valley views',
      'Experienced hill drivers',
      'Comfortable AC vehicles',
      'Flexible stop options',
      'Safe mountain driving',
    ],
    stops: ['Ropar', 'Nangal', 'Una', 'Kangra', 'Dharamshala'],
    description: 'A serene journey from Chandigarh to Dharamshala and McLeodganj. Experience the peace of the Kangra valley.',
    faqs: [
      { q: 'What is the Chandigarh to Dharamshala taxi fare?', a: 'The one-way fare is ₹4,499 for a sedan and ₹6,499 for an Innova Crysta.' },
    ],
  },
  {
    slug: 'chandigarh-to-dehradun',
    from: 'Chandigarh', to: 'Dehradun',
    fromCity: 'Chandigarh', toCity: 'Dehradun',
    distance: '210 km', duration: '4 - 5 hours',
    sedanPrice: '₹3,799', suvPrice: '₹5,799',
    category: 'outstation',
    metaTitle: 'Chandigarh to Dehradun Taxi @ ₹3,799 | Mussoorie Cab | LookRides',
    metaDesc: 'Book Chandigarh to Dehradun taxi from ₹3,799. Gateway to Mussoorie & Rishikesh. Sedan & Innova. Fixed pricing, highway drivers.',
    keywords: ['chandigarh to dehradun taxi', 'dehradun cab chandigarh', 'chandigarh mussoorie taxi', 'chandigarh rishikesh cab'],
    highlights: [
      'Scenic foothills drive',
      'Smooth highway road',
      'Break stops available',
      'Comfortable AC ride',
      'Door-to-door service',
    ],
    stops: ['Ropar', 'Nahan', 'Paonta Sahib', 'Dehradun'],
    description: 'Travel from Chandigarh to Dehradun, the gateway to Uttarakhand. Ideal for reaching Mussoorie and Rishikesh.',
    faqs: [
      { q: 'What is Chandigarh to Dehradun taxi fare?', a: 'The fare is ₹3,799 for a sedan and ₹5,799 for an Innova.' },
    ],
  },
  {
    slug: 'chandigarh-to-ludhiana',
    from: 'Chandigarh', to: 'Ludhiana',
    fromCity: 'Chandigarh', toCity: 'Ludhiana',
    distance: '100 km', duration: '1.5 - 2 hours',
    sedanPrice: '₹1,999', suvPrice: '₹3,299',
    category: 'outstation',
    metaTitle: 'Chandigarh to Ludhiana Taxi @ ₹1,999 | Outstation Cab | LookRides',
    metaDesc: 'Book Chandigarh to Ludhiana taxi from ₹1,999. Fast 2-hour journey. Sedan & Innova. Fixed pricing, professional drivers.',
    keywords: ['chandigarh to ludhiana taxi', 'ludhiana cab chandigarh', 'chandigarh ludhiana car'],
    highlights: [
      'Quick 2-hour journey',
      'Direct highway route',
      'Affordable pricing',
      'Comfortable vehicles',
      'Door-to-door service',
    ],
    stops: ['Kharar', 'Morinda', 'Samrala', 'Ludhiana'],
    description: 'Fast and reliable cab service from Chandigarh to Ludhiana, the industrial hub of Punjab.',
    faqs: [
      { q: 'What is the Chandigarh to Ludhiana fare?', a: 'Just ₹1,999 for a sedan and ₹3,299 for an SUV.' },
    ],
  },
  {
    slug: 'zirakpur-to-delhi',
    from: 'Zirakpur', to: 'Delhi',
    fromCity: 'Zirakpur', toCity: 'Delhi',
    distance: '240 km', duration: '4 - 4.5 hours',
    sedanPrice: '₹3,499', suvPrice: '₹5,499',
    category: 'outstation',
    metaTitle: 'Zirakpur to Delhi Taxi @ ₹3,499 | Outstation Cab | LookRides',
    metaDesc: 'Book Zirakpur to Delhi taxi from ₹3,499. Door-to-door service, fixed pricing. Sedan & Innova. 24/7 availability.',
    keywords: ['zirakpur to delhi taxi', 'zirakpur delhi cab', 'delhi taxi from zirakpur', 'zirakpur outstation cab'],
    highlights: [
      'Direct highway access from Zirakpur',
      'Professional drivers',
      'Fixed transparent pricing',
      'AC comfortable vehicles',
      '24/7 availability',
    ],
    stops: ['Ambala', 'Karnal', 'Panipat', 'Delhi'],
    description: 'Convenient cab service from Zirakpur to Delhi. Skip the city traffic and hit the highway directly.',
    faqs: [
      { q: 'What is the Zirakpur to Delhi taxi fare?', a: 'The fare is ₹3,499 for a sedan and ₹5,499 for an Innova.' },
    ],
  },
  {
    slug: 'panchkula-to-chandigarh-airport',
    from: 'Panchkula', to: 'Chandigarh Airport',
    fromCity: 'Panchkula', toCity: 'Chandigarh Airport (IXC)',
    distance: '12 km', duration: '15 - 25 min',
    sedanPrice: '₹499', suvPrice: '₹799',
    category: 'airport',
    metaTitle: 'Panchkula to Chandigarh Airport Cab @ ₹499 | IXC Taxi | LookRides',
    metaDesc: 'Book Panchkula to Chandigarh Airport taxi from ₹499. Quick 15-min ride. Lowest fare guaranteed. 24/7 airport transfer service.',
    keywords: ['panchkula to chandigarh airport taxi', 'panchkula airport cab', 'ixc taxi panchkula'],
    highlights: [
      'Closest to the airport',
      'Lowest fare guaranteed',
      'Flight tracking',
      'Professional driver',
      'Clean sanitized cab',
    ],
    stops: ['Sector 5', 'Airport Road', 'Chandigarh Airport'],
    description: 'Fast and affordable airport transfer from any sector in Panchkula to Chandigarh Airport.',
    faqs: [
      { q: 'How much from Panchkula to Chandigarh Airport?', a: 'Just ₹499 for a sedan and ₹799 for an SUV.' },
    ],
  },
  {
    slug: 'chandigarh-to-jammu',
    from: 'Chandigarh', to: 'Jammu',
    fromCity: 'Chandigarh', toCity: 'Jammu',
    distance: '300 km', duration: '5 - 6 hours',
    sedanPrice: '₹4,999', suvPrice: '₹7,499',
    category: 'outstation',
    metaTitle: 'Chandigarh to Jammu Taxi @ ₹4,999 | Vaishno Devi Cab | LookRides',
    metaDesc: 'Book Chandigarh to Jammu taxi from ₹4,999. Travel to Vaishno Devi base camp. Sedan & Innova. Experienced highway drivers.',
    keywords: ['chandigarh to jammu taxi', 'jammu cab chandigarh', 'vaishno devi taxi chandigarh', 'chandigarh jammu car rental'],
    highlights: [
      'Long highway journey',
      'Comfortable AC ride',
      'Break stops arranged',
      'Experienced drivers',
      'Safe travel assured',
    ],
    stops: ['Jalandhar', 'Pathankot', 'Lakhanpur', 'Jammu'],
    description: 'Comfortable travel from Chandigarh to Jammu, the gateway to the beautiful Kashmir valley and Katra.',
    faqs: [
      { q: 'What is the Chandigarh to Jammu taxi fare?', a: 'The one-way fare is ₹4,999 for a sedan and ₹7,499 for an Innova Crysta.' },
    ],
  },
  {
    slug: 'one-way-cab-chandigarh',
    from: 'Chandigarh', to: 'Anywhere',
    fromCity: 'Chandigarh', toCity: 'Multiple Destinations',
    distance: 'Varies', duration: 'Varies',
    sedanPrice: '₹12/km', suvPrice: '₹18/km',
    category: 'outstation',
    metaTitle: 'One Way Cab in Chandigarh | Drop-Off Taxi Service | LookRides',
    metaDesc: 'Book one-way cab from Chandigarh to any city. Pay only for one-way — no return fare. Delhi, Manali, Shimla, Amritsar & more. 24/7 service.',
    keywords: ['one way cab chandigarh', 'one way taxi chandigarh', 'chandigarh one way cab service', 'chandigarh drop taxi', 'one side taxi chandigarh'],
    highlights: [
      'Pay only for one-way journey',
      'No return fare charges',
      'All major destinations covered',
      'Fixed transparent pricing',
      'Professional drivers',
    ],
    stops: ['Delhi', 'Manali', 'Shimla', 'Amritsar', 'Dehradun', 'Jammu'],
    description: 'Economical one-way cab service from Chandigarh to any destination in North India. Pay only for the distance you travel.',
    popularBadge: 'Most Economical',
    faqs: [
      { q: 'What is a one-way cab?', a: 'A one-way cab means you pay only for the onward journey. No return fare charges. Perfect for airport drops and single-direction travel.' },
      { q: 'How is one-way pricing calculated?', a: 'We charge per kilometer based on the vehicle type. Sedan: ₹12/km, SUV (Innova): ₹18/km. Toll and fuel included in package.' },
    ],
  },
];

export function getRouteBySlug(slug: string): RouteData | undefined {
  return allRoutes.find(r => r.slug === slug);
}

export function getRoutesByCategory(category: RouteData['category']): RouteData[] {
  return allRoutes.filter(r => r.category === category);
}

export function getPopularRoutes(): RouteData[] {
  return allRoutes.filter(r => ['chandigarh-to-delhi', 'chandigarh-to-manali', 'chandigarh-to-shimla', 'chandigarh-to-amritsar'].includes(r.slug));
}
