import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './Component/Home';
import SignUp from "./Pages/SignUp"

// import Home from './Pages/Home'
import Login from './Pages/LoginPage';
import CreateAppointment from './Pages/CreateAppointment';
import AppointmentHistory from './Pages/AppointmentHistory';
import TeacherAppointment from './Pages/TeacherAppointments';
import YourAccount from './Pages/YourAccount';

function App() {
  return (
    <div>
    <Router>
    <div>
    <Routes>

      <Route exact path ="/" element={<Home/>}/>
      <Route exact path ="/SignUp" element={<SignUp/>}/>
        <Route exact path ="/LogIn" element={<Login/>}/>
        <Route exact path ="/CreateAppointment" element={<CreateAppointment/>}/>
        <Route exact path ="/AppointmentHistory" element={<AppointmentHistory/>}/>
        <Route exact path ="/Your_Appointments" element={<TeacherAppointment/>}/>
        <Route exact path ="/YourAccount" element={<YourAccount/>}/>
        

        
    </Routes>
    </div>
    </Router>  
    </div>
  );
}

export default App;
