import mongoose from "mongoose";
import dotenv from "dotenv";
import Package from "./models/Package.js";
import Activity from "./models/Activity.js";
import Island from "./models/Island.js";
import Honeymoon from "./models/Honeymoon.js";
import Family from "./models/Family.js";
import Ltc from "./models/Ltc.js";
import Group from "./models/Group.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "";

const packages = [
  {
    title: "Family Escape 5N/6D",
    duration: "5 Nights / 6 Days",
    category: "Family",
    priceFrom: 28999,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    description: "Port Blair, Havelock, and Neil with relaxed pacing.",
    highlights: ["Cellular Jail", "Radhanagar Beach", "Glass Boat"],
    location: "Port Blair",
    tags: ["family", "relax"]
  },
  {
    title: "Honeymoon  4N/5D",
    duration: "4 Nights / 5 Days",
    category: "Honeymoon",
    priceFrom: 32999,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    description: "Private cab, candle light dinner, island hopping.",
    highlights: ["Havelock", "Candle Light Dinner", "Sunset Cruise"],
    location: "Havelock",
    tags: ["honeymoon", "romantic"]
  },
  {
    title: "Adventure Circuit 7N/8D",
    duration: "7 Nights / 8 Days",
    category: "Adventure",
    priceFrom: 41999,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    description: "Scuba, kayaking, and island treks.",
    highlights: ["Scuba Diving", "Night Kayaking", "Trekking"],
    location: "Havelock",
    tags: ["adventure"]
  }
];

const activities = [
  {
    title: "Scuba Diving in Havelock",
    category: "Scuba",
    priceFrom: 4500,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    description: "Beginner friendly shore dive with instructor.",
    duration: "2-3 Hours",
    location: "Havelock",
    tags: ["scuba", "water"]
  },
  {
    title: "Sea Walk in North Bay",
    category: "Sea Walk",
    priceFrom: 3500,
    image: "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
    description: "Walk under water with helmet at coral reef.",
    duration: "30-45 Min",
    location: "North Bay",
    tags: ["sea walk"]
  },
  {
    title: "Bioluminescence Night Kayaking",
    category: "Kayaking",
    priceFrom: 2800,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    description: "Paddle at night and see glowing water.",
    duration: "2 Hours",
    location: "Havelock",
    tags: ["kayak", "night"]
  }
];

const islands = [
  {
    name: "Port Blair",
    tagline: "Capital gateway to the islands",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    description: "Museums, Cellular Jail, and nearby beaches.",
    highlights: ["Cellular Jail", "Corbyns Cove", "Ross Island"],
    tags: ["gateway"]
  },
  {
    name: "Havelock (Swaraj Dweep)",
    tagline: "Turquoise waters and white sands",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    description: "Famous for Radhanagar Beach and water sports.",
    highlights: ["Radhanagar Beach", "Elephant Beach"],
    tags: ["beach"]
  },
  {
    name: "Neil (Shaheed Dweep)",
    tagline: "Peaceful, slow, and scenic",
    image: "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
    description: "Natural Rock, Bharatpur Beach, and calm lagoons.",
    highlights: ["Bharatpur", "Natural Rock"],
    tags: ["calm"]
  }
];

const honeymoons = [
  {
    title: "Romantic Bliss 4N/5D",
    subtitle: "Perfect for newlyweds",
    duration: "4 Nights / 5 Days",
    priceFrom: 32999,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    description: "Private cab, candle light dinner, and island hopping for two.",
    highlights: ["Candle Light Dinner", "Sunset Cruise", "Private Beach"],
    tags: ["honeymoon", "romantic"]
  },
  {
    title: "Island Escape 5N/6D",
    subtitle: "Havelock & Neil combo",
    duration: "5 Nights / 6 Days",
    priceFrom: 38999,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    description: "Explore Radhanagar Beach and Neil Island with your partner.",
    highlights: ["Radhanagar Beach", "Neil Island", "Snorkeling"],
    tags: ["honeymoon", "beach"]
  },
  {
    title: "Luxury Honeymoon 6N/7D",
    subtitle: "Premium resort stay",
    duration: "6 Nights / 7 Days",
    priceFrom: 55999,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    description: "Luxury resort, spa, and private island tour.",
    highlights: ["Spa", "Private Island", "Luxury Resort"],
    tags: ["honeymoon", "luxury"]
  },
  {
    title: "Adventure Couple 5N/6D",
    subtitle: "For adventurous couples",
    duration: "5 Nights / 6 Days",
    priceFrom: 42999,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    description: "Scuba diving, kayaking, and trekking together.",
    highlights: ["Scuba Diving", "Kayaking", "Trekking"],
    tags: ["honeymoon", "adventure"]
  },
  {
    title: "Budget Honeymoon 3N/4D",
    subtitle: "Sweet & affordable",
    duration: "3 Nights / 4 Days",
    priceFrom: 22999,
    image: "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
    description: "Port Blair and Havelock with all essentials covered.",
    highlights: ["Port Blair", "Havelock", "Beach Walk"],
    tags: ["honeymoon", "budget"]
  }
];


const families = [
  {
    title: "Family Fun 5N/6D",
    subtitle: "Best for kids & parents",
    duration: "5 Nights / 6 Days",
    priceFrom: 28999,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    description: "Port Blair, Havelock, and Neil with relaxed pacing for the whole family.",
    highlights: ["Cellular Jail", "Radhanagar Beach", "Glass Boat Ride"],
    tags: ["family", "kids"]
  },
  {
    title: "Island Explorer 6N/7D",
    subtitle: "Discover every island",
    duration: "6 Nights / 7 Days",
    priceFrom: 35999,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    description: "Cover Port Blair, Havelock, Neil, and Baratang with family-friendly activities.",
    highlights: ["Baratang Caves", "Elephant Beach", "Ross Island"],
    tags: ["family", "explore"]
  },
  {
    title: "Budget Family 4N/5D",
    subtitle: "Affordable & complete",
    duration: "4 Nights / 5 Days",
    priceFrom: 21999,
    image: "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
    description: "Best value family trip covering key attractions without breaking the bank.",
    highlights: ["Corbyn's Cove", "Chidiya Tapu", "Sea Walk"],
    tags: ["family", "budget"]
  },
  {
    title: "Premium Family 7N/8D",
    subtitle: "Luxury for the whole family",
    duration: "7 Nights / 8 Days",
    priceFrom: 52999,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    description: "Premium hotels, private transfers, and exclusive island experiences.",
    highlights: ["Private Beach", "Luxury Resort", "Snorkeling"],
    tags: ["family", "luxury"]
  },
  {
    title: "Adventure Family 5N/6D",
    subtitle: "Thrills for all ages",
    duration: "5 Nights / 6 Days",
    priceFrom: 38999,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    description: "Kayaking, trekking, and snorkeling — fun for kids and adults alike.",
    highlights: ["Kayaking", "Trekking", "Snorkeling"],
    tags: ["family", "adventure"]
  }
];

const ltcs = [
  {
    title: "LTC Basic 4N/5D",
    subtitle: "Ideal for govt. employees",
    duration: "4 Nights / 5 Days",
    priceFrom: 18999,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    description: "Port Blair sightseeing with LTC-approved hotels and transfers.",
    highlights: ["Cellular Jail", "Corbyn's Cove", "Ross Island"],
    tags: ["ltc", "govt"]
  },
  {
    title: "LTC Standard 5N/6D",
    subtitle: "Port Blair + Havelock",
    duration: "5 Nights / 6 Days",
    priceFrom: 24999,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    description: "Covers Port Blair and Havelock with LTC-compliant billing.",
    highlights: ["Radhanagar Beach", "Elephant Beach", "Cellular Jail"],
    tags: ["ltc", "standard"]
  },
  {
    title: "LTC Premium 6N/7D",
    subtitle: "Port Blair + Havelock + Neil",
    duration: "6 Nights / 7 Days",
    priceFrom: 31999,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    description: "Three-island LTC package with all documentation support.",
    highlights: ["Neil Island", "Havelock", "Port Blair"],
    tags: ["ltc", "premium"]
  },
  {
    title: "LTC Family 6N/7D",
    subtitle: "Family LTC special",
    duration: "6 Nights / 7 Days",
    priceFrom: 27999,
    image: "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
    description: "Family-friendly LTC package with kid-safe activities and approved stays.",
    highlights: ["Glass Boat", "Sea Walk", "Chidiya Tapu"],
    tags: ["ltc", "family"]
  },
  {
    title: "LTC Adventure 5N/6D",
    subtitle: "For the adventurous govt. traveller",
    duration: "5 Nights / 6 Days",
    priceFrom: 28999,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    description: "Scuba, kayaking, and island treks with LTC billing.",
    highlights: ["Scuba Diving", "Kayaking", "Baratang"],
    tags: ["ltc", "adventure"]
  },
  {
    title: "LTC Extended 7N/8D",
    subtitle: "Maximum coverage",
    duration: "7 Nights / 8 Days",
    priceFrom: 38999,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    description: "Full Andaman circuit with Baratang, Neil, Havelock, and Port Blair.",
    highlights: ["Baratang Caves", "Limestone Caves", "Mangrove Creek"],
    tags: ["ltc", "extended"]
  }
];


const groups = [
  {
    title: "Group Escape 5N/6D",
    subtitle: "Perfect for friend groups",
    duration: "5 Nights / 6 Days",
    priceFrom: 18999,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    description: "Port Blair, Havelock, and Neil with group-friendly activities and stays.",
    highlights: ["Cellular Jail", "Radhanagar Beach", "Glass Boat Ride"],
    tags: ["group", "friends"]
  },
  {
    title: "Corporate Group 4N/5D",
    subtitle: "Team outing special",
    duration: "4 Nights / 5 Days",
    priceFrom: 16999,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    description: "Ideal for corporate teams — relaxed itinerary with team bonding activities.",
    highlights: ["Team Activities", "Beach BBQ", "Island Tour"],
    tags: ["group", "corporate"]
  },
  {
    title: "Budget Group 3N/4D",
    subtitle: "Affordable group fun",
    duration: "3 Nights / 4 Days",
    priceFrom: 12999,
    image: "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
    description: "Best value group trip covering key Andaman attractions.",
    highlights: ["Corbyn's Cove", "Ross Island", "Sea Walk"],
    tags: ["group", "budget"]
  },
  {
    title: "Adventure Group 5N/6D",
    subtitle: "Thrills for the whole group",
    duration: "5 Nights / 6 Days",
    priceFrom: 22999,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    description: "Scuba, kayaking, trekking — the ultimate group adventure.",
    highlights: ["Scuba Diving", "Kayaking", "Trekking"],
    tags: ["group", "adventure"]
  },
  {
    title: "Premium Group 6N/7D",
    subtitle: "Luxury group experience",
    duration: "6 Nights / 7 Days",
    priceFrom: 28999,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    description: "Premium hotels, private transfers, and exclusive island experiences for groups.",
    highlights: ["Private Beach", "Luxury Resort", "Sunset Cruise"],
    tags: ["group", "luxury"]
  }
];

async function seed() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI not set");
  }

  await mongoose.connect(MONGODB_URI);

  await Package.deleteMany({});
  await Activity.deleteMany({});
  await Island.deleteMany({});

  await Package.insertMany(packages);
  await Activity.insertMany(activities);
  await Island.insertMany(islands);

  await Honeymoon.deleteMany({});
  await Honeymoon.insertMany(honeymoons);
  await Family.deleteMany({});
  await Family.insertMany(families);
  await Ltc.deleteMany({});
  await Ltc.insertMany(ltcs);
  await Group.deleteMany({});
  await Group.insertMany(groups);

  console.log("Seed complete");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
