const mongoose = require('mongoose');
const Property = require('./models/Property');
const Admin = require('./models/Admin');
require('dotenv').config();

const properties = [
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
    beds: 3,
    baths: 3,
    sqft: 3200,
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
    title: 'Oberoi Sky City',
    location: 'Borivali, Mumbai',
    price: '₹4.50 Cr',
    beds: 3,
    baths: 3,
    sqft: 1800,
    status: 'Ready to Move',
    type: 'Apartment',
    category: 'Buy',
    developer: 'Oberoi Realty',
    rera: 'P518000000',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Hiranandani Estate',
    location: 'Thane, Mumbai',
    price: '₹1.50 Lakh / mo',
    beds: 3,
    baths: 3,
    sqft: 2200,
    status: 'Ready to Move',
    type: 'Apartment',
    category: 'Rent',
    developer: 'Hiranandani',
    rera: 'P517000111',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Commercial Hub',
    location: 'BKC, Mumbai',
    price: '₹85.00 Cr',
    beds: 0,
    baths: 4,
    sqft: 15000,
    status: 'Ready to Move',
    type: 'Commercial',
    category: 'Commercial',
    developer: 'Rustomjee',
    rera: 'P519000999',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'The Vivanta Enclave',
    location: 'Vasant Kunj, Delhi',
    price: 'Price on Request',
    beds: 4,
    baths: 4,
    sqft: 4500,
    status: 'Upcoming',
    type: 'Villa',
    category: 'Buy',
    developer: 'Tata Housing',
    rera: 'Applied',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Phoenix One',
    location: 'Rajajinagar, Bengaluru',
    price: '₹9.20 Cr',
    beds: 3,
    baths: 3,
    sqft: 2800,
    status: 'New Launch',
    type: 'Apartment',
    category: 'Buy',
    developer: 'Phoenix Mills',
    rera: 'PRM/KA/RERA/0088',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'The Grand Waterfront',
    location: 'Jubilee Hills, Hyderabad',
    price: 'Price on Request',
    beds: 6,
    baths: 7,
    sqft: 12000,
    status: 'Upcoming',
    type: 'Penthouse',
    category: 'Buy',
    developer: 'RMZ Corp',
    rera: 'Applied',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
  },
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
