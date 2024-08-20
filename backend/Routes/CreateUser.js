const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, number, UserType, selectedInstitute, subject, password } = req.body;

  if (!name || !email || !number || !UserType || !subject || (UserType === 'Institute' && !selectedInstitute) || !password) {
    return res.status(400).json({ message: 'Please fill out all required fields.' });
  }

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      number,
      UserType,
      selectedInstitute: UserType === 'Institute' ? selectedInstitute : undefined,
      subject,
      password: hashedPassword
    });

    // Save the user to the database
    await user.save();

    // Send a success response
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
