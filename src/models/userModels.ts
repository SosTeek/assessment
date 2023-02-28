import mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female', 'other']
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    educationBackground: {
        type: String,
    },
    preferedModeOfContact: {
        type: String,
        enum: ['email', 'phone', 'none']
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', UserSchema);
