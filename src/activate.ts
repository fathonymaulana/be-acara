import mongoose from "mongoose";
import UserModel from "./models/user.model";
import { DATABASE_URL } from "./utils/env";

const activateUser = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      dbName: "db-acara",
    });
    console.log("Sedang mencari akun Anda...");

    const user = await UserModel.findOneAndUpdate(
      { email: "maulanafathony@gmail.com" },
      { isActive: true },
      { new: true },
    );

    if (user) {
      console.log(
        "BERHASIL! Akun 'maulanafathony@gmail.com' telah diaktivasi secara manual.",
      );
    } else {
      console.log("GAGAL! Akun tidak ditemukan.");
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

activateUser();
