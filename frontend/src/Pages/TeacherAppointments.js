import React, { useState, useEffect } from "react";
import '../Css/TeacherAppointments.css';
import Navbar from '../Component/Navbar';

const TeacherAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const teacherEmail = localStorage.getItem("userEmail");

    useEffect(() => {
        if (!teacherEmail) {
            console.error("Teacher email not found");
            return;
        }

        const fetchAppointments = async () => {
            try {
                const response = await fetch("http://localhost:7000/api/TeacherAppointments", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ teacherEmail })
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
    }, [teacherEmail]);

    const handleConfirm = async (appointmentId) => {
        try {
            const response = await fetch(`http://localhost:7000/api/confirmAppointment/${appointmentId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            if (data.success) {
                setAppointments((prevAppointments) =>
                    prevAppointments.map((appointment) =>
                        appointment._id === appointmentId
                            ? { ...appointment, status: "confirmed" }
                            : appointment
                    )
                );
            } else {
                console.error("Failed to confirm appointment:", data.message);
            }
        } catch (error) {
            console.error("Failed to confirm appointment:", error);
        }
    };

    return (
        <div className="home-container">
            <div className="HomeNavbar">
                <Navbar />
            </div>
            <div className="TeacherAppointmentPage">
                <h2 className="title">Your Appointments</h2>
                {appointments.length > 0 ? (
                    <div className="appointments-container">
                        {appointments.map((appointment) => (
                            <div className="appointment-box" key={appointment._id}>
                                <div className="appointment-info">
                                    <div>Student Email: <span>{appointment.studentEmail}</span></div>
                                    <div>Date: <span>{appointment.date}</span></div>
                                    <div>Time: <span>{appointment.time}</span></div>
                                    <div>Status: <span>{appointment.status}</span></div>
                                    {appointment.status === "pending" && (
                                        <button onClick={() => handleConfirm(appointment._id)}>Confirm</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No appointments found</p>
                )}
            </div>
        </div>
    );
}

export default TeacherAppointment;
