import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Patient = props =>(
    <tr>
        <td>{props.patient.firstName}</td>
        <td>{props.patient.lastName}</td>
        <td>{props.patient.email}</td>
        <td>
            <Link to={"/viewInfoDash"+ props.patient._id}>
                Info
            </Link>
        </td>
        <td>
            <Link to= {"/updatePatientDash"+ props.patient._id}>edit</Link> | <a href="#" onClick={() => {props.deletePatient(props.patient._id)}}>delete</a>
        </td>
    </tr>
)

class Patients extends Component {
    constructor(props) {
        super(); 

        this.deletePatient = this.deletePatient.bind(this);

        this.state = {
            patients: []
        }
    } 

    deletePatient(id){
        axios.delete('/patients/remove/' + id)
            .then( res => console.log(res.data));

        this.setState({
            patients: this.state.patients.filter(el => el._id !== id)
        })
    }

     componentDidMount(){
        axios.get('http://localhost:5000/patients/')
            .then(response => {
                this.setState({patients: response.data});
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
        return this.state.patients.map(currentpatient => {
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

export default Patients;
