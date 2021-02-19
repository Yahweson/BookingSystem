import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { appendFileSync } from 'fs';

class EditAppointment extends Component {
    constructor(props) {
        super(); 
        this.state = {
            appointment: []
        }
    } 

    async componentDidMount(){
      //  axios.get('http://localhost:5000/appointment')
        //    .then(response => {
        //        this.setState({appointment: response.data});
         //   })
         //   .catch((err) => {
         //       console.log(err);
        //    });    
          const url ="http://localhost:5000/appointment";
          const response = await fetch(url);
          const data = await response.json();
          this.setState({
            appointment: data.results[0]    
          });
        
            
    }

    render() {
        return (
            <div>
                <h2>Patients</h2>
                {this.state.appointment.idNumber}
                <table className = "table">
                    <thead className ="thead-light">
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>id Number</th>
                        </tr>
                    </thead>

                    <tbody>
                     
                    </tbody>
                </table>




                <ul>
                    {this.state.appointment.map(appoi =>
                        <li key = {appoi.id}>{appoi.symptoms}</li>
                    )}
                </ul>
            </div>
          );
    }

}

export default EditAppointment;
