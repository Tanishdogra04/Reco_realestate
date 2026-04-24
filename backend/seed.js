const mongoose = require('mongoose');
const Property = require('./models/Property');
const Admin = require('./models/Admin');
require('dotenv').config();

const properties = [
  // --- BUY SECTION (Residential) ---
  {
    title: 'Lodha Altamount',
    location: 'Altamount Road, Mumbai',
    price: '₹59.00 Cr',
    beds: 5,
    baths: 6,
    sqft: 8500,
    status: 'Ready to Move',
    type: 'Apartment',
    category: 'Buy',
    developer: 'Lodha Group',
    rera: 'P519000123',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    title: 'DLF The Camellias',
    location: 'DLF Phase 5, Gurugram',
    price: '₹24.50 Cr',
    beds: 4,
    baths: 4,
    sqft: 5800,
    status: 'Under Construction',
    type: 'Penthouse',
    category: 'Buy',
    developer: 'DLF Limited',
    rera: 'RC/REP/HARERA/GGM',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    title: 'Prestige Golfshire',
    location: 'Nandi Hills, Bengaluru',
    price: '₹12.50 Cr',
    beds: 4,
    baths: 3,
    sqft: 4100,
    status: 'New Launch',
    type: 'Villa',
    category: 'Buy',
    developer: 'Prestige Group',
    rera: 'PRM/KA/RERA/1250',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    title: 'The Sky Mansions',
    location: 'Chanakyapuri, Delhi',
    price: '₹45.00 Cr',
    beds: 4,
    baths: 5,
    sqft: 7200,
    status: 'Ready to Move',
    type: 'Penthouse',
    category: 'Buy',
    developer: 'DLF Limited',
    rera: 'DLRERA2023001',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    title: 'Emaar Beachfront',
    location: 'Marine Drive, Kochi',
    price: '₹8.75 Cr',
    beds: 3,
    baths: 3,
    sqft: 3500,
    status: 'Under Construction',
    type: 'Apartment',
    category: 'Buy',
    developer: 'Emaar India',
    rera: 'KERA/2024/045',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
  },

  // --- RENT SECTION ---
  {
    title: 'Worli Sea Face Luxury',
    location: 'Worli, Mumbai',
    price: '₹4.50 Lakh / mo',
    beds: 3,
    baths: 3,
    sqft: 2200,
    status: 'Ready to Move',
    type: 'Apartment',
    category: 'Rent',
    developer: 'Hiranandani',
    rera: 'P517000111',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Golf Course Extension Penthouse',
    location: 'Sector 66, Gurugram',
    price: '₹2.75 Lakh / mo',
    beds: 4,
    baths: 4,
    sqft: 4500,
    status: 'Ready to Move',
    type: 'Penthouse',
    category: 'Rent',
    developer: 'M3M India',
    rera: 'HRERA/2022/99',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
  },

  // --- COMMERCIAL SECTION ---
  {
    title: 'One BKC Corporate Suite',
    location: 'BKC, Mumbai',
    price: '₹125.00 Cr',
    beds: 0,
    baths: 4,
    sqft: 25000,
    status: 'Ready to Move',
    type: 'Commercial',
    category: 'Commercial',
    developer: 'Rustomjee',
    rera: 'P519000999',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    title: 'Cyber City Hub',
    location: 'DLF Cyber City, Gurugram',
    price: '₹45.00 Cr',
    beds: 0,
    baths: 10,
    sqft: 18000,
    status: 'Under Construction',
    type: 'Commercial',
    category: 'Commercial',
    developer: 'DLF Limited',
    rera: 'HRERA/2024/012',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Prestige Trade Tower',
    location: 'Palace Road, Bengaluru',
    price: '₹65.00 Cr',
    beds: 0,
    baths: 6,
    sqft: 32000,
    status: 'Ready to Move',
    type: 'Commercial',
    category: 'Commercial',
    developer: 'Prestige Group',
    rera: 'PRM/KA/RERA/0111',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
  },

  // --- PROJECTS (Status-Specific) ---
  {
    title: 'The Riviera New Launch',
    location: 'Candolim, Goa',
    price: '₹7.20 Cr',
    beds: 3,
    baths: 3,
    sqft: 2800,
    status: 'New Launch',
    type: 'Villa',
    category: 'Buy',
    developer: 'The House of Abhinandan Lodha',
    rera: 'GOARERA2024001',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    title: 'Grand Waterfront Phase II',
    location: 'Jubilee Hills, Hyderabad',
    price: '₹15.50 Cr',
    beds: 5,
    baths: 5,
    sqft: 6500,
    status: 'Under Construction',
    type: 'Penthouse',
    category: 'Buy',
    developer: 'RMZ Corp',
    rera: 'TS/RERA/2023/102',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Sobha Dream Gardens',
    location: 'Thanisandra, Bengaluru',
    price: '₹1.80 Cr',
    beds: 2,
    baths: 2,
    sqft: 1200,
    status: 'Ready to Move',
    type: 'Apartment',
    category: 'Buy',
    developer: 'Sobha Limited',
    rera: 'PRM/KA/RERA/1251',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Oberoi Sky City Phase 4',
    location: 'Borivali, Mumbai',
    price: '₹4.20 Cr',
    beds: 3,
    baths: 3,
    sqft: 1650,
    status: 'New Launch',
    type: 'Apartment',
    category: 'Buy',
    developer: 'Oberoi Realty',
    rera: 'P518000000',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Property.deleteMany({});
    console.log('🗑️  Cleared existing properties');

    // Seed properties
    const inserted = await Property.insertMany(properties);
    console.log(`✅ Seeded ${inserted.length} properties`);

    // Admin Management
    console.log('👥 Managing Administrator...');
    await Admin.deleteMany({}); // Clear all admins to ensure only ONE exists
    await Admin.create({ 
      email: 'admin@gmail.com', 
      password: 'Admin@12', 
      name: 'System Admin' 
    });
    console.log('✅ Updated Admin: admin@gmail.com / Admin@12');

    console.log('\n🎉 Database seeded successfully!');
    console.log('🔑 Admin login: admin@gmail.com / Admin@12');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
