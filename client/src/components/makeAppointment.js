import React, {Component} from 'react';
import jwtDecode from 'jwt-decode';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';

export default class MakeAppointment extends Component{
    constructor(props){
        super(props);

        this.onChangeSymptoms = this.onChangeSymptoms.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            patientId : "",
            symptoms:"",
            status: "Not Confirmed",
            date: new Date(),
            time:"Not Confirmed",
            patients: [] 
        }
    }

    conmponentDidMount(){

    }


    onChangeSymptoms(e) {
        this.setState({
            symptoms : e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const tokens = localStorage.getItem('usertoken');
        const decoded = jwtDecode(tokens);


        const appointment = {
            symptoms: this.state.symptoms,
            status: this.state.status,
            date: this.state.date,
            time: this.state.time,
            patientId: decoded._id,
        }
        
        axios.post('http://localhost:5000/appointment/add', appointment)
            .then(res => console.log(res.data));

    }

    render(){
        return(
            <div>
                <p>You are on the Make AppointMent Component</p>
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        <div className="btn btn-xs btn-outline btn-outline-primary">
                            <Link to="/profile" className="nav-link">
                                back
                            </Link>
                        </div>                        
                    </div>
                </div>
                <form onSubmit = {this.onSubmit}>

					<label>Symptoms</label>
						<div className="form-group">
									
                            <textarea 
                                onChange={this.onChangeSymptoms}
                                className="form-control" 
                                id="reason" 
                                cols="30" 
                                rows="10" 
                                placeholder="Describe your symptoms...">
                              
                            </textarea>
						</div>

						<button type="submit" className="btn btn-outline-success btn-block text-uppercase">
							<i className="fas fa-sign-in-alt"></i> Make appointent </button>
				</form>
            </div>
        )
    }

}


