const axios = require('axios');
require('dotenv').config({ path: './backend/.env' });

const API_BASE = `http://localhost:${process.env.PORT || 5000}/api/users`;

async function runTests() {
  console.log('🧪 Starting "Suman" Test Case...');

  // 1. Test Case: Lowercase Name
  try {
    console.log('\n1. Testing lowercase name "suman"...');
    const res = await axios.post(`${API_BASE}/signup-request`, {
      name: 'suman',
      email: 'test_suman@gmail.com',
      phone: '9876543210',
      password: 'Password@123'
    });
    console.log('❌ Error: Signup should have failed for lowercase name.');
  } catch (err) {
    console.log(`✅ Expected Failure: ${err.response?.data?.message || err.message}`);
  }

  // 2. Test Case: Capitalized Name (should pass validation)
  try {
    console.log('\n2. Testing capitalized name "Suman"...');
    const res = await axios.post(`${API_BASE}/signup-request`, {
      name: 'Suman Kumar',
      email: 'test_suman@gmail.com',
      phone: '9876543210',
      password: 'Password@123'
    });
    console.log(`✅ Success: ${res.data.message}`);
  } catch (err) {
    console.log(`❌ Unexpected Failure: ${err.response?.data?.message || err.message}`);
  }

  // 3. Test Case: Weak Password
  try {
    console.log('\n3. Testing weak password "suman"...');
    const res = await axios.post(`${API_BASE}/signup-request`, {
      name: 'Suman Kumar',
      email: 'test_suman2@gmail.com',
      phone: '9876543210',
      password: 'suman'
    });
    console.log('❌ Error: Signup should have failed for weak password.');
  } catch (err) {
    console.log(`✅ Expected Failure: ${err.response?.data?.message || err.message}`);
  }

  console.log('\n🎉 Tests completed.');
  process.exit(0);
}

runTests();
