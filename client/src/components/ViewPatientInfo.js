import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Patient = props =>(
    <tr>
        <td>{props.patient.idNumber}</td>
        <td>{props.patient.gender}</td>
        <td>{props.patient.condition}</td>
        <td>{props.patient.cell}</td>
        <td>{props.patient.workNumber}</td>
        <td>{props.patient.address}</td>
        <td>
            <Link to= {"/updatePersonalInfoDash" + props.patient._id}>edit</Link> | <a href="#" onClick={() => {props.deletePatient(props.patient._id)}}>delete</a>
        </td>
    </tr>
)

class ViewPesonalInfoDude extends Component {
    constructor(props) {
        super(); 

        this.deletePatient = this.deletePatient.bind(this);

        this.state = {
            patients: [],
            rightApp:[],
            words:[],
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
        axios.get('http://localhost:5000/patientInfo/')
            .then(response => {
                this.setState({patients: response.data});

                const id = this.props.match.params.id;

                const word = this.state.patients.filter(his => his.patientId === id);
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
                        
                        <Link to="/viewPatient" className="nav-link">
                            back
                        </Link>
                        
                    </div>
                </div>
                <h2>Appointment</h2>

                <table className = "table">
                    <thead className ="thead-light">
                        <tr>
                            <th>idNumber</th>
                            <th>gender</th>
                            <th>Per-existing condition</th>
                            <th>Cell</th>
                            <th>Work number</th>
                            <th>Address</th>
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

export default ViewPesonalInfoDude;
