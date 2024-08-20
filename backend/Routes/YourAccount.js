
const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.post('/YourAccount', async (req, res) => {
    const { userEmail } = req.body;
    

    if (!userEmail) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    try {
        const user = await User.findOne({ email:userEmail});
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        

        res.json({ success: true, user });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;

router.delete('/deleteAccount', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }
    try {
        const result = await User.deleteOne({ email });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

 res.json({ success: true, message: 'Account deleted successfully' });
    } catch (error) {
        console.error("Error deleting user account:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.delete('/deleteAccount', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }
    try {
        const result = await User.deleteOne({ email });
        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, message: 'Account deleted successfully' });
    } catch (error) {
        console.error("Error deleting user account:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


module.exports = router;
