export const localities = [
  { name: "Kankarbagh", count: "40+ Properties", tag: "Hot Location" },
  { name: "Patliputra Colony", count: "25+ Properties", tag: "Elite Residential" },
  { name: "Boring Road", count: "35+ Properties", tag: "Commercial & Flats" },
  { name: "Bailey Road", count: "50+ Properties", tag: "Prime Corridor" },
  { name: "Rajendra Nagar", count: "20+ Properties", tag: "Central Patna" },
  { name: "Danapur", count: "45+ Properties", tag: "Plots & Homes" },
  { name: "Phulwari Sharif", count: "18+ Properties", tag: "Near AIIMS" },
  { name: "Saguna More", count: "30+ Properties", tag: "Modern Highrises" },
  { name: "Anisabad", count: "22+ Properties", tag: "South Patna" },
  { name: "Raja Bazar", count: "28+ Properties", tag: "Near IGIMS" },
  { name: "Ashiana Nagar", count: "19+ Properties", tag: "Peaceful Living" },
  { name: "Patna City", count: "24+ Properties", tag: "Heritage & Markets" },
];

export const propertyTypes = [
  "Plot",
  "House",
  "Flat",
  "Commercial",
  "Office",
  "Shop",
  "Land"
];

export const budgetRanges = {
  BUY: [
    { label: "Under ₹ 30 Lakh", min: 0, max: 3000000 },
    { label: "₹ 30 Lakh - ₹ 60 Lakh", min: 3000000, max: 6000000 },
    { label: "₹ 60 Lakh - ₹ 1 Crore", min: 6000000, max: 10000000 },
    { label: "₹ 1 Crore - ₹ 2 Crore", min: 10000000, max: 20000000 },
    { label: "Above ₹ 2 Crore", min: 20000000, max: Infinity }
  ],
  RENT: [
    { label: "Under ₹ 10,000 / mo", min: 0, max: 10000 },
    { label: "₹ 10,000 - ₹ 20,000 / mo", min: 10000, max: 20000 },
    { label: "₹ 20,000 - ₹ 35,000 / mo", min: 20000, max: 35000 },
    { label: "Above ₹ 35,000 / mo", min: 35000, max: Infinity }
  ]
};

export const areaRanges = [
  "Under 1,000 sq.ft",
  "1,000 - 1,500 sq.ft",
  "1,500 - 2,200 sq.ft",
  "2,200+ sq.ft (1+ Kattha)"
];
