import React, {Component} from 'react';

import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';

export default class MakeAppointment extends Component{
    constructor(props){
        super(props);

        this.onChangeSymptoms = this.onChangeSymptoms.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            symptoms:"",
            status: "",
            date: new Date(),
            time:"",
            patients: [] 
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/appointment/')
            .then(response => {
                this.setState({
                    
                    patients: response.data
                });
           })
           .catch((err) => {
               console.log(err);
             });      
     }

     onChangeStatus(e){
        this.setState({
            status : e.target.value
        });
    }
    onChangeStatus(e){
        this.setState({
            status : e.target.value
        });
    }

    onChangeSymptoms(e) {
        this.setState({
            symptoms : e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        this.state.patients.map(patient => {
            if(this.props.match.params.id === patient._id){

                const appointment = {
                    symptoms: this.state.symptoms,
                    status: this.state.status,
                    date: this.state.date,
                    time: this.state.time,
                }

                console.log({appointment});

                axios.post('http://localhost:5000/appointment/update/' + this.props.match.params.id, appointment)
                    .then(res => console.log(res.data))
                    .catch( (err) => {
                        console.log(err);
                    });
    
            }
        });
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


