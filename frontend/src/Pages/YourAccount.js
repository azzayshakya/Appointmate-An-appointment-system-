import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Component/Navbar";
import '../Css/YourAccount.css';

const YourAccount = () => {
    const [userData, setUserData] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();
    const userEmail = localStorage.getItem("userEmail");

    useEffect(() => {
        if (!userEmail) {
            console.error("User email not found");
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await fetch("https://appointmate-an-appointment-system.vercel.app/api/YourAccount", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ userEmail: userEmail })
                });

                const data = await response.json();
                if (data.success) {
                    setUserData(data.user);
                } else {
                    console.error("Failed to fetch user data:", data.message);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [userEmail]);

    const handleDeleteAccount = async () => {
        setShowConfirm(true);
    };

    const confirmDelete = async (confirm) => {
        if (confirm) {
            try {
                const response = await fetch("https://appointmate-an-appointment-system.vercel.app/api/deleteAccount", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: userEmail })
                });

                const data = await response.json();
                if (data.success) {
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("UserType");
                    localStorage.removeItem("userEmail");
                    alert("Account deleted");
                    navigate("/signup");
                } else {
                    console.error("Failed to delete account:", data.message);
                }
            } catch (error) {
                console.error("Error deleting account:", error);
            }
        }
        setShowConfirm(false);
    };

    return (
        <div className="home-container">
            <div className="HomeNavbar">
                <Navbar />
            </div>
            <div className="your-account">
                <h2 className="title">Your Account Information</h2>
                <div className="account-container">
                    {userData ? (
                        <form className="account-form">
                            <div className="account-field">
                                <label>Email:</label>
                                <input type="email" value={userData.email} readOnly />
                            </div>
                            <div className="account-field">
                                <label>Name:</label>
                                <input type="text" value={userData.name} readOnly />
                            </div>
                            <div className="account-field">
                                <label>Phone:</label>
                                <input type="text" value={userData.number} readOnly />
                            </div>
                            <div className="account-field">
                                <label>User Type:</label>
                                <input type="text" value={userData.UserType} readOnly />
                            </div>
                            <button type="button" className="delete-btn" onClick={handleDeleteAccount}>
                                Delete Account
                            </button>
                        </form>
                    ) : (
                        <p>Loading user data...</p>
                    )}
                </div>
                {showConfirm && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Confirm Delete</h3>
                            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                            <div className="buttonForDeleteAccount">
                            <button className="confirm-button" onClick={() => confirmDelete(true)}>Yes, delete</button>
                            <button className="cancel-button" onClick={() => confirmDelete(false)}>No</button>
                        </div>

                            </div>
                            
                    </div>
                )}
            </div>
        </div>
    );
};

export default YourAccount;
