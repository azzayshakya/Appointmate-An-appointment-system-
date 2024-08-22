import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Component/Navbar';
import '../Css/SignUp.css';

const Signup = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "", email: "", number: "", UserType: "", selectedInstitute: "", subject: "", password: ""
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");
  const [institutes, setInstitutes] = useState([]);

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await fetch("https://appointmate-an-appointment-system.vercel.app/api/institutes");
        const data = await response.json();
        setInstitutes(data);
      } catch (error) {
        console.error("Error fetching institutes:", error);
      }
    };

    fetchInstitutes();
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, number, UserType, selectedInstitute, subject, password } = credentials;

    if (!name || !email || !number || !UserType || (showDropdown && !selectedInstitute) || !subject || !password) {
      setError("Please fill out all fields.");
      return;
    }

    if (name.length < 4) {
      setError("Username must be at least 4 characters long.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setShowDropdown(false);

    const dataToSend = { name, email, number, UserType, selectedInstitute, subject, password };

    try {
      const response = await fetch("https://appointmate-an-appointment-system.vercel.app/api/signup", { 
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      const json = await response.json();

      if (!json.success) {
        alert(json.message);
      } else {
        alert(json.message);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error registering user:", error);
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
    <div className="SignupPage">
      <div className="SignUpPagenavbar">
        <Navbar />
      </div>
      <div className='sign_up_form_main_container'>
        <div className="login_form">
          <h2>Sign Up</h2>
          <div className="input_group">
            <i className="fa fa-user"></i>
            <input
              type="text"
              placeholder="Username"
              className="input_text"
              name="name"
              value={credentials.name}
              onChange={handleChange}
            />
          </div>
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
            <i className="fa fa-address-book" aria-hidden="true"></i>
            <input
              type="text"
              placeholder="Mobile No."
              className="input_text"
              autoComplete="off"
              name="number"
              value={credentials.number}
              onChange={handleChange}
            />
          </div>
          <div className="input_group">
            <i className="fa fa-key"></i>
            <input
              type="password"
              placeholder="Password"
              className="input_text"
              autoComplete="off"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <div className="input_group">
            <i className="fa fa-building"></i>
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
            <div className="input_group input_group_ins_name">
              <i className="fa fa-university"></i>
              <select
                className="input_text"
                name="selectedInstitute"
                value={credentials.selectedInstitute}
                onChange={handleChange}
              >
                <option value="" disabled>Select your Institute</option>
                {institutes.map((institute, index) => (
                  <option key={index} value={institute}>{institute}</option>
                ))}
              </select>
            </div>
          )}
          <div className="input_group">
            <i className="fa fa-book"></i>
            <select
              className="input_text"
              name="subject"
              value={credentials.subject}
              onChange={handleChange}
            >
              <option value="" disabled>Select Subject</option>
              <option value="Maths">Maths</option>
              <option value="Science">Science</option>
              <option value="Art">Art</option>
            </select>
          </div>
          {error && <div className="SignUp_error">{error}</div>}
          <div className="button_group signupbutton" onClick={handleSubmit}>
            <a>Submit</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
