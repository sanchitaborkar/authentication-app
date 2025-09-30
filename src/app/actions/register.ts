"use server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export interface FormDataPayload {
  name: string
  email: string,
  password: string,
  dob: string
}

export async function registerUser(formData: FormDataPayload) {
  await connectDB();

  const name = formData.name as string;
  const email = formData.email as string;
  const dob = formData.dob as string;
  const password = formData.password as string;

  if (!name || !email || !dob || !password) {
    return { success: false, message: "All fields are required" };
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { success: false, message: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    dob,
    password: hashedPassword,
  });

  await newUser.save();

  return { success: true, message: "User registered successfully" };
}
