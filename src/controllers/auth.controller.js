// import { registerUser } from "../services/auth.service.js";

// export const register = async (req, res, next) => {
//   try {
//     const user = await registerUser(req.body);
//     res.status(201).json({ success: true, data: user });
//   } catch (error) {
//     next(error);
//   }
// };
export const register = async (req, res, next) => {
  try {
    console.log("REQ BODY 👉", req.body); // 🔥 ADD THIS

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body is missing"
      });
    }

    const user = await registerUser(req.body);
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};
