import React, { useState, useEffect } from 'react';
import '../Css/Login.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Component/Navbar';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "", UserType: "", selectedInstitute: "" });
  const [error, setError] = useState("");
  const [institutes, setInstitutes] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
 
    const fetchInstitutes = async () => {
      try {
        const response = await fetch("https://appointmate-an-appointment-system.vercel.app/api/institutes");
        const data = await response.json();
        setInstitutes(data);
      } catch (error) {
        console.error("Failed to fetch institutes:", error);
      }
    };

    fetchInstitutes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, UserType, selectedInstitute } = credentials;

    if (!email || !password || !UserType || (UserType === 'Institute' && !selectedInstitute)) {
      setError("Please fill out all fields.");
      return;
    }

    setError("");

    try {
      const response = await fetch("https://appointmate-an-appointment-system.vercel.app/api/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, UserType, selectedInstitute })
      });

      const result = await response.json();
      console.log(result);

      if (result.success) {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", result.authToken);
        localStorage.setItem("UserType", result.UserType);
        navigate("/");
      } else {
        setError(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Server error. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });

    if (name === 'UserType') {
      setShowDropdown(value === 'Institute');
    }
  };

  return (
    <div className="LoginPage">
      <div className="LoginPagenavbar">
        <Navbar />
      </div>
      <div className='loginpagemaincontainer'>
        <div className="login_form  loginIn_form_main_container">
          <h2>Login</h2>
          <div className="input_group">
            <i className="fa-solid fa-square-envelope"></i>
            <input
              type="email"
              placeholder="Type Your E-mail Here"
              className="input_text"
              autoComplete="off"
              name="email"
              value={credentials.email}
              onChange={handleChange}
            />
          </div>
          <div className="input_group">
            <i className="fa fa-lock" aria-hidden="true"></i>
            <input
              type="password"
              placeholder="Enter Your Password"
              className="input_text"
              autoComplete="off"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <div className="input_group">
            <i className="fa fa-user"></i>
            <select
              className="input_text"
              name="UserType"
              value={credentials.UserType}
              onChange={handleChange}
            >
              <option value="" disabled>Select User Type</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Institute">Institute</option>
            </select>
          </div>
          {showDropdown && (
            <div className="input_group">
              <i className="fa fa-university"></i>
              <select
                className="input_text"
                name="selectedInstitute"
                value={credentials.selectedInstitute}
                onChange={handleChange}
              >
                <option value="" disabled>Select your Institute</option>
                {institutes.map((institute, index) => (
                  <option className="InstituteNames" key={index} value={institute}>{institute}</option>
                ))}
              </select>
            </div>
          )}
          {error && <div className="Login_error">{error}</div>}
          <div className="button_group loginbutton" onClick={handleSubmit} id="login_button">
            <a>Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
