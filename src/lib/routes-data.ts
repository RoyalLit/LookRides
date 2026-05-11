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
    distance: '250 km', duration: '4-5 hours',
    sedanPrice: '₹3,500', suvPrice: '₹5,500',
    category: 'outstation',
    metaTitle: 'Chandigarh to Delhi Taxi @ ₹3,500 | Outstation Cab | LookRides',
    metaDesc: 'Book Chandigarh to Delhi taxi from just ₹3,500. Sedan & Innova options. Door-to-door service, fixed pricing, zero hidden charges. 24/7 availability.',
    keywords: ['chandigarh to delhi taxi', 'chandigarh delhi cab', 'delhi airport taxi from chandigarh', 'outstation taxi chandigarh delhi'],
    highlights: [
      'Live GPS tracking for safety',
      'Professional highway drivers',
      'Complimentary water & Wi-Fi',
      'Toll & fuel included',
      'Sanitized & AC vehicles',
    ],
    stops: ['Panchkula', 'Ambala', 'Karnal', 'Panipat', 'Sonipat', 'Delhi Border'],
    description: 'Our Chandigarh to Delhi taxi takes the NH-44 highway via Panchkula, Ambala, Karnal, and Panipat. The journey offers scenic views of Punjab and Haryana countryside.',
    faqs: [
      { q: 'What is the Chandigarh to Delhi taxi fare?', a: 'The one-way fare starts at ₹3,500 for a sedan (Etios/Dzire) and ₹5,500 for an Innova Crysta. All tolls, fuel, and GST are included.' },
      { q: 'How long does Chandigarh to Delhi take by cab?', a: 'The journey takes approximately 4-5 hours via NH-44, depending on traffic conditions. Our drivers choose the best route.' },
      { q: 'Do you offer one-way drops from Chandigarh to Delhi?', a: 'Yes! We specialize in one-way drops. You only pay for the onward journey — no return fare needed.' },
      { q: 'Can I book a Chandigarh to Delhi cab for early morning?', a: 'Absolutely. We operate 24/7. Early morning and late night pickups are our specialty.' },
      { q: 'Which taxi is best for Chandigarh to Delhi trip?', a: 'The Innova Crysta is most popular for family trips. For solo or couple travelers, the sedan is economical and comfortable.' },
    ],
  },
  {
    slug: 'chandigarh-to-manali',
    from: 'Chandigarh', to: 'Manali',
    fromCity: 'Chandigarh', toCity: 'Manali',
    distance: '310 km', duration: '10-12 hours',
    sedanPrice: '₹4,500', suvPrice: '₹6,500',
    category: 'outstation',
    metaTitle: 'Chandigarh to Manali Taxi @ ₹4,500 | Hill Station Cab | LookRides',
    metaDesc: 'Book Chandigarh to Manali taxi from ₹4,500. Scenic mountain journey with experienced hill drivers. Sedan & Innova available. 24/7 bookings.',
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
    description: 'Scenic mountain journey from Chandigarh to the beautiful hill station of Manali. Travel comfortably with experienced drivers who know every mountain curve.',
    popularBadge: 'Best for Hills',
    faqs: [
      { q: 'What is the Chandigarh to Manali taxi fare?', a: 'The one-way fare is ₹4,500 for a sedan and ₹6,500 for an Innova Crysta. Price includes toll, fuel, and driver allowance.' },
      { q: 'How long does it take from Chandigarh to Manali by cab?', a: 'The journey takes 10-12 hours depending on road conditions. We recommend starting early morning for the best experience.' },
      { q: 'Which car is best for Chandigarh to Manali trip?', a: 'The Innova Crysta offers superior comfort for the mountain journey with more legroom and luggage space. Sedans also handle the route well.' },
      { q: 'Is it safe to travel to Manali by taxi?', a: 'Yes. Our drivers are experienced in hill roads, fog, and mountain conditions. Vehicle safety checks are performed before every trip.' },
    ],
  },
  {
    slug: 'chandigarh-to-shimla',
    from: 'Chandigarh', to: 'Shimla',
    fromCity: 'Chandigarh', toCity: 'Shimla',
    distance: '110 km', duration: '3-4 hours',
    sedanPrice: '₹2,500', suvPrice: '₹4,000',
    category: 'outstation',
    metaTitle: 'Chandigarh to Shimla Taxi @ ₹2,500 | Hill Station Cab | LookRides',
    metaDesc: 'Book Chandigarh to Shimla taxi from just ₹2,500. Quick 3-hour journey through scenic hills. Sedan & SUV options. 24/7 booking.',
    keywords: ['chandigarh to shimla taxi', 'shimla cab from chandigarh', 'chandigarh shimla car rental', 'shimla hill station taxi'],
    highlights: [
      'Short scenic hill drive',
      'Experienced drivers',
      'Flexible stop options',
      'AC comfortable vehicles',
      'Door-to-door service',
    ],
    stops: ['Panchkula', 'Kalka', 'Dharampur', 'Solan', 'Kandaghat', 'Shimla'],
    via: 'Kalka',
    description: 'A beautiful 3-hour drive from Chandigarh to the Queen of Hills — Shimla. Perfect weekend getaway with our comfortable cabs.',
    faqs: [
      { q: 'What is the Chandigarh to Shimla taxi fare?', a: 'The one-way fare starts at ₹2,500 for a sedan and ₹4,000 for an Innova Crysta. All-inclusive pricing.' },
      { q: 'How far is Shimla from Chandigarh by road?', a: 'Shimla is approximately 110 km from Chandigarh, taking 3-4 hours depending on traffic and road conditions.' },
    ],
  },
  {
    slug: 'chandigarh-to-delhi-airport',
    from: 'Chandigarh', to: 'Delhi Airport',
    fromCity: 'Chandigarh', toCity: 'Delhi Airport (IGI)',
    distance: '260 km', duration: '4-5 hours',
    sedanPrice: '₹3,800', suvPrice: '₹6,000',
    category: 'airport',
    metaTitle: 'Chandigarh to Delhi Airport Taxi @ ₹3,800 | IGI Pickup | LookRides',
    metaDesc: 'Book Chandigarh to Delhi IGI Airport taxi from ₹3,800. Flight tracking, timely drop, luggage assistance. Sedan & Innova. 24/7 airport transfers.',
    keywords: ['chandigarh to delhi airport taxi', 'chandigarh to igi airport cab', 'delhi airport pickup chandigarh', 'ixc to del airport taxi'],
    highlights: [
      'Flight tracking for timely drop',
      'Luggage assistance',
      'Comfortable AC vehicles',
      'Direct highway route',
      '24/7 availability',
    ],
    stops: ['Panchkula', 'Ambala', 'Karnal', 'Panipat', 'IGI Airport'],
    description: 'Stress-free airport transfer from Chandigarh to Delhi IGI Airport. Flight tracking ensures you reach on time, every time.',
    faqs: [
      { q: 'What is the Chandigarh to Delhi Airport taxi fare?', a: 'The fare is ₹3,800 for a sedan and ₹6,000 for an Innova Crysta. Toll and fuel included.' },
      { q: 'How long before my flight should I book?', a: 'We recommend booking at least 3-4 hours before your flight departure for domestic and 5-6 hours for international flights.' },
    ],
  },
  {
    slug: 'derabassi-to-chandigarh-airport',
    from: 'Derabassi', to: 'Chandigarh Airport',
    fromCity: 'Derabassi', toCity: 'Chandigarh Airport (IXC)',
    distance: '25 km', duration: '30-40 min',
    sedanPrice: '₹600', suvPrice: '₹1,000',
    category: 'airport',
    metaTitle: 'Derabassi to Chandigarh Airport Cab @ ₹600 | IXC Taxi | LookRides',
    metaDesc: 'Quick Derabassi to Chandigarh Airport taxi from just ₹600. 30-minute ride, door-to-door service, flight tracking. Best airport cab in Derabassi.',
    keywords: ['derabassi to chandigarh airport taxi', 'derabassi airport cab', 'ixc airport taxi derabassi', 'chandigarh airport pickup derabassi'],
    highlights: [
      'Quick 30-minute ride',
      'Flight tracking included',
      'Affordable fixed pricing',
      'Professional driver',
      'Sanitized vehicles',
    ],
    stops: ['Derabassi', 'Zirakpur', 'Airport Road', 'Chandigarh Airport'],
    description: 'The fastest and most reliable airport transfer from Derabassi to Chandigarh Airport. Just 25 km, 30 minutes.',
    faqs: [
      { q: 'What is the fare from Derabassi to Chandigarh Airport?', a: 'The fare starts at just ₹600 for a sedan and ₹1,000 for an SUV. Best rates in Derabassi.' },
      { q: 'How long does it take from Derabassi to Chandigarh Airport?', a: 'The journey takes approximately 30-40 minutes depending on traffic.' },
    ],
  },
  {
    slug: 'mohali-to-chandigarh-airport',
    from: 'Mohali', to: 'Chandigarh Airport',
    fromCity: 'Mohali', toCity: 'Chandigarh Airport (IXC)',
    distance: '15 km', duration: '20-30 min',
    sedanPrice: '₹500', suvPrice: '₹800',
    category: 'airport',
    metaTitle: 'Mohali to Chandigarh Airport Cab @ ₹500 | IXC Taxi | LookRides',
    metaDesc: 'Book Mohali to Chandigarh Airport taxi from ₹500. Fast 20-min ride, flight tracking, fixed pricing. Reliable airport cab service in Mohali.',
    keywords: ['mohali to chandigarh airport taxi', 'mohali airport cab', 'ixc taxi from mohali', 'chandigarh airport mohali pickup'],
    highlights: [
      'Only 20 minutes to airport',
      'Lowest price guaranteed',
      'Flight tracking service',
      'Professional drivers',
      'Clean & sanitized cabs',
    ],
    stops: ['Mohali', 'Sector 70', 'Airport Road', 'Chandigarh Airport'],
    description: 'The most affordable airport transfer from Mohali to Chandigarh Airport. Quick 15 km ride.',
    faqs: [
      { q: 'How much is a cab from Mohali to Chandigarh Airport?', a: 'Our fare starts at ₹500 for a sedan and ₹800 for an SUV — the most competitive rates in Mohali.' },
      { q: 'Can I book a Mohali airport cab for early morning flights?', a: 'Yes, we operate 24/7. Early morning airport transfers are our specialty.' },
    ],
  },
  {
    slug: 'chandigarh-to-amritsar',
    from: 'Chandigarh', to: 'Amritsar',
    fromCity: 'Chandigarh', toCity: 'Amritsar',
    distance: '230 km', duration: '4-5 hours',
    sedanPrice: '₹3,200', suvPrice: '₹5,000',
    category: 'outstation',
    metaTitle: 'Chandigarh to Amritsar Taxi @ ₹3,200 | Golden Temple Cab | LookRides',
    metaDesc: 'Book Chandigarh to Amritsar taxi from ₹3,200. Visit the Golden Temple with comfort. Sedan & Innova. Fixed pricing, professional drivers.',
    keywords: ['chandigarh to amritsar taxi', 'amritsar cab from chandigarh', 'golden temple taxi', 'chandigarh amritsar car rental'],
    highlights: [
      'Direct NH-54 highway route',
      'Comfortable AC journey',
      'Stop at Ludhiana if needed',
      'Toll & fuel included',
      'Experienced highway drivers',
    ],
    stops: ['Landran', 'Kharar', 'Sirhind', 'Ludhiana', 'Phagwara', 'Jalandhar', 'Amritsar'],
    via: 'Ludhiana',
    description: 'Travel from Chandigarh to the holy city of Amritsar. Visit the Golden Temple, Wagah Border, and enjoy Punjabi hospitality.',
    faqs: [
      { q: 'What is the Chandigarh to Amritsar taxi fare?', a: 'The one-way fare is ₹3,200 for a sedan and ₹5,000 for an Innova Crysta. All-inclusive pricing with toll and fuel.' },
      { q: 'How long is the Chandigarh to Amritsar drive?', a: 'The journey covers 230 km and takes approximately 4-5 hours via NH-54.' },
    ],
  },
  {
    slug: 'chandigarh-to-dharamshala',
    from: 'Chandigarh', to: 'Dharamshala',
    fromCity: 'Chandigarh', toCity: 'Dharamshala',
    distance: '250 km', duration: '6-7 hours',
    sedanPrice: '₹4,000', suvPrice: '₹6,000',
    category: 'outstation',
    metaTitle: 'Chandigarh to Dharamshala Taxi @ ₹4,000 | McLeodganj Cab | LookRides',
    metaDesc: 'Book Chandigarh to Dharamshala taxi from ₹4,000. Scenic drive to the Dalai Lama\'s home. Experienced hill drivers. Sedan & SUV options.',
    keywords: ['chandigarh to dharamshala taxi', 'dharamshala cab chandigarh', 'mcleodganj taxi', 'chandigarh kangra taxi'],
    highlights: [
      'Scenic Kangra valley views',
      'Experienced hill drivers',
      'Comfortable AC vehicles',
      'Flexible stop options',
      'Safe mountain driving',
    ],
    stops: ['Ropar', 'Nangal', 'Una', 'Kangra', 'Dharamshala'],
    description: 'A scenic journey from Chandigarh to the serene hill station of Dharamshala, home of the Dalai Lama.',
    faqs: [
      { q: 'What is the Chandigarh to Dharamshala taxi fare?', a: 'The one-way fare is ₹4,000 for a sedan and ₹6,000 for an Innova Crysta. All taxes included.' },
      { q: 'Which is better for Dharamshala — sedan or SUV?', a: 'Both work well, but the Innova is more comfortable for the winding hill roads, especially for families.' },
    ],
  },
  {
    slug: 'chandigarh-to-dehradun',
    from: 'Chandigarh', to: 'Dehradun',
    fromCity: 'Chandigarh', toCity: 'Dehradun',
    distance: '210 km', duration: '4-5 hours',
    sedanPrice: '₹3,500', suvPrice: '₹5,500',
    category: 'outstation',
    metaTitle: 'Chandigarh to Dehradun Taxi @ ₹3,500 | Mussoorie Cab | LookRides',
    metaDesc: 'Book Chandigarh to Dehradun taxi from ₹3,500. Gateway to Mussoorie & Rishikesh. Sedan & Innova. Fixed pricing, highway drivers.',
    keywords: ['chandigarh to dehradun taxi', 'dehradun cab chandigarh', 'chandigarh mussoorie taxi', 'chandigarh rishikesh cab'],
    highlights: [
      'Scenic foothills drive',
      'Smooth highway road',
      'Break stops available',
      'Comfortable AC ride',
      'Door-to-door service',
    ],
    stops: ['Ropar', 'Nangal', 'Yamunanagar', 'Dehradun'],
    description: 'Travel from Chandigarh to Dehradun, the gateway to Mussoorie, Rishikesh, and the Himalayan foothills.',
    faqs: [
      { q: 'What is Chandigarh to Dehradun taxi fare?', a: 'The fare is ₹3,500 for a sedan and ₹5,500 for an Innova. All-inclusive pricing.' },
      { q: 'Can I extend the trip from Dehradun to Mussoorie?', a: 'Yes! We offer multi-stop packages. You can add Mussoorie or Rishikesh to your itinerary.' },
    ],
  },
  {
    slug: 'chandigarh-to-ludhiana',
    from: 'Chandigarh', to: 'Ludhiana',
    fromCity: 'Chandigarh', toCity: 'Ludhiana',
    distance: '100 km', duration: '1.5-2 hours',
    sedanPrice: '₹1,800', suvPrice: '₹3,000',
    category: 'outstation',
    metaTitle: 'Chandigarh to Ludhiana Taxi @ ₹1,800 | Outstation Cab | LookRides',
    metaDesc: 'Book Chandigarh to Ludhiana taxi from ₹1,800. Fast 2-hour journey. Sedan & Innova. Fixed pricing, professional drivers.',
    keywords: ['chandigarh to ludhiana taxi', 'ludhiana cab chandigarh', 'chandigarh ludhiana car'],
    highlights: [
      'Quick 2-hour journey',
      'Direct highway route',
      'Affordable pricing',
      'Comfortable vehicles',
      'Door-to-door service',
    ],
    stops: ['Kharar', 'Sirhind', 'Ludhiana'],
    description: 'Fast and affordable travel from Chandigarh to Ludhiana, the industrial hub of Punjab.',
    faqs: [
      { q: 'What is the Chandigarh to Ludhiana fare?', a: 'Just ₹1,800 for a sedan and ₹3,000 for an SUV. Best rates for this route.' },
      { q: 'Can I book a same-day return from Ludhiana?', a: 'Yes! We offer round trips with special discounts on return bookings.' },
    ],
  },
  {
    slug: 'zirakpur-to-delhi',
    from: 'Zirakpur', to: 'Delhi',
    fromCity: 'Zirakpur', toCity: 'Delhi',
    distance: '240 km', duration: '4-5 hours',
    sedanPrice: '₹3,200', suvPrice: '₹5,200',
    category: 'outstation',
    metaTitle: 'Zirakpur to Delhi Taxi @ ₹3,200 | Outstation Cab | LookRides',
    metaDesc: 'Book Zirakpur to Delhi taxi from ₹3,200. Door-to-door service, fixed pricing. Sedan & Innova. 24/7 availability.',
    keywords: ['zirakpur to delhi taxi', 'zirakpur delhi cab', 'delhi taxi from zirakpur', 'zirakpur outstation cab'],
    highlights: [
      'Direct highway access from Zirakpur',
      'Professional drivers',
      'Fixed transparent pricing',
      'AC comfortable vehicles',
      '24/7 availability',
    ],
    stops: ['Panchkula', 'Ambala', 'Karnal', 'Panipat', 'Delhi'],
    description: 'Convenient cab service from Zirakpur to Delhi. Zirakpur\'s location on the highway gives you quick access to Delhi.',
    faqs: [
      { q: 'What is the Zirakpur to Delhi taxi fare?', a: 'The fare is ₹3,200 for a sedan and ₹5,200 for an Innova. Best rates from Zirakpur.' },
      { q: 'Where in Delhi do you drop?', a: 'We provide door-to-door service anywhere in Delhi/NCR including Delhi Airport, railway stations, and hotels.' },
    ],
  },
  {
    slug: 'panchkula-to-chandigarh-airport',
    from: 'Panchkula', to: 'Chandigarh Airport',
    fromCity: 'Panchkula', toCity: 'Chandigarh Airport (IXC)',
    distance: '12 km', duration: '15-25 min',
    sedanPrice: '₹400', suvPrice: '₹700',
    category: 'airport',
    metaTitle: 'Panchkula to Chandigarh Airport Cab @ ₹400 | IXC Taxi | LookRides',
    metaDesc: 'Book Panchkula to Chandigarh Airport taxi from ₹400. Quick 15-min ride. Lowest fare guaranteed. 24/7 airport transfer service.',
    keywords: ['panchkula to chandigarh airport taxi', 'panchkula airport cab', 'ixc taxi panchkula'],
    highlights: [
      'Closest to the airport',
      'Lowest fare guaranteed',
      'Flight tracking',
      'Professional driver',
      'Clean sanitized cab',
    ],
    stops: ['Panchkula', 'Sector 5', 'Airport Road', 'Chandigarh Airport'],
    description: 'The shortest and most affordable airport transfer. Panchkula is just 12 km from Chandigarh Airport.',
    faqs: [
      { q: 'How much from Panchkula to Chandigarh Airport?', a: 'Just ₹400 for a sedan and ₹700 for an SUV. The most affordable airport transfer.' },
      { q: 'How long does it take?', a: 'Only 15-25 minutes depending on traffic. We recommend booking 2 hours before your flight.' },
    ],
  },
  {
    slug: 'chandigarh-to-jammu',
    from: 'Chandigarh', to: 'Jammu',
    fromCity: 'Chandigarh', toCity: 'Jammu',
    distance: '300 km', duration: '5-6 hours',
    sedanPrice: '₹4,500', suvPrice: '₹6,500',
    category: 'outstation',
    metaTitle: 'Chandigarh to Jammu Taxi @ ₹4,500 | Vaishno Devi Cab | LookRides',
    metaDesc: 'Book Chandigarh to Jammu taxi from ₹4,500. Travel to Vaishno Devi base camp. Sedan & Innova. Experienced highway drivers.',
    keywords: ['chandigarh to jammu taxi', 'jammu cab chandigarh', 'vaishno devi taxi chandigarh', 'chandigarh jammu car rental'],
    highlights: [
      'Long highway journey',
      'Comfortable AC ride',
      'Break stops arranged',
      'Experienced drivers',
      'Safe travel assured',
    ],
    stops: ['Ludhiana', 'Jalandhar', 'Pathankot', 'Jammu'],
    description: 'Travel from Chandigarh to the winter capital of Jammu & Kashmir. Gateway to Vaishno Devi, Patnitop, and Kashmir valley.',
    faqs: [
      { q: 'What is the Chandigarh to Jammu taxi fare?', a: 'The one-way fare is ₹4,500 for a sedan and ₹6,500 for an Innova Crysta. All-inclusive pricing.' },
      { q: 'Can I book a round trip to Vaishno Devi?', a: 'Yes! We offer special round-trip packages for Vaishno Devi pilgrims with pickup from Chandigarh.' },
    ],
  },
  {
    slug: 'one-way-cab-chandigarh',
    from: 'Chandigarh', to: 'Anywhere',
    fromCity: 'Chandigarh', toCity: 'Multiple Destinations',
    distance: 'Varies', duration: 'Varies',
    sedanPrice: '₹6/km', suvPrice: '₹10/km',
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
    description: 'One-way cab service from Chandigarh to any destination. The most economical way to travel — you only pay for the distance you travel.',
    popularBadge: 'Most Economical',
    faqs: [
      { q: 'What is a one-way cab?', a: 'A one-way cab means you pay only for the onward journey. No return fare charges. Perfect for airport drops and single-direction travel.' },
      { q: 'Which cities can I take a one-way cab to?', a: 'Delhi, Manali, Shimla, Amritsar, Dehradun, Jammu, and anywhere in North India. Just tell us your destination.' },
      { q: 'How is one-way pricing calculated?', a: 'We charge per kilometer based on the vehicle type. Sedan: ₹6/km, Innova: ₹10/km. Toll and fuel included.' },
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
