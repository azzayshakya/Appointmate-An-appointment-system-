const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

// Route to fetch teachers based on subject filter
router.get('/fetchTeachers', async (req, res) => {
    console.log("hitted")
    const { subject } = req.query;

    try {
        // Build query to filter by UserType 'Teacher' and optional subject
        const query = { UserType: 'Teacher' };
        if (subject && subject !== 'All') {
            query.subject = subject; // Assuming 'subject' field exists in the User model
        }

        const teachers = await User.find(query);
        res.status(200).json(teachers);
    } catch (error) {
        console.error('Failed to fetch teachers:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = router;
