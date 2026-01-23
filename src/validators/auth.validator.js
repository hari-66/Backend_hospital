import { body, validationResult } from "express-validator";

export const validateRegister = [
  body("name")
    .isString()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be 2-50 characters"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email required"),
  body("hospitalName")
    .isString()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Hospital name must be 2-100 characters"),
  body("designation")
    .isString()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Designation must be 2-50 characters"),
  body("mobile")
    .isMobilePhone('en-IN')
    .withMessage("Valid 10-digit mobile number required"),
  body("password")
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage("Password must be 8+ chars with uppercase, lowercase, number, and special character"),
  body("agreeTerms")
    .isBoolean()
    .equals('true')
    .withMessage("You must agree to terms and conditions")
];

export const validateLogin = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password required")
];

export const validateForgotPassword = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email required")
];

export const validateVerifyOtp = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email required"),
  body("otp").isNumeric().isLength({ min: 6, max: 6 }).withMessage("OTP must be 6 digits")
];

export const validateResetPassword = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email required"),
  body("password")
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage("Password must be 8+ chars with uppercase, lowercase, number, and special character")
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array()
    });
  }
  next();
};