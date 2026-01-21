import * as service from "../services/auth.service.js";
import { success } from "../utils/response.js";
export const register = async (req, res, next) => {
  try {
    const data = await service.registerService(req.body);
    success(res, "Registered successfully", data);
  } catch (e) {
    next(e);
  }
};


export const login = async (req, res, next) => {
  try {
    const data = await service.loginService(req.body);
    success(res, "Login success", data);
  } catch (e) {
    next(e);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    await service.forgotPasswordService(req.body.email);
    success(res, "OTP sent");
  } catch (e) {
    next(e);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    await service.verifyOtpService(req.body);
    success(res, "OTP verified");
  } catch (e) {
    next(e);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    await service.resetPasswordService(req.body);
    success(res, "Password reset successful");
  } catch (e) {
    next(e);
  }
};
