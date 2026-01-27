// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransporter({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// });

// export const sendOtpEmail = async (email, otp) => {
//   try {
//     console.log('Email config:', {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS ? 'Set' : 'Not set'
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'Hospital - Password Reset OTP',
//       text: `Your OTP is: ${otp}. Valid for 5 minutes.`,
//       html: `
//         <h2>Password Reset OTP</h2>
//         <p>Your OTP for password reset is: <strong>${otp}</strong></p>
//         <p>This OTP will expire in 5 minutes.</p>
//       `
//     };

//     const result = await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully:', result.messageId);
//     return result;
//   } catch (error) {
//     console.error('Email send failed:', error.message);
//     throw new Error(`Failed to send email: ${error.message}`);
//   }
// };
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendOtpEmail = async (email, otp) => {
  try {
    console.log("Email config:", {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS ? "Set" : "Not set"
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Hospital - Password Reset OTP",
      text: `Your OTP is: ${otp}. Valid for 5 minutes.`,
      html: `
        <h2>Password Reset OTP</h2>
        <p>Your OTP for password reset is: <strong>${otp}</strong></p>
        <p>This OTP will expire in 5 minutes.</p>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", result.messageId);
    return result;
  } catch (error) {
    console.error("Email send failed:", error);
    throw new Error("Failed to send email");
  }
};
