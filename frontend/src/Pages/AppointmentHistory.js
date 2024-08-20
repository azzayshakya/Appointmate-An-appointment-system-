import React, { useState, useEffect } from "react";
import Navbar from '../Component/Navbar';
import '../Css/CreateAppointment.css';
import '../Css/HistoryOfAppointment.css';

const AppointmentHistory = () => {
    const [appointments, setAppointments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");
        console.log("User Email:", userEmail);

        
        const fetchAppointments = async () => {
            console.log("Fetching appointments...");
            try {
                const response = await fetch("http://localhost:7000/api/appointments", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ userEmail })
                });
                const data = await response.json();
                if (data.success) {
                    setAppointments(data.appointments);
                }
            } catch (error) {
                console.error("Failed to fetch appointments:", error);
            }
        };

        fetchAppointments();
    }, []);

    const handleDelete = async (appointmentId) => {
        try {
            const response = await fetch(`http://localhost:7000/api/appointments/${appointmentId}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            if (data.success) {
                alert("Appointment Delted")
                
                setAppointments(appointments.filter(appointment => appointment._id !== appointmentId));
                closeModal();
            } else {
                console.error("Failed to delete appointment:", data.message);
            }
        } catch (error) {
            console.error("Error deleting appointment:", error);
        }
    };

    const openModal = (appointment) => {
        setSelectedAppointment(appointment);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedAppointment(null);
        setShowModal(false);
    };

    const confirmDelete = () => {
        if (selectedAppointment) {
            handleDelete(selectedAppointment._id);
        }
    };

    return (
        <div className="home-container">
        <div className="HomeNavbar">
            <Navbar />
        </div>
        <div className="AppointmentHistory">
            <h2 className="title">Your Appointments</h2>
            {appointments.length > 0 ? (
                <div className="appointments-container">
                    {appointments.map((appointment) => (
                        <div className="appointment-box" key={appointment._id}>
                            <div className="appointment-info aj">
                                <div>Teacher Email: <span>{appointment.teacherEmail}</span></div>
                                <div>Date: <span>{appointment.date}</span></div>
                                <div>Time: <span>{appointment.time}</span></div>
                                <div>Status: <span>{appointment.status}</span></div>
                                {appointment.status === "pending" && (
                                    <button
                                        className="delete-button"
                                        onClick={() => openModal(appointment)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="NoAppointmentsFound">No appointments found ..</p>
            )}

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete this appointment?</p>
                        <button className="confirm-button" onClick={confirmDelete}>Yes</button>
                        <button className="cancel-button" onClick={closeModal}>No</button>
                    </div>
                </div>
                )}
        </div>
    </div>
);
}
export default AppointmentHistory;