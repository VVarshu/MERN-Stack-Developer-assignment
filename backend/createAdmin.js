// createAdmin.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./model/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const createAdmin = async () => {
  try {
    const admin = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'Admin@123'
    });

    await admin.save();
    console.log('Admin user created!');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

createAdmin();
