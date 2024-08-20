const mongoose = require('mongoose');
const { Schema } = mongoose;

const appointmentSchema =  new Schema({
    teacherEmail: {
        type: String,
        required: true
    },
    studentEmail: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});


const appointment = mongoose.model('appointment', appointmentSchema);

module.exports = appointment;