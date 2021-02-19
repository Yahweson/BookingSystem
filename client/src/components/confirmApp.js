import React, {Component} from 'react';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import moment from 'moment';

export default class ConfirmAppointment extends Component{
    constructor(props){
        super(props);

        
        this.onChangeAppTime = this.onChangeAppTime.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            patients: [],
            appTime:"",
            status: "",
            date: "",
            show: {},
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/appointment/')
            .then(response => {

                response.data.map(ishu => {
                    if(ishu._id === this.props.match.params.id){                  
                        this.setState({ 
                            show: ishu
                        }); 
                    }
                })
 
                //console.log(this.state.show);
                this.setState({
                    
                    patients: response.data
                });
           })
           .catch((err) => {
               console.log(err);
             });      
     }

    onChangeStatus(e) {
        this.setState({
            status : e.target.value
        });
    }

    onChangeDate(e) {
        this.setState({
            date : e.target.value
        });
    }


    onChangeAppTime(e) {
        this.setState({
            appTime : e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();


        //console.log(this.state.date);
        //console.log(this.state.appTime);

        this.state.patients.map(patient => {
            if(this.props.match.params.id === patient._id){
                   
                console.log(this.state.date);
                console.log(this.state.appTime);

                const symptoms = patient.symptoms;
                const status= this.state.status;
                const dates =this.state.date;
                const appTime = this.state.appTime;
                
                

                const patientApp = {
                    status,
                    symptoms,
                    appTime,
                    dates
                
                    
                }

                console.log({patientApp});

                axios.post('http://localhost:5000/appointment/update/' + this.props.match.params.id, patientApp)
                    .then(res => console.log(res.data))
                    .catch( (err) => {
                        console.log(err);
                    });
    
            }
        });


      //  console.log(this.state.patients);
      
        
    //    axios.post('http://localhost:5000/appointment/update/'+ this.props.match.params.id, patient)
    //        .then(res => console.log(res.data))
    //        .catch((err) => {
    //            console.log(err);
    //        });

    }

    render(){
        return(
            <div>
                <h4>You are on the Confirm AppointMent Component</h4>
                <h5>Symptom</h5>
                <h6>{this.state.show.symptoms}</h6>
                <form onSubmit = {this.onSubmit} className="col-md-8 mx-auto"> 

                    <div className="form-group">
                            <h3><label htmlFor="Status">Status</label></h3>

                            <input 
                                type="text"
                                className="form-control"
                                name="status"
                                placeholder="Enter Status"
                                value={this.state.status}
                                onChange={this.onChangeStatus}
                            />
                    </div>

                    <div className="form-group">
                            <h3><label htmlFor="Status">Appointment time:</label></h3>

                            <input 
                                type="text"
                                className="form-control"
                                name="time"
                                placeholder="Enter time"
                                
                                onChange={this.onChangeAppTime}
                            />
                    </div>

                    <div>
                    <h3><label htmlFor="Status">Date</label></h3>
                    <input 
                                type="text"
                                className="form-control"
                                name="time"
                                placeholder="Enter time"
                                
                                onChange={this.onChangeDate}
                            />
                    </div>

                    <button type="submit" className="btn btn-outline-success btn-block text-uppercase">
							<i className="fas fa-sign-in-alt"></i> Confirm </button>
                </form>

            </div>
        )
    }

}