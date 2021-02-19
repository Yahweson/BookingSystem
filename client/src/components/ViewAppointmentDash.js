import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Patient = props =>(

    
    <tr>
        <td>{props.patient.firstName}</td>
        <td>{props.patient.lastName}</td>
        <td>{props.patient.email}</td>
        <td>{props.patient.status}</td>
        <td>{props.patient.symptoms}</td>
        <td>{props.patient.date}</td>
        <td>{props.patient.time}</td>
        <td>
            <Link to={"/viewInfoDash"+ props.patient.patientId}>
                Info
            </Link>
        </td>
        <td>
            <Link to= {"/confirmApp"+ props.patient._id}>Confirm</Link> | <a href="#" onClick={() => {props.deletePatient(props.patient._id)}}>delete</a>
        </td>
    </tr>
)

class ViewAppointmentDash extends Component {
    constructor(props) {
        super(); 

        this.deletePatient = this.deletePatient.bind(this);

        this.state = {
            patients: [],
            appointments:[],
            displayAppointments : [],
            patientId: "",
            words:[],
        }
    } 

    deletePatient(id){
        axios.delete('/appointment/remove/' + id)
            .then( res => console.log(res.data));

        this.setState({
            appointments: this.state.appointments.filter(el => el._id !== id)
        })
    }

     componentDidMount(){

        axios.get('http://localhost:5000/appointment/')
            .then(response => {
                this.setState({appointments: response.data});

           })
           .catch((err) => {
               console.log(err);
             });    

        axios.get('http://localhost:5000/patients/')
            .then(response => {
                this.setState({patients: response.data});

                this.state.appointments.forEach((app) =>{

                    const appoi = app;

                    const word = response.data.filter((item) =>{

                        const items = item;
                        if(item._id === app.patientId){
                            this.setState({
                                words : [...this.state.words,{...item,...app}]
                            })
                        }
                        

                        return item._id === app.patientId;
                    });

                //   console.log(this.state.words);
                });
                console.log(this.state.words);
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
        })
    }

    render() {
        return (
            <div>
                <h2>Patients</h2>

                <div className="row">
                    <div className="col-md-4 mx-auto">
                        <div className="btn btn-xs btn-outline btn-outline-primary">
                            <Link to="/dash" className="nav-link">
                                back
                            </Link>
                        </div>                        
                    </div>
                </div>

                <table className = "table">
                    <thead className ="thead-light">
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>appointment</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Personal Info</th>
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

export default ViewAppointmentDash;
