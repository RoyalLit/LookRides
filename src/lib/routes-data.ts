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
  category: 'outstation' | 'airport';
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
    distance: '245 km', duration: '4.5 - 5 hours',
    sedanPrice: '₹3,999', suvPrice: '₹5,999',
    category: 'outstation',
    metaTitle: 'Chandigarh to Delhi Taxi @ ₹3,999 | Outstation Cab | LookRides',
    metaDesc: 'Book Chandigarh to Delhi taxi from ₹3,999. Sedan & Innova options. Door-to-door service, fixed pricing, all tolls & taxes included. 24/7 availability.',
    keywords: ['chandigarh to delhi taxi', 'chandigarh delhi cab', 'delhi airport taxi from chandigarh', 'outstation taxi chandigarh delhi'],
    highlights: [
      'Fastest route via NH44',
      'Professional highway drivers',
      'Complimentary water & Wi-Fi',
      'Toll & fuel included',
      'Sanitized & AC vehicles',
    ],
    stops: ['Ambala', 'Kurukshetra', 'Karnal', 'Panipat', 'Sonipat (Murthal)'],
    description: 'The most popular route from Chandigarh to Delhi via NH44. We pass through major hubs like Karnal and Panipat, with optional stops at famous Murthal dhabas.',
    faqs: [
      { q: 'What is the Chandigarh to Delhi taxi fare?', a: 'The one-way fare starts at ₹3,999 for a sedan (Etios/Dzire) and ₹5,999 for an Innova Crysta. All tolls, fuel, and GST are included.' },
      { q: 'Which route do you take for Delhi?', a: 'We take the NH44 highway via Ambala and Panipat. It is the fastest and most well-maintained route.' },
    ],
  },
  {
    slug: 'chandigarh-to-manali',
    from: 'Chandigarh', to: 'Manali',
    fromCity: 'Chandigarh', toCity: 'Manali',
    distance: '280 km', duration: '7 - 8 hours',
    sedanPrice: '₹5,499', suvPrice: '₹7,999',
    category: 'outstation',
    metaTitle: 'Chandigarh to Manali Taxi @ ₹5,499 | Hill Station Cab | LookRides',
    metaDesc: 'Book Chandigarh to Manali taxi from ₹5,499. Scenic mountain journey with experienced hill drivers. Sedan & Innova available. 24/7 bookings.',
    keywords: ['chandigarh to manali taxi', 'manali cab from chandigarh', 'chandigarh manali car rental', 'hill station cab', 'kullu manali taxi'],
    highlights: [
      'Experienced mountain drivers',
      'Scenic NH3 highway route',
      'Break stops at quality hotels',
      'AC vehicles for comfort',
      'Himalayan views throughout',
    ],
    stops: ['Ropar', 'Bilaspur', 'Sundernagar', 'Mandi', 'Pandoh Dam', 'Kullu'],
    via: 'Kullu',
    description: 'Travel to Manali via NH205 and NH3. Our experienced mountain drivers handle the winding roads of Bilaspur and Mandi with ease, ensuring a safe trip.',
    popularBadge: 'Best for Hills',
    faqs: [
      { q: 'What is the Chandigarh to Manali taxi fare?', a: 'The one-way fare is ₹5,499 for a sedan and ₹7,999 for an Innova Crysta. Includes all mountain tolls and taxes.' },
      { q: 'How is the road from Chandigarh to Manali?', a: 'The road is a mix of plains and hills. With the new Aut tunnel and improved NH3, the travel time has reduced significantly.' },
    ],
  },
  {
    slug: 'chandigarh-to-shimla',
    from: 'Chandigarh', to: 'Shimla',
    fromCity: 'Chandigarh', toCity: 'Shimla',
    distance: '115 km', duration: '3 - 3.5 hours',
    sedanPrice: '₹2,799', suvPrice: '₹4,499',
    category: 'outstation',
    metaTitle: 'Chandigarh to Shimla Taxi @ ₹2,799 | Hill Station Cab | LookRides',
    metaDesc: 'Book Chandigarh to Shimla taxi from ₹2,799. Quick 3-hour journey through scenic hills. Sedan & SUV options. 24/7 booking.',
    keywords: ['chandigarh to shimla taxi', 'shimla cab from chandigarh', 'chandigarh shimla car rental', 'shimla hill station taxi'],
    highlights: [
      'Scenic NH5 hill drive',
      'Short 3-hour journey',
      'Flexible stop options',
      'AC comfortable vehicles',
      'Door-to-door service',
    ],
    stops: ['Kalka', 'Parwanoo (Timber Trail)', 'Dharampur', 'Solan', 'Shoghi'],
    via: 'Solan',
    description: 'A quick 3-hour drive to Shimla via NH5. Enjoy the view of Timber Trail at Parwanoo and the mushroom city Solan along the way.',
    faqs: [
      { q: 'What is the Chandigarh to Shimla taxi fare?', a: 'The one-way fare starts at ₹2,799 for a sedan and ₹4,499 for an Innova Crysta.' },
      { q: 'What is the best time to travel from Chandigarh to Shimla?', a: 'Morning departure around 7-8 AM is ideal. You reach Shimla by noon and avoid Kalka traffic.' },
      { q: 'Do you offer Chandigarh to Shimla round trips?', a: 'Yes! We offer round-trip packages including a 2-day Shimla stay with local sightseeing.' },
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
      'Direct highway drop to T3/T1',
      'Luggage assistance',
      'Flight tracking included',
      '24/7 airport transfers',
    ],
    stops: ['Ambala', 'Karnal', 'Panipat', 'IGI Airport'],
    description: 'Direct airport transfer from Chandigarh to Delhi IGI Airport. We take the fastest NH44 route to ensure you never miss a flight.',
    faqs: [
      { q: 'What is the Chandigarh to Delhi Airport taxi fare?', a: 'The fare is ₹4,299 for a sedan and ₹6,499 for an Innova Crysta. Includes all tolls.' },
      { q: 'How early should I leave Chandigarh for a Delhi flight?', a: 'For domestic flights, leave 4-5 hours before. For international, leave 6 hours before departure.' },
      { q: 'Do you drop at both T1 and T3 terminals?', a: 'Yes! We drop at the correct terminal for your flight. T1 for Indigo/SpiceJet, T3 for international and Air India.' },
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
      'Route via Ropar & Phagwara',
      'Comfortable AC journey',
      'Stop at Jalandhar if needed',
      'Toll & fuel included',
    ],
    stops: ['Ropar', 'Nawanshahr', 'Phagwara', 'Jalandhar', 'Amritsar'],
    via: 'Jalandhar',
    description: 'Travel from Chandigarh to Amritsar via NH344A. This route is efficient and avoids the heavy industrial traffic of Ludhiana.',
    faqs: [
      { q: 'What is the Chandigarh to Amritsar taxi fare?', a: 'The one-way fare is ₹3,499 for a sedan and ₹5,499 for an Innova Crysta.' },
      { q: 'Can I visit the Golden Temple and Wagah Border in one day?', a: 'Yes! Our drivers plan the day so you visit Golden Temple in the morning and Wagah Border ceremony by evening.' },
      { q: 'Which route do you take to Amritsar?', a: 'We take the NH344A via Ropar and Jalandhar. It avoids Ludhiana truck traffic and saves time.' },
    ],
  },
  {
    slug: 'chandigarh-to-dharamshala',
    from: 'Chandigarh', to: 'Dharamshala',
    fromCity: 'Chandigarh', toCity: 'Dharamshala',
    distance: '240 km', duration: '5.5 - 6.5 hours',
    sedanPrice: '₹4,499', suvPrice: '₹6,499',
    category: 'outstation',
    metaTitle: 'Chandigarh to Dharamshala Taxi @ ₹4,499 | McLeodganj Cab | LookRides',
    metaDesc: 'Book Chandigarh to Dharamshala taxi from ₹4,499. Scenic drive to the Dalai Lama\'s home. Experienced hill drivers. Sedan & SUV options.',
    keywords: ['chandigarh to dharamshala taxi', 'dharamshala cab chandigarh', 'mcleodganj taxi', 'chandigarh kangra taxi'],
    highlights: [
      'Scenic route via Una & Kangra',
      'Experienced hill drivers',
      'Comfortable AC vehicles',
      'Safe mountain driving',
    ],
    stops: ['Ropar', 'Anandpur Sahib', 'Una', 'Mubarakpur', 'Kangra', 'Dharamshala'],
    description: 'Travel to Dharamshala via NH503. Pass through the holy city of Anandpur Sahib and enjoy the views of Kangra valley.',
    faqs: [
      { q: 'What is the Chandigarh to Dharamshala taxi fare?', a: 'The one-way fare is ₹4,499 for a sedan and ₹6,499 for an Innova Crysta.' },
      { q: 'Is a sedan or SUV better for Dharamshala?', a: 'Both work well, but the Innova is more comfortable for Kangra valley winding roads, especially for families.' },
      { q: 'Can I also visit McLeodganj and Bhagsu?', a: 'Yes! Dharamshala includes McLeodganj and Bhagsu. We drop you at your hotel in any of these areas.' },
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
    metaDesc: 'Book Chandigarh to Dehradun taxi from ₹3,799. Gateway to Mussoorie & Rishikesh. Sedan & Innova. Fixed pricing, highway drivers. 24/7 service.',
    keywords: ['chandigarh to dehradun taxi', 'dehradun cab chandigarh', 'chandigarh mussoorie taxi', 'chandigarh rishikesh cab'],
    highlights: [
      'Scenic foothills drive',
      'Smooth NH7 highway',
      'Break stops available',
      'Comfortable AC ride',
      'Door-to-door service',
    ],
    stops: ['Shahzadpur', 'Yamunanagar', 'Saharanpur', 'Dehradun'],
    description: 'The fastest highway route to Dehradun via NH7. We pass through Yamunanagar and Saharanpur, avoiding the winding hill roads for a smoother, quicker journey.',
    faqs: [
      { q: 'What is Chandigarh to Dehradun taxi fare?', a: 'The fare is ₹3,799 for a sedan and ₹5,799 for an Innova. All tolls and fuel included.' },
      { q: 'Which route do you take from Chandigarh to Dehradun?', a: 'We take the NH7 via Ambala and Yamunanagar. It is the fastest and most comfortable route.' },
      { q: 'Can I extend from Dehradun to Mussoorie or Rishikesh?', a: 'Yes! We offer multi-stop packages. You can add Mussoorie, Rishikesh, or Haridwar to your trip.' },
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
    metaDesc: 'Book Chandigarh to Ludhiana taxi from ₹1,999. Fast 2-hour journey. Sedan & Innova. Fixed pricing, professional drivers. 24/7 availability.',
    keywords: ['chandigarh to ludhiana taxi', 'ludhiana cab chandigarh', 'chandigarh ludhiana car'],
    highlights: [
      'Quick 2-hour journey',
      'Direct highway route',
      'Affordable pricing',
      'Comfortable vehicles',
      'Door-to-door service',
    ],
    stops: ['Kharar', 'Morinda', 'Khamano', 'Samrala', 'Doraha', 'Ludhiana'],
    description: 'Fast and direct cab service from Chandigarh to Ludhiana via NH5. The most efficient route connecting the Tricity with the industrial heart of Punjab.',
    faqs: [
      { q: 'What is the Chandigarh to Ludhiana fare?', a: 'Just ₹1,999 for a sedan and ₹3,299 for an SUV. Best rates for this route.' },
      { q: 'How long does Chandigarh to Ludhiana take?', a: 'About 1.5 to 2 hours depending on traffic. The route is mostly highway.' },
      { q: 'Do you offer same-day returns from Ludhiana?', a: 'Yes! We offer round trips with special discounts on return bookings.' },
    ],
  },
  {
    slug: 'chandigarh-to-jammu',
    from: 'Chandigarh', to: 'Jammu',
    fromCity: 'Chandigarh', toCity: 'Jammu',
    distance: '345 km', duration: '6.5 - 7.5 hours',
    sedanPrice: '₹4,999', suvPrice: '₹7,499',
    category: 'outstation',
    metaTitle: 'Chandigarh to Jammu Taxi @ ₹4,999 | Vaishno Devi Cab | LookRides',
    metaDesc: 'Book Chandigarh to Jammu taxi from ₹4,999. Travel to Vaishno Devi base camp. Sedan & Innova. Experienced highway drivers.',
    keywords: ['chandigarh to jammu taxi', 'jammu cab chandigarh', 'vaishno devi taxi chandigarh', 'chandigarh jammu car rental'],
    highlights: [
      'Route via Pathankot & Lakhanpur',
      'Experienced highway drivers',
      'Comfortable long-distance ride',
      'Safe travel assured',
    ],
    stops: ['Kharar', 'Ropar', 'Hoshiarpur', 'Dasuya', 'Pathankot', 'Lakhanpur', 'Jammu'],
    description: 'The standard and most efficient route to Jammu via Hoshiarpur and Pathankot. This highway path avoids heavy city traffic and is the preferred choice for a fast, reliable journey to the gateway of Kashmir.',
    faqs: [
      { q: 'What is the Chandigarh to Jammu taxi fare?', a: 'The one-way fare is ₹4,999 for a sedan and ₹7,499 for an Innova Crysta.' },
      { q: 'Do you offer Chandigarh to Katra (Vaishno Devi) packages?', a: 'Yes! We have round-trip packages from Chandigarh to Katra with flexible return timing.' },
      { q: 'How long does it take from Chandigarh to Jammu?', a: 'About 6.5 to 7.5 hours via Pathankot highway. We recommend starting early morning.' },
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
      'Quick 20-minute ride',
      'Flight tracking included',
      'Clean & sanitized cabs',
    ],
    stops: ['Sector 70', 'Airport Road', 'Chandigarh Airport'],
    description: 'Reliable and fast airport transfer from Mohali to IXC Airport.',
    faqs: [
      { q: 'How much is a cab from Mohali to Chandigarh Airport?', a: 'Our fare starts at ₹599 for a sedan and ₹899 for an SUV.' },
      { q: 'Which areas of Mohali do you cover?', a: 'All sectors including Sector 70, 71, 63, Aerocity, and all phases of Mohali. Doorstep pickup guaranteed.' },
      { q: 'Can I book a Mohali airport cab for early morning flights?', a: 'Yes! We operate 24/7. Early morning airport transfers are our specialty.' },
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
      'Direct highway access',
      'Professional drivers',
      'Fixed transparent pricing',
    ],
    stops: ['Ambala', 'Karnal', 'Panipat', 'Delhi'],
    description: 'Fastest exit to Delhi from Zirakpur. Avoid Chandigarh city traffic and reach Delhi in record time.',
    faqs: [
      { q: 'What is the Zirakpur to Delhi taxi fare?', a: 'The fare is ₹3,499 for a sedan and ₹5,499 for an Innova.' },
      { q: 'How is Zirakpur to Delhi different from Chandigarh to Delhi?', a: 'Zirakpur sits right on the highway, so you save 30-40 minutes of city traffic. Faster exit to Delhi.' },
      { q: 'Do you provide pickup from any location in Zirakpur?', a: 'Yes! We pick up from any location in Zirakpur including VIP Road, Shimla-Kalka highway, and all housing colonies.' },
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
      'Shortest transfer time',
      'Lowest fare guaranteed',
      'Flight tracking',
    ],
    stops: ['Sector 5', 'Airport Road', 'Chandigarh Airport'],
    description: 'The quickest way to reach Chandigarh Airport from Panchkula.',
    faqs: [
      { q: 'How much from Panchkula to Chandigarh Airport?', a: 'Just ₹499 for a sedan and ₹799 for an SUV.' },
      { q: 'How long does it take from Panchkula to Chandigarh Airport?', a: 'Only 15-25 minutes from most sectors of Panchkula. The airport is just 12 km away.' },
      { q: 'Do you serve all sectors of Panchkula?', a: 'Yes! We provide pickup from all sectors including Sector 1-28, MDC, and Industrial Area.' },
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
    description: 'The fastest and most reliable airport transfer from Derabassi to Chandigarh Airport. Just 25 km, 30 minutes.',
    faqs: [
      { q: 'What is the fare from Derabassi to Chandigarh Airport?', a: 'The fare starts at ₹799 for a sedan and ₹1,199 for an SUV. Best rates in Derabassi.' },
      { q: 'How long does it take from Derabassi to Chandigarh Airport?', a: 'The journey takes approximately 30-40 minutes depending on traffic.' },
      { q: 'Do you serve all sectors of Derabassi?', a: 'Yes! We provide pickup from any location in Derabassi including VIP Road, Nabha Road, and the main market.' },
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
      'Fixed transparent pricing',
    ],
    stops: ['Delhi', 'Manali', 'Shimla', 'Amritsar', 'Dehradun', 'Jammu'],
    description: 'Economical one-way cab service from Chandigarh to any destination. Pay only for the distance you travel.',
    popularBadge: 'Most Economical',
    faqs: [
      { q: 'What is a one-way cab?', a: 'A one-way cab means you pay only for the onward journey. No return fare charges. Perfect for airport drops.' },
      { q: 'How is one-way pricing calculated?', a: 'We charge ₹12/km for sedan and ₹18/km for SUV (Innova). Toll charges are extra for certain routes.' },
      { q: 'Which destinations do you offer one-way to?', a: 'Delhi, Manali, Shimla, Amritsar, Dehradun, Jammu, and anywhere in North India. Just tell us where.' },
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
