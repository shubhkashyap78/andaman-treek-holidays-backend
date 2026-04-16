import nodemailer from 'nodemailer';

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'myandamantour@gmail.com',
    pass: process.env.EMAIL_PASS || 'your_app_password' // Gmail App Password
  }
});

// Send enquiry notification email
export async function sendEnquiryNotification(enquiryData) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'myandamantour@gmail.com',
      to: 'myandamantour@gmail.com', // Your business email
      subject: `🏝️ New Enquiry - ${enquiryData.packageType || 'General'} Package`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0f6a5f, #2ab09f); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #0f6a5f; }
            .value { margin-left: 10px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .cta { background: #f2b241; color: #333; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🏝️ New Customer Enquiry</h2>
              <p>You have received a new enquiry from your website</p>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">👤 Name:</span>
                <span class="value">${enquiryData.name}</span>
              </div>
              <div class="field">
                <span class="label">📧 Email:</span>
                <span class="value">${enquiryData.email}</span>
              </div>
              <div class="field">
                <span class="label">📱 Phone:</span>
                <span class="value">${enquiryData.phone}</span>
              </div>
              <div class="field">
                <span class="label">📦 Package Type:</span>
                <span class="value">${enquiryData.packageType || 'Not specified'}</span>
              </div>
              <div class="field">
                <span class="label">📅 Travel Month:</span>
                <span class="value">${enquiryData.travelMonth || 'Not specified'}</span>
              </div>
              <div class="field">
                <span class="label">👥 Number of Travelers:</span>
                <span class="value">${enquiryData.numberOfTravelers || 1}</span>
              </div>
              <div class="field">
                <span class="label">💬 Message:</span>
                <div class="value" style="background: white; padding: 10px; border-radius: 5px; margin-top: 5px;">
                  ${enquiryData.message || 'No additional message'}
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 20px;">
                <a href="tel:${enquiryData.phone}" class="cta">📞 Call Customer</a>
                <a href="mailto:${enquiryData.email}" class="cta">📧 Reply via Email</a>
                <a href="https://wa.me/91${enquiryData.phone}" class="cta">💬 WhatsApp</a>
              </div>
            </div>
            <div class="footer">
              <p>This enquiry was submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
              <p>My Andaman Tour - Tours and Experiences</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Enquiry notification email sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return false;
  }
}

// Send thank you email to customer
export async function sendThankYouEmail(enquiryData) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'myandamantour@gmail.com',
      to: enquiryData.email,
      subject: '🏝️ Thank You for Your Enquiry - My Andaman Tour',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0f6a5f, #2ab09f); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .contact-info { background: white; padding: 15px; border-radius: 5px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🏝️ Thank You ${enquiryData.name}!</h2>
              <p>Your Andaman adventure awaits</p>
            </div>
            <div class="content">
              <p>Dear ${enquiryData.name},</p>
              
              <p>Thank you for your interest in <strong>My Andaman Tour</strong>! We have received your enquiry for <strong>${enquiryData.packageType || 'our services'}</strong> and our travel experts will contact you within 24 hours.</p>
              
              <p>Here's what happens next:</p>
              <ul>
                <li>📞 Our travel expert will call you within 24 hours</li>
                <li>🎯 We'll create a personalized itinerary based on your preferences</li>
                <li>💰 You'll receive the best pricing for your dream trip</li>
                <li>✈️ We'll handle all bookings and arrangements</li>
              </ul>
              
              <div class="contact-info">
                <h3>📞 Need Immediate Assistance?</h3>
                <p><strong>Phone:</strong> +91-96795-27880 | +91-95319-44080</p>
                <p><strong>WhatsApp:</strong> +91-95319-44080</p>
                <p><strong>Email:</strong> myandamantour@gmail.com</p>
                <p><strong>Office:</strong> 22/4, Church Lane, Goalghar, Port Blair</p>
              </div>
              
              <p>We're excited to help you create unforgettable memories in the beautiful Andaman Islands!</p>
              
              <p>Best regards,<br>
              <strong>My Andaman Tour Team</strong><br>
              Your trusted partner for Andaman adventures</p>
            </div>
            <div class="footer">
              <p>This is an automated confirmation email</p>
              <p>My Andaman Tour - Tours and Experiences</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Thank you email sent to customer');
    return true;
  } catch (error) {
    console.error('❌ Thank you email sending failed:', error);
    return false;
  }
}

// Test email configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email configuration error:', error.message);
  } else {
    console.log('✅ Email server ready for sending emails');
  }
});