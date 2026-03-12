import mongoose from "mongoose";
import UserModel from "./models/user.model";
import { DATABASE_URL } from "./utils/env";

const seed = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      dbName: "db-acara",
    });
    console.log("Connected to database. Seeding users...");

    // Create Admin
    const adminExists = await UserModel.findOne({ username: "admin" });
    if (!adminExists) {
      const admin = new UserModel({
        fullName: "Administrator",
        username: "admin",
        email: "admin@acara.com",
        password: "Password123", // Has to match validation rules (Uppercase + Number)
        role: "admin",
        isActive: true, // Make sure it's active
      });
      await admin.save();
      console.log("Admin account created! (admin / Password123)");
    } else {
      console.log("Admin account already exists.");
    }

    // Create Member
    const memberExists = await UserModel.findOne({ username: "member" });
    if (!memberExists) {
      const member = new UserModel({
        fullName: "Member User",
        username: "member",
        email: "member@acara.com",
        password: "Password123",
        role: "member",
        isActive: true,
      });
      await member.save();
      console.log("Member account created! (member / Password123)");
    } else {
      console.log("Member account already exists.");
    }

    console.log("Seeding finished.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await mongoose.disconnect();
  }
};

seed();
