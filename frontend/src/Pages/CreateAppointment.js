import React, { useState, useEffect } from "react";
import Navbar from '../Component/Navbar';
import '../Css/CreateAppointment.css';

const CreateAppointment = () => {
    const [teachers, setTeachers] = useState([]);
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [appointmentData, setAppointmentData] = useState({
        userEmail: '',  
        teacherEmail: '',
        date: '',
        time: '',
        status: 'pending'
    });
    const [subjectFilter, setSubjectFilter] = useState('All');

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        setAppointmentData(prevData => ({ ...prevData, userEmail }));

        const fetchTeachers = async () => {
            try {
                console.log("hitted")
                const response = await fetch("http://localhost:7000/api/fetchTeachers");
                const data = await response.json();
                setTeachers(data);
                setFilteredTeachers(data);
            } catch (error) {
                console.error("Failed to fetch teachers:", error);
            }
        };

        fetchTeachers();
    }, []);

    const handleFilterChange = (e) => {
        const selectedSubject = e.target.value;
        setSubjectFilter(selectedSubject);
        if (selectedSubject === 'All') {
            setFilteredTeachers(teachers);
        } else {
            setFilteredTeachers(teachers.filter(teacher => teacher.subject === selectedSubject));
        }
    };

    const handleAppointmentClick = (teacherEmail) => {
        setSelectedTeacher(teacherEmail);
        setAppointmentData(prevData => ({ ...prevData, teacherEmail }));
        setShowForm(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAppointmentData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:7000/api/makeAppointment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(appointmentData)
            });
            const result = await response.json();
            if (result.success) {
                alert("Appointment scheduled successfully.");
                setShowForm(false);
            } else {
                alert("Failed to schedule appointment.");
            }
        } catch (error) {
            console.error("Error scheduling appointment:", error);
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div  className="home-container">
            <div className="Home_navbar">
                <Navbar />
            </div>
            <div className="CreateAppointmentPage">            
            <h2 className="title">Available Teachers For Appointment.</h2>
            <div className="filter-container">
                <label htmlFor="subjectFilteCreateAppointmentPager">Filter by Subject: </label>
                <select id="subjectFilter" value={subjectFilter} onChange={handleFilterChange}>
                    <option value="All">All</option>
                    <option value="Maths">Maths</option>
                    <option value="Science">Science</option>
                    <option value="Art">Art</option>
                </select>
            </div>
            {filteredTeachers.length > 0 ? (
                <div className="teachers-container">
                    {filteredTeachers.map((teacher) => (
                        <div className="teacher-box" key={teacher.email}>
                            <div className="teacher-info">
                                <div>Name: <span>{teacher.name}</span></div>
                                <div>Email: <span>{teacher.email}</span></div>
                                <div>Subject: <span>{teacher.subject}</span></div>
                            </div>
                            <div className="appointment-button">
                                <button onClick={() => handleAppointmentClick(teacher.email)}>Appointment</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="">No teachers found</p>
            )}

            {showForm && (
                <div className="appointment-form">
                    <h3>Schedule Appointment</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>User Email:</label>
                            <input
                                type="email"
                                name="userEmail"
                                value={appointmentData.userEmail}
                                readOnly
                            />
                        </div>
                        <div>
                            <label>Teacher Email:</label>
                            <input
                                type="email"
                                name="teacherEmail"
                                value={appointmentData.teacherEmail}
                                readOnly
                            />
                        </div>
                        <div>
                            <label>Date:</label>
                            <input
                                type="date"
                                name="date"
                                value={appointmentData.date}
                                onChange={handleInputChange}
                                min={today} 
                                required
                            />
                        </div>
                        <div>
                            <label>Time:</label>
                            <input
                                type="time"
                                name="time"
                                value={appointmentData.time}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit">Submit</button>
                        <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                    </form>
                </div>
            )}
            </div>
        </div>
    );
}

export default CreateAppointment;
