import React, {Component} from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';

const Patient = props =>(
    <tr>
        <td>{props.patient.status}</td>
        <td>{props.patient.date}</td>
        <td>{props.patient.time}</td>
        <td>{props.patient.symptoms}</td>
        <td>
            <Link to= {"/updateAppointment" + props.patient.patientId}>edit</Link> | <Link to={"/makeAppointment"} onClick={() => {props.deletePatient(props.patient._id)}}>delete</Link>
        </td>
    </tr>
)

class Patients extends Component {
    constructor(props) {
        super(); 

        this.deletePatient = this.deletePatient.bind(this);

        this.state = {
            patients : [],
            rightApp : [],
            words : [],
        }
    } 

    deletePatient(id){
        axios.delete('/appointment/remove/' + id)
            .then( res => console.log(res.data));

        this.setState({
            patients: this.state.patients.filter(el => el._id !== id)
        })
    }

     componentDidMount(){
        axios.get('http://localhost:5000/appointment/')
            .then(response => {
                this.setState({patients: response.data});

                const tokens = localStorage.getItem('usertoken');
                const decoded = jwtDecode(tokens);

                const id = decoded._id;

                // console.log(id);
                 const word = this.state.patients.filter(his => his.patientId === id);
                 //console.log(word);
                 this.setState({words: word});
           })
           .catch((err) => {
               console.log(err);
             });    

        axios.get('http://localhost:5000/patients/')
             .then(res =>{
                 this.setState({rightApp: res.data});
             })
             .catch((err) => {
                 console.log(err);
             });


           // const url ="http://localhost:5000/patients/";
            //const response = await fetch(url);
            //const data = await response.json();
            //this.setState({
             // patients: data.results[0]    
           // });    
     }

     patientList() {
        return this.state.words.map(currentpatient => {
            return <Patient patient={currentpatient} deletePatient={this.deletePatient} key={currentpatient._id} />;           
            //return <Patient patient={currentpatient} deletePatient={this.deletePatient} key={currentpatient._id} />;
        });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        
                        <Link to="/profile" className="nav-link">
                            back
                        </Link>
                        
                    </div>
                </div>
                <h2>Appointment</h2>

                <table className = "table">
                    <thead className ="thead-light">
                        <tr>
                            <th>Appointment status</th>
                            <th>date</th>
                            <th>Time</th>
                            <th>Symptom</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        { this.patientList() }
                    </tbody>
                </table>
            </div>
          );
    }

}

export default Patients;
