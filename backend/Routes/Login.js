const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = "UserIsNotPresentInThisWorld";


router.post('/login', async (req, res) => {
  const { email, password, UserType, selectedInstitute } = req.body;
  console.log(req.body);

  try {

    let user;
    if (UserType === 'Institute') {
      user = await User.findOne({ email, UserType, selectedInstitute });
    } else {
      user = await User.findOne({ email, UserType });
    }
    console.log(user)

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email' });
    }


    console.log(user.password)
    console.log(password)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid password' });
    }

    const data = {
      user: {
        id: user.id,
        UserType: user.UserType
      }
    };

    const authToken = jwt.sign(data, jwtSecret, { expiresIn: '1h' });

    res.status(200).json({ success: true, message: 'Login successful', email: user.email, UserType: user.UserType, authToken });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
