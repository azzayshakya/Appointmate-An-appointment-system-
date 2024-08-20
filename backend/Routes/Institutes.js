const express = require('express');
const router = express.Router();
const Institute = require('../models/Insitutes');


router.get('/institutes', async (req, res) => {
  try {
    const institutes = await Institute.find({}, 'ins_name');
    const instituteNames = institutes.map(inst => inst.ins_name);
    res.json(instituteNames);
  } catch (error) {
    console.error("Error fetching institutes:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
