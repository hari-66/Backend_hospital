import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true
    },
    hospitalName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    designation: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
      match: /^[0-9]{10}$/
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 8
    },
    agreeTerms: {
      type: Boolean,
      required: true,
      validate: {
        validator: function(v) {
          return v === true;
        },
        message: 'You must agree to terms and conditions'
      }
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
