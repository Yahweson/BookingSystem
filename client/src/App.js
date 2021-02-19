import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from "axios";

import NavBars from './components/NavBar1';

import Navbar from './components/Navbar';
import Landing from './components/Landing';

import Login from './components/Login';

//user
import Register from './components/Register';
import Profile from './components/Profile';

//edit profile User Info firstName
import EditProflie from './components/EditProfile';
//add
import PersonalInfo from './components/PersonalInfo';
//View user personal information
import ViewPersonalInfo from './components/viewPersonalInfo';
import UpdatePersonalInfo from './components/updatePersonalInfo';

//add
import MakeAppointment from './components/makeAppointment';
//View user appointment
import ViewAppointments from './components/viewAppointments';
import UpdateAppointment from './components/updateAppointment';


//admin
import AdminRegister from './components/AdminRegister';
import Dash from './components/Dash';

import EditAppointment from './components/EditAppointment';

//View all patients
import ViewPatient from './components/ViewPatients';
//Update patient information
import UpdatePatientDash from './components/UpdatePatientDash';
//View patient personal information
import ViewPersonalInfoDash from './components/ViewPersonalInfoDash';
import UpdatePersonalInfoDash from './components/UpdatePersonalInfoDash';

//Confirm Appointments
import ConfirmAppointment from './components/confirmApp';

//View Appointmets
import ViewAppointmentDash from './components/ViewAppointmentDash';
function App() {

  return (
    <Router>
      <div className="App">
          <NavBars/>
          <Route exact path="/" component = {Landing} />
          <div className="container">
            <Route exact path="/register" component = {Register} />     
            <Route exact path="/login" component = {Login} />
            
            <Route exact path="/profile" component = {Profile} />
            <Route exact path ="/editProfile:id" component = {EditProflie} />
            
            <Route exact path='/personalInfo:id' component = {PersonalInfo} />
            
            <Route exact path='/makeAppointment' component = {MakeAppointment} />
            
            <Route exact path="/viewPersonalInfo:id" component = {ViewPersonalInfo} />
            <Route exact path='/viewAppointment' component = {ViewAppointments} />

            <Route exact path='/updateAppointment:id' component = {UpdateAppointment} />
            <Route exact path="/updatePersonalInfo:id" component = {UpdatePersonalInfo} />

            <Route exact path='/check:id' component = {EditAppointment} />

            <Route exact path="/dash" component = {Dash} />
            <Route exact path="/adminRegister" component = {AdminRegister}/> 
            <Route exact path="/viewPatient" component = {ViewPatient} />
          
            <Route exact path="/viewInfoDash:id" component = {ViewPersonalInfoDash} />

            <Route exact path="/updateInfoDash:id" component = {UpdatePersonalInfoDash} />
            <Route exact path="/updatePatientDash:id" component = {UpdatePatientDash}/>

            <Route exact path="/confirmApp:id" component = {ConfirmAppointment} />
            <Route exact path="/viewAppDash"  component = {ViewAppointmentDash} />
            
          </div>
      </div>
    </Router>
  );
}

export default App;
