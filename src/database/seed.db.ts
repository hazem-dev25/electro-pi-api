import mongoose from "mongoose";
import { authModel } from "../modules/Auth/Auth.model.js";
import { projectModel } from "../modules/Projects/Projects.model.js";
import { taskModel } from "../modules/Tasks/Tasks.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { url, salt } from '../config/env.config.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB for seeding...");

    await authModel.deleteMany({});
    await projectModel.deleteMany({});
    await taskModel.deleteMany({});
    console.log("Cleaned old data.");

    const rounds = salt ? parseInt(salt) : 12;
    const hashedPassword = await bcrypt.hash("12345678", rounds);

    const userId = "6a3c689c20ea8a9848578792";
    const demoUser = await authModel.create({
      _id: new mongoose.Types.ObjectId(userId),
      name: "Hazem",
      email: "hadel6464@gmail.com",
      password: hashedPassword,
      isverify: true,
      role: "Member",
      provider: "System"
    });
    console.log(`Demo user created with ID: ${userId}`);

    const projectId = "6a3c6b6020ea8a9848578794";
    const demoProject = await projectModel.create({
      _id: new mongoose.Types.ObjectId(projectId),
      title: "E-Commerce Backend",
      description: "Building the core APIs for e-commerce platform",
      status: "pending",
      userid: (demoUser as any)._id
    });
    console.log(`Demo project created with ID: ${projectId}`);

    await taskModel.create([
      {
        _id: new mongoose.Types.ObjectId("6a3c7073b317fa10da1cbb1e"),
        title: "Setup Authentication",
        description: "Implement JWT login and registration endpoints",
        status: "pending",
        priority: "High",
        projectId: (demoProject as any)._id
      },
      {
        _id: new mongoose.Types.ObjectId("6a3c70f0b317fa10da1cbb1f"),
        title: "socialMedia app",
        description: "Create a api  for app",
        status: "pending",
        priority: "Medium",
        projectId: (demoProject as any)._id
      }
    ]);
    console.log("Demo tasks created successfully.");

    console.log("Database seeded perfectly matching your Postman Collection!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();