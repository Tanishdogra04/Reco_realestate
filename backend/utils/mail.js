const nodemailer = require('nodemailer');

const sendOTP = async (email, otp) => {
  console.log(`📡 [MAIL SERVICE] Preparing OTP email for ${email}...`);
  
  try {
    // Robust transporter configuration for Gmail
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use SSL/TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify connection configuration
    await transporter.verify();
    console.log("🔓 [MAIL SERVICE] SMTP Connection verified successfully.");

    const mailOptions = {
      from: `"Reco. Elite Properties" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verification Code for Your Elite Account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #0f172a; text-align: center;">Welcome to Reco. Elite</h2>
          <p style="color: #475569; font-size: 16px;">Hello,</p>
          <p style="color: #475569; font-size: 16px;">To complete your registration and secure your property portfolio, please use the 6-digit verification code below:</p>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #f59e0b;">${otp}</span>
          </div>
          <p style="color: #94a3b8; font-size: 14px;">This code will expire in 10 minutes. If you did not request this, please ignore this email.</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          <p style="color: #64748b; font-size: 12px; text-align: center;">Reco. Real Estate Division<br>Luxury Pincodes, India</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log("-----------------------------------------");
    console.log("✅ REAL EMAIL DISPATCHED");
    console.log(`Recipient: ${email}`);
    console.log(`Message ID: ${info.messageId}`);
    console.log("-----------------------------------------");

    return true;
  } catch (error) {
    console.error('❌ [MAIL SERVICE ERROR]:', error);
    return false;
  }
};

module.exports = { sendOTP };


