import User from "../models/user.model.js";
import Otp from "../models/otp.model.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import { sendOtpEmail } from "../utils/email.js";

const sanitizeInput = (input) => {
  if (typeof input !== 'string') {
    throw new Error('Invalid input type');
  }
  return input.trim();
};

export const registerService = async (data) => {
  const name = sanitizeInput(data.name);
  const email = sanitizeInput(data.email);
  const hospitalName = sanitizeInput(data.hospitalName);
  const designation = sanitizeInput(data.designation);
  const mobile = sanitizeInput(data.mobile);
  const password = sanitizeInput(data.password);
  const agreeTerms = data.agreeTerms;

  if (!agreeTerms) {
    throw new Error("You must agree to terms and conditions");
  }

  const exists = await User.findOne({ email: { $eq: email } });
  if (exists) throw new Error("User already exists");

  const user = await User.create({
    name,
    email,
    hospitalName,
    designation,
    mobile,
    password: await hashPassword(password),
    agreeTerms
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    hospitalName: user.hospitalName,
    designation: user.designation,
    mobile: user.mobile,
    createdAt: user.createdAt
  };
};

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return {
    token: generateToken({ id: user._id }),
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  };
};

export const forgotPasswordService = async (email) => {
  const sanitizedEmail = sanitizeInput(email);
  const otp = Math.floor(100000 + Math.random() * 900000);

  const user = await User.findOne({ email: { $eq: sanitizedEmail } });
  if (!user) throw new Error("User not found");

  await Otp.create({
    email: sanitizedEmail,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60000)
  });

  console.log(`OTP for ${sanitizedEmail}: ${otp}`);
  
  try {
    await sendOtpEmail(sanitizedEmail, otp);
    console.log('Email service called successfully');
  } catch (error) {
    console.log('Email failed:', error.message);
  }
  
  return { message: "OTP sent" };
};

export const verifyOtpService = async ({ email, otp }) => {
  const sanitizedEmail = sanitizeInput(email);
  const sanitizedOtp = parseInt(otp);
  
  console.log(`Verifying OTP - Email: ${sanitizedEmail}, OTP: ${sanitizedOtp}`);
  
  if (isNaN(sanitizedOtp)) {
    throw new Error("Invalid OTP format");
  }

  // Check all OTP records for this email
  const allRecords = await Otp.find({ email: { $eq: sanitizedEmail } });
  console.log(`All OTP records for ${sanitizedEmail}:`, allRecords);

  const record = await Otp.findOne({ 
    email: { $eq: sanitizedEmail }, 
    otp: { $eq: sanitizedOtp } 
  });
  
  console.log(`Found matching OTP record:`, record);
  console.log(`Current time:`, new Date());
  
  if (!record) {
    throw new Error("Invalid OTP");
  }
  
  if (record.expiresAt < Date.now()) {
    console.log(`OTP expired. Expires: ${record.expiresAt}, Now: ${new Date()}`);
    throw new Error("OTP expired");
  }

  return true;
};

export const resetPasswordService = async ({ email, password }) => {
  const sanitizedEmail = sanitizeInput(email);
  const sanitizedPassword = sanitizeInput(password);

  const user = await User.findOne({ email: { $eq: sanitizedEmail } });
  if (!user) throw new Error("User not found");

  await User.updateOne(
    { email: { $eq: sanitizedEmail } },
    { password: await hashPassword(sanitizedPassword) }
  );

  await Otp.deleteMany({ email: { $eq: sanitizedEmail } });
};
