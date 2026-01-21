
import User from "../models/user.model.js";
import Otp from "../models/otp.model.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";



export const registerService = async (data) => {
  const { name, email, password } = data;

  const exists = await User.findOne({ email });
  if (exists) throw new Error("User already exists");

  const user = await User.create({
    name,
    email,
    password: await hashPassword(password)
  });

  // ✅ Return SAFE DATA ONLY
  return {
    id: user._id,
    name: user.name,
    email: user.email,
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

// FORGOT PASSWORD
export const forgotPasswordService = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000);

  await Otp.create({
    email,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60000)
  });

  // TODO: send email
  return otp;
};

// VERIFY OTP
export const verifyOtpService = async ({ email, otp }) => {
  const record = await Otp.findOne({ email, otp });
  if (!record || record.expiresAt < Date.now())
    throw new Error("Invalid or expired OTP");

  return true;
};

// RESET PASSWORD
export const resetPasswordService = async ({ email, password }) => {
  await User.updateOne(
    { email },
    { password: await hashPassword(password) }
  );

  await Otp.deleteMany({ email });
};
