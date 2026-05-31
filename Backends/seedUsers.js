const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const MONGO_URI = "mongodb://127.0.0.1:27017/airbnb_clone";

const users = [
  {
    username: "guest",
    email: "kmolisana@yahoo.com",
    password: "123456",
    role: "user",
  },
  {
    username: "host",
    email: "kmolisana@yahoo.com",
    password: "123456",
    role: "host",
  },
];

async function seedUsers() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456", salt);

    await User.deleteMany({ email: "kmolisana@yahoo.com" });

    for (const account of users) {
      await User.findOneAndUpdate(
        { username: account.username, role: account.role },
        {
          username: account.username,
          email: account.email,
          password: hashedPassword,
          role: account.role,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      console.log(`Seeded ${account.role} user: ${account.username}`);
    }

    console.log("User seed completed");
    process.exit();
  } catch (err) {
    console.error("User seeding error:", err);
    process.exit(1);
  }
}

seedUsers();
