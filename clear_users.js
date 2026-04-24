const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' });

const User = require('./backend/models/User');
const OTP = require('./backend/models/OTP');

async function clearUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Clear Users
    const userResult = await User.deleteMany({});
    console.log(`🗑️  Deleted ${userResult.deletedCount} users.`);

    // 2. Clear OTPs
    const otpResult = await OTP.deleteMany({});
    console.log(`🗑️  Deleted ${otpResult.deletedCount} OTP records.`);

    console.log('\n✨ Database cleared successfully. Users can now sign up again.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error clearing database:', err.message);
    process.exit(1);
  }
}

clearUsers();
