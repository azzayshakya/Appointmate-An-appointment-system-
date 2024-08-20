import React from 'react';
import Navbar from './Navbar';
import '../Css/Home.css';
import '../Css/Navbar.css'

const Home = () => {
    return (
        <div className="home-container">
            <div className="Home_navbar">
            <Navbar />
            </div>
            <div className="content">
            <div className="midcenter">
                <div className="welcome-section">
                    <h1>Welcome to Our Appointment System</h1>
                    <p>Book your appointments with ease and manage your schedule efficiently.</p>
                    {/* <div className="actions">
                        <a href="/login" className="action-btn">Login</a>
                        <a href="/signup" className="action-btn">Sign Up</a>
                    </div> */}
                </div>
                <div className="features-section">
                    <h2>Features</h2>
                    <div className="feat_boxes">

                    
                    <div className="feature-box">
                        <h3>For Students</h3>
                        <p>Book appointments with your teachers and manage your schedule.</p>
                    </div>
                    <div className="feature-box">
                        <h3>For Teachers</h3>
                        <p>Manage your appointments and stay updated with your schedule.</p>
                    </div>
                    <div className="feature-box">
                        <h3>Easy to Use</h3>
                        <p>Our platform is user-friendly and easy to navigate.</p>
                    </div>
                    </div>
                </div>
            </div>
            
            </div>
        </div>
    );
};

export default Home;
