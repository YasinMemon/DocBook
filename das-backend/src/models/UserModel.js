import { Schema } from "mongoose";
import mongoose from "mongoose";

const UserSchema = new Schema(
  {
    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/das-cloud/image/upload/v1700000000/default-profile-pic.jpg",
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", UserSchema);

export default User;
