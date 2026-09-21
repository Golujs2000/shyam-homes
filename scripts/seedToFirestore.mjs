import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, writeBatch } from "firebase/firestore";
import { properties } from "../src/data/properties.js";

const firebaseConfig = {
  apiKey: "AIzaSyDo-QCU2IDb6ysnD7wQ0Ioi-dy95aaLCAA",
  authDomain: "shyam-homes.firebaseapp.com",
  projectId: "shyam-homes",
  storageBucket: "shyam-homes.firebasestorage.app",
  messagingSenderId: "1085604974184",
  appId: "1:1085604974184:web:0c49b27bb88efb1dd475dd",
  measurementId: "G-557HF7YR4V"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const defaultSettings = {
  siteTitle: 'Shyam Homes',
  tagline: 'Real Estate & Property Consultants Patna',
  phone: '7858832545',
  whatsapp: '7858832545',
  email: 'info@shyamhomes.com',
  address: 'Kankarbagh Main Road, Near Tiwari Bechar, Patna, Bihar 800020',
  operatingHours: 'Monday - Sunday: 9:00 AM - 8:30 PM',
  reraNumber: 'BR-RERA-Applied/2026',
  consultantName: 'Dhananjay Kumar',
  consultantRole: 'Lead Property Advisor & Founder',
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
  youtube: 'https://youtube.com',
};

const sampleLeads = [
  {
    id: "lead-1",
    name: "Vikramaditya Sahay",
    phone: "9835012345",
    type: "Buyer",
    interest: "3 BHK Flat in Boring Road",
    budget: "₹ 80 Lakh - ₹ 1 Cr",
    status: "New",
    date: new Date().toISOString().split("T")[0],
    notes: "Interested in top floor flat near Boring Canal Road.",
  },
  {
    id: "lead-2",
    name: "Dr. Aniruddh Kumar",
    phone: "9431023456",
    type: "Seller",
    interest: "Selling Plot in Danapur (2.5 Kattha)",
    budget: "₹ 65 Lakh",
    status: "In Progress",
    date: new Date().toISOString().split("T")[0],
    notes: "Plot near Saguna More, boundary wall done.",
  },
  {
    id: "lead-3",
    name: "Pooja Kumari",
    phone: "7004567890",
    type: "Tenant",
    interest: "2 BHK Rental in Kankarbagh",
    budget: "₹ 15,000 / month",
    status: "Contacted",
    date: new Date().toISOString().split("T")[0],
    notes: "Family looking to relocate by next month.",
  },
];

const sampleVisits = [
  {
    id: "visit-1",
    clientName: "Rajeev Ranjan",
    phone: "9835112233",
    propertyId: "SH-0001",
    propertyTitle: "3 BHK Independent House in Kankarbagh",
    date: new Date().toISOString().split("T")[0],
    time: "11:00 AM",
    status: "Confirmed",
    consultant: "Dhananjay Kumar",
  },
  {
    id: "visit-2",
    clientName: "Sunita Devi",
    phone: "9934123456",
    propertyId: "SH-0002",
    propertyTitle: "Residential Plot (2 Kattha) in Danapur Cantonment Road",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    time: "03:30 PM",
    status: "Pending",
    consultant: "Dhananjay Kumar",
  },
];

const sampleEnquiries = [
  {
    id: "enq-1",
    clientName: "Manish Kumar Sinha",
    phone: "9122334455",
    propertyId: "SH-0003",
    propertyTitle: "Commercial Shop (350 sq.ft) in Bailey Road Complex",
    purpose: "Investment Enquiry",
    message: "What is the expected rental return on this commercial shop?",
    date: new Date().toISOString().split("T")[0],
    status: "Unread",
  },
];

async function seed() {
  console.log("Starting Firestore database upload for shyam-homes...");
  const batch = writeBatch(db);

  // 1. Properties
  console.log(`Adding ${properties.length} properties...`);
  properties.forEach((prop) => {
    const ref = doc(db, "properties", String(prop.id));
    batch.set(ref, {
      ...prop,
      createdAt: prop.createdAt || new Date().toISOString(),
    });
  });

  // 2. Settings
  console.log("Adding settings...");
  const settingsRef = doc(db, "settings", "general");
  batch.set(settingsRef, {
    ...defaultSettings,
    updatedAt: new Date().toISOString(),
  });

  // 3. Leads
  console.log(`Adding ${sampleLeads.length} leads...`);
  sampleLeads.forEach((lead) => {
    const ref = doc(db, "leads", String(lead.id));
    batch.set(ref, lead);
  });

  // 4. Visits
  console.log(`Adding ${sampleVisits.length} visits...`);
  sampleVisits.forEach((visit) => {
    const ref = doc(db, "visits", String(visit.id));
    batch.set(ref, visit);
  });

  // 5. Enquiries
  console.log(`Adding ${sampleEnquiries.length} enquiries...`);
  sampleEnquiries.forEach((enq) => {
    const ref = doc(db, "enquiries", String(enq.id));
    batch.set(ref, enq);
  });

  await batch.commit();
  console.log("✅ SUCCESS! All data committed to Firestore for project 'shyam-homes'!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Firestore upload error:", err);
  process.exit(1);
});
