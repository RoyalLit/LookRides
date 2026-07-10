const fs = require('fs');

const path = 'src/lib/routes-data.ts';
let content = fs.readFileSync(path, 'utf8');

const updates = {
  'chandigarh-to-dharamshala': { sedan: '₹4,500', suv: '₹6,500' },
  'chandigarh-to-manali': { sedan: '₹4,500', suv: '₹6,500' },
  'chandigarh-to-shimla': { sedan: '₹4,500', suv: '₹6,500' },
  'chandigarh-to-amritsar': { sedan: '₹3,500', suv: '₹5,500' },
  'chandigarh-to-delhi': { sedan: '₹3,500', suv: '₹5,500' }
};

for (const [slug, prices] of Object.entries(updates)) {
  const regex = new RegExp(`(slug:\\s*'${slug}',[\\s\\S]*?sedanPrice:\\s*')[^']+('.*?suvPrice:\\s*')[^']+(')`);
  content = content.replace(regex, `$1${prices.sedan}$2${prices.suv}$3`);
}

// Check if new routes already exist, if not, append them
const newRoutes = `
  {
    slug: 'chandigarh-to-kasol',
    from: 'Chandigarh', to: 'Kasol',
    fromCity: 'Chandigarh', toCity: 'Kasol',
    distance: '270 km', duration: '7 - 8 hours',
    sedanPrice: '₹4,500', suvPrice: '₹6,500',
    category: 'outstation',
    metaTitle: 'Chandigarh to Kasol Taxi @ ₹4,500 | Outstation Cab | LookRides',
    metaDesc: 'Book Chandigarh to Kasol taxi from ₹4,500. Premium outstation cab service. Sedan & SUV. Fixed pricing, no hidden costs. 24/7 availability.',
    keywords: ['chandigarh to kasol taxi', 'kasol cab from chandigarh', 'chandigarh kasol outstation'],
    highlights: ['Comfortable hill driving', 'Experienced drivers', 'Toll & fuel included'],
    stops: ['Rupnagar', 'Mandi', 'Bhuntar'],
    description: 'Travel from Chandigarh to the beautiful Parvati Valley in Kasol comfortably with our verified drivers.',
    faqs: [
      { q: 'What is the Chandigarh to Kasol taxi fare?', a: 'The one-way fare is ₹4,500 for a sedan and ₹6,500 for an SUV.' }
    ],
  },
  {
    slug: 'chandigarh-to-mcleodganj',
    from: 'Chandigarh', to: 'McLeod Ganj',
    fromCity: 'Chandigarh', toCity: 'McLeod Ganj',
    distance: '240 km', duration: '6 - 7 hours',
    sedanPrice: '₹4,500', suvPrice: '₹6,500',
    category: 'outstation',
    metaTitle: 'Chandigarh to McLeod Ganj Taxi @ ₹4,500 | LookRides',
    metaDesc: 'Book Chandigarh to McLeod Ganj taxi from ₹4,500. Sedan & SUV. Fixed pricing, no hidden costs. 24/7 availability.',
    keywords: ['chandigarh to mcleodganj taxi', 'mcleodganj cab from chandigarh'],
    highlights: ['Comfortable hill driving', 'Experienced drivers', 'Toll & fuel included'],
    stops: ['Nangal', 'Una', 'Kangra'],
    description: 'Travel from Chandigarh to the spiritual home of the Dalai Lama in McLeod Ganj with our verified drivers.',
    faqs: [
      { q: 'What is the Chandigarh to McLeod Ganj taxi fare?', a: 'The one-way fare is ₹4,500 for a sedan and ₹6,500 for an SUV.' }
    ],
  },
  {
    slug: 'chandigarh-to-birbiling',
    from: 'Chandigarh', to: 'Bir Billing',
    fromCity: 'Chandigarh', toCity: 'Bir Billing',
    distance: '280 km', duration: '7 - 8 hours',
    sedanPrice: '₹5,500', suvPrice: '₹7,500',
    category: 'outstation',
    metaTitle: 'Chandigarh to Bir Billing Taxi @ ₹5,500 | LookRides',
    metaDesc: 'Book Chandigarh to Bir Billing taxi from ₹5,500. Sedan & SUV. Fixed pricing, no hidden costs. 24/7 availability.',
    keywords: ['chandigarh to bir billing taxi', 'bir billing cab from chandigarh'],
    highlights: ['Comfortable hill driving', 'Experienced drivers', 'Toll & fuel included'],
    stops: ['Rupnagar', 'Kangra', 'Palampur'],
    description: 'Travel from Chandigarh to the paragliding capital Bir Billing comfortably with our verified drivers.',
    faqs: [
      { q: 'What is the Chandigarh to Bir Billing taxi fare?', a: 'The one-way fare is ₹5,500 for a sedan and ₹7,500 for an SUV.' }
    ],
  },
  {
    slug: 'delhi-to-chandigarh',
    from: 'Delhi', to: 'Chandigarh',
    fromCity: 'Delhi', toCity: 'Chandigarh',
    distance: '245 km', duration: '4.5 - 5 hours',
    sedanPrice: '₹3,500', suvPrice: '₹5,500',
    category: 'outstation',
    metaTitle: 'Delhi to Chandigarh Taxi @ ₹3,500 | LookRides',
    metaDesc: 'Book Delhi to Chandigarh taxi from ₹3,500. Sedan & SUV. Fixed pricing, all tolls included. 24/7 availability.',
    keywords: ['delhi to chandigarh taxi', 'chandigarh cab from delhi'],
    highlights: ['Fastest route via NH44', 'Professional drivers', 'Toll & fuel included'],
    stops: ['Murthal', 'Panipat', 'Karnal', 'Ambala'],
    description: 'Travel from Delhi to Chandigarh via NH44 comfortably with our verified drivers.',
    faqs: [
      { q: 'What is the Delhi to Chandigarh taxi fare?', a: 'The one-way fare is ₹3,500 for a sedan and ₹5,500 for an SUV.' }
    ],
  }
];`;

if (!content.includes('chandigarh-to-kasol')) {
  // append before the closing bracket of allRoutes
  content = content.replace(/];$/, newRoutes + '\n];');
}

fs.writeFileSync(path, content);
console.log("Updated routes-data.ts");
