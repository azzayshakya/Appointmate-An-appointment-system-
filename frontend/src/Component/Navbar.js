import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdMenu } from "react-icons/io";
import '../Css/Navbar.css';
import { IoHomeOutline } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";
import { IoDocument } from "react-icons/io5";
import { IoIosLogIn } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";

const Navbar = () => {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [userType, setUserType] = useState('');
    const [showStudentDropdown, setShowStudentDropdown] = useState(false);
    const [userName, setUserName] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const storedUserType = localStorage.getItem('UserType');
        const storedEmail = localStorage.getItem('userEmail');
        
        setUserType(storedUserType);

        if (storedEmail) {
            const name = storedEmail.split('@')[0];
            setUserName(name);
        }
    }, []);

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("UserType");
        localStorage.removeItem("userEmail");
        navigate("/login");
    };

    return (
        <>
            <div className="navbar-container navbar-container_main">
                <ul className="navbar-list">
                    <li><span className='navIcons'><IoHomeOutline/></span><Link className='link myOrder' to="/">Home</Link></li>
                    {(!localStorage.getItem("authToken")) ?
                        <div className='abc LoginSignUpAtNavbar'>
                            <li><span className='navIcons'><IoIosLogIn/></span><Link className='link' to="/login">Login</Link></li>
                            <li><span className='navIcons'><IoCreateOutline/></span><Link className='link' to="/signup">Sign up</Link></li>
                        </div>
                        : <div className='cde LogOutAtNavbar'>
                            <div>
                                {userType === 'Student' && (
                                    <li onClick={() => setShowStudentDropdown(!showStudentDropdown)}>
                                        <span className='navIcons'><IoDocument/></span>
                                        <Link className='link'>Appointment</Link>
                                        {showStudentDropdown && (
                                            <ul className='dropdownAtNavbar'>
                                                <div className=''>
                                                    <li><Link className='link' to="/CreateAppointment">Create Appointment</Link></li>
                                                    <li><Link className='link' to="/AppointmentHistory">Appointment History</Link></li>
                                                </div>
                                            </ul>
                                        )}
                                    </li>
                                )}

                                {userType === 'Teacher' && (
                                    <li><span className='navIcons'><IoDocument/></span><Link className='link' to="/Your_Appointments">Your_Appointment</Link></li>
                                )}
                                <li onClick={handleLogout}><span className='navIcons'><IoIosLogOut/></span><Link to="" className='link '>Log Out</Link></li>
                                <li ><span className='navIcons'><FaCaretDown/></span><Link to="/YourAccount" className='link '>{userName}</Link></li>
                            </div>
                        </div>
                    }
                </ul>
            </div>

            <div className={`toggle_navbar_one ${isNavbarOpen ? 'shifted' : ''}`}>
                <button className="navbar-toggle" onClick={toggleNavbar}>
                    <IoMdMenu />
                </button>
            </div>

            {isNavbarOpen && (
                <div className="toggle_navbar_two">
                    <div>
                        <ul className="navbar-list">
                            <li><span className='navIcons'><IoHomeOutline/></span><Link className='link myOrder' to="/">Home</Link></li>
                            {(!localStorage.getItem("authToken")) ?
                                <div className='LoginSignUpAtNavbar'>
                                    <li><span className='navIcons'><IoIosLogIn/></span><Link className='link' to="/login">Login</Link></li>
                                    <li><span className='navIcons'><IoCreateOutline/></span><Link className='link' to="/signup">Sign up</Link></li>
                                </div>
                                :
                                <div className='LogOutAtNavbar'>
                                    <div>
                                        {userType === 'Student' && (
                                            <li onClick={() => setShowStudentDropdown(!showStudentDropdown)}>
                                                <span className='navIcons'><IoDocument/></span>
                                                <Link className='link'>Appointment</Link>
                                                {showStudentDropdown && (
                                                    <ul className='dropdownAtNavbar_toggle'>
                                                        <div className=''>
                                                            <li><Link className='link' to="/CreateAppointment">Create Appointment</Link></li>
                                                            <li><Link className='link' to="/AppointmentHistory">Appointment History</Link></li>
                                                        </div>
                                                    </ul>
                                                )}
                                            </li>
                                        )}

                                        {userType === 'Teacher' && (
                                            <li><Link className='link' to="/Your_Appointments">Your_Appointment</Link></li>
                                        )}
                                        <div className='logoutandyou'>
                                            <li onClick={handleLogout}><span className='navIcons'><IoIosLogOut/></span><Link to="" className='link '>Log Out</Link></li>
                                            <li><span className='navIcons'><FaCaretDown/></span><Link to="/YourAccount" className='link '>{userName}</Link></li>
                                        </div>
                                    </div>
                                </div>
                            }
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
