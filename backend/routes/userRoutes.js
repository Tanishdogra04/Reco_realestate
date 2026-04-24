const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const OTP = require('../models/OTP');
const { sendOTP } = require('../utils/mail');
const { protectUser } = require('../middleware/userAuth');

const router = express.Router();

// Generate JWT for users
const generateToken = (id, email, name) => {
  return jwt.sign({ id, email, name }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// ... existing signup and login routes below ...

// POST /api/users/signup-request
// Initial step: Validate data and send OTP
router.post('/signup-request', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Basic Validation (matching frontend rules)
    const nameRegex = /^[A-Z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<> ]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }
    if (!nameRegex.test(name.trim())) {
       return res.status(400).json({ message: 'Full Name must start with a CAPITAL letter (e.g., "Suman").' });
    }
    if (password.length < 8) {
       return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
    }
    if (!specialCharRegex.test(password)) {
       return res.status(400).json({ message: 'Password must contain at least one special character.' });
    }
    if (!uppercaseRegex.test(password)) {
       return res.status(400).json({ message: 'Password must contain at least one uppercase letter.' });
    }
    if (!numberRegex.test(password)) {
       return res.status(400).json({ message: 'Password must contain at least one number.' });
    }
    if (phone && phone.length !== 10) {
       return res.status(400).json({ message: 'Phone Number must be exactly 10 digits.' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Generate 6-digit numeric OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Store in OTP collection (upsert for same email)
    await OTP.findOneAndUpdate(
      { email },
      { otp: otpCode, createdAt: Date.now() },
      { upsert: true }
    );

    // LOG OTP FOR FRONTEND TESTING (As requested)
    console.log(`\n🔑 [OTP DEBUG] Verification code for ${email}: ${otpCode}\n`);
    require('fs').writeFileSync('/tmp/latest_otp.txt', otpCode);

    // Send Mail (Non-blocking or at least informative if it fails)
    let sent = false;
    try {
      sent = await sendOTP(email, otpCode);
    } catch (mailErr) {
      console.error('Mail delivery error:', mailErr.message);
    }

    if (!sent) {
      console.log('⚠️ [OTP WARNING] Email delivery failed, but OTP is visible above for manual entry.');
      // Optionally still allow the flow by returning a success message if you want to bypass mailing entirely during dev.
      // return res.json({ message: 'Verification code sent (Dev: Check Backend Console).' });
      return res.status(500).json({ message: 'Failed to send verification code. Please try again or check backend logs.' });
    }

    res.json({ message: 'Verification code sent to your email.' });
  } catch (error) {
    console.error('Signup Request error:', error);
    res.status(500).json({ message: 'Server error during signup request.' });
  }
});

// POST /api/users/signup-verify
// Final step: Verify OTP and create user
router.post('/signup-verify', async (req, res) => {
  try {
    const { name, email, phone, password, otp } = req.body;

    if (!otp) {
      return res.status(400).json({ message: 'Verification code is required.' });
    }

    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired verification code.' });
    }

    // Code is valid - Create User
    const user = await User.create({ name, email, phone, password });

    // Delete OTP record after successful signup
    await OTP.deleteOne({ _id: otpRecord._id });

    if (user) {
      res.status(201).json({
        message: 'Registration successful.',
        user: { id: user._id, name: user.name, email: user.email, phone: user.phone, savedProperties: user.savedProperties || [] },
        token: generateToken(user._id, user.email, user.name),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data.' });
    }
  } catch (error) {
    console.error('Signup Verify error:', error);
    res.status(500).json({ message: 'Server error during signup verification.' });
  }
});

// POST /api/users/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const user = await User.create({ name, email, phone, password });

    if (user) {
      res.status(201).json({
        message: 'Registration successful.',
        user: { id: user._id, name: user.name, email: user.email, phone: user.phone, savedProperties: user.savedProperties || [] },
        token: generateToken(user._id, user.email, user.name),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data.' });
    }
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup.' });
  }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'wrong email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'wrong email or password' });
    }

    res.json({
      message: 'Login successful.',
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, savedProperties: user.savedProperties || [] },
      token: generateToken(user._id, user.email, user.name),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

// PUT /api/users/profile
router.put('/profile', protectUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
          savedProperties: updatedUser.savedProperties || [],
        },
        token: generateToken(updatedUser._id, updatedUser.email, updatedUser.name),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error during profile update.' });
  }
});

// POST /api/users/profile/toggle-save/:id
router.post('/profile/toggle-save/:id', protectUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const propertyId = req.params.id;
    // Handle both ObjectId and String comparison
    const isSaved = user.savedProperties.some((id) => id.toString() === propertyId);

    if (isSaved) {
      user.savedProperties = user.savedProperties.filter((id) => id.toString() !== propertyId);
    } else {
      user.savedProperties.push(propertyId);
    }

    await user.save();
    res.json({ message: isSaved ? 'Property unsaved' : 'Property saved', savedProperties: user.savedProperties });
  } catch (error) {
    console.error('Toggle save error:', error);
    res.status(500).json({ message: 'Server error toggle save.' });
  }
});

// GET /api/users/profile/saved-properties
router.get('/profile/saved-properties', protectUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('savedProperties');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.savedProperties);
  } catch (error) {
    console.error('Fetch saved properties error:', error);
    res.status(500).json({ message: 'Server error fetch saved properties.' });
  }
});

module.exports = router;
