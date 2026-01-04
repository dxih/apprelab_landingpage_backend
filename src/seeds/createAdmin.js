require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin'); // your model path

const MONGO_URI = process.env.MONGO_URI;

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    const name = 'Brendan Mebuge';
    const email = 'brendanmebson@gmail.com';
    const plainPassword = 'Brendan@123'; // change later for security

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(plainPassword, 12);

    // Create admin
    await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log('✅ Admin created successfully');
    console.log('---------------------------');
    console.log('Email:', email);
    console.log('Password:', plainPassword);
    console.log('---------------------------');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
