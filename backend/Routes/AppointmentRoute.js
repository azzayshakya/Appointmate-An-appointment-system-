const express = require('express');
const router = express.Router();
const User = require('../models/User'); 


router.get('/fetchTeachers', async (req, res) => {
  try {
    
    const teachers = await User.find({ UserType: 'Teacher' });
    
    res.status(200).json(teachers);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

const Appointment = require('../models/Appointment');  

router.post('/makeAppointment', async (req, res) => {
    try {
        const { userEmail, teacherEmail, date, time } = req.body;
      
        

        const newAppointment = new Appointment({
            teacherEmail: teacherEmail,
            studentEmail: userEmail,
            time: time,
            date:date,
            status: 'pending'
        });

        await newAppointment.save();
        res.status(201).json({ success: true, message: "Appointment pending" });
    } catch (error) {
        console.error("Error creating appointment:", error);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
});


router.post('/appointments', async (req, res) => {
    try {
        const { userEmail } = req.body;

        const appointments = await Appointment.find({ studentEmail: userEmail });

        res.status(200).json({ success: true, appointments });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
});

router.post('/TeacherAppointments', async (req, res) => {
    try {
        console.log("TeacherAppointments hitted")
        const { teacherEmail } = req.body;
        const appointments = await Appointment.find({ teacherEmail });
        res.status(200).json({ success: true, appointments });
    } catch (error) {
        console.error('Error fetching teacher appointments:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});

router.patch('/confirmAppointment/:id', async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const appointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { status: 'confirmed' },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        res.status(200).json({ success: true, appointment });
    } catch (error) {
        console.error('Error confirming appointment:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});


const AllAppointment = require('../models/Appointment');


router.delete('/appointments/:id', async (req, res) => {
    const appointmentId = req.params.id;

    try {
        const appointment = await AllAppointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        if (appointment.status !== 'pending') {
            return res.status(400).json({ success: false, message: 'Only pending appointments can be deleted' });
        }

        await AllAppointment.deleteOne({ _id: appointmentId });
        res.status(200).json({ success: true, message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});





module.exports = router;
