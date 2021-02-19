import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';

export default class UpdatePatientDash extends Component{
    constructor(props){
        super(props);

        this.onChageFirstName = this.onChageFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);


        this.onSubmit = this.onSubmit.bind(this);
      

        this.state = {
            firstName:"",
            lastName: "",
            email: "",
            patients: [],
            words:[], 
            
        }
    }

    componentDidMount(){

        axios.get('http://localhost:5000/patients/')
            .then(response => {
                this.setState({
                    patients: response.data
                });

                const id = this.props.match.params.id;

                const word = this.state.patients.filter(his => his._id === id);
                
                console.log(word);
                this.setState({
                    words: word
                });
           })
           .catch((err) => {
               console.log(err);
             });    
     }

    onChangeEmail(e) {
        this.setState({
            email : e.target.value
        });
    }

    onChageFirstName(e){
        this.setState({
            firstName : e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastName : e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        this.state.patients.map(patient => {
            if(this.props.match.params.id === patient._id){

                const appointment = {
                    email: this.state.email,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,

                }
                
                console.log({appointment});

                axios.post('http://localhost:5000/patients/update/' + patient._id, appointment)
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
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        
                            <Link to={"/viewPatient"} className="nav-link">
                                back
                            </Link>
                        
                    </div>
                </div>
                
                <form noValidate onSubmit={this.onSubmit} className="col-md-8 mx-auto">
                        <h1 className="h3 mb-3 font-weight-normal">Edit Patient Info</h1>

                        <div className="form-group">
                            <label htmlFor="firstName">Firts Name:</label>
                            <input 
                                type="text"
                                className="form-control"
                                name="firstName"
                                placeholder="Enter First Name"
                                value={this.state.firtsName}
                                onChange={this.onChageFirstName}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Surname</label>
                            <input 
                                type="text"
                                className="form-control"
                                name="lastName"
                                placeholder="Enter Surname"
                                value={this.state.lastName}
                                onChange={this.onChangeLastName}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">email</label>
                            <input 
                                type="text"
                                className="form-control"
                                name="email"
                                placeholder="Enter Email"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                            />
                        </div>
                        
                        <button className="btn btn-lg btn-primary btm-block">
                            Update
                        </button>

                    </form>
            </div>
        )
    }

}


