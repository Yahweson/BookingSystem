import React, {Component} from 'react';
import axios from 'axios';

import {register} from './PatientFunctions';


class Register extends Component{
    constructor(props){
        super(props);

        this.state = {
            firstName:'',
            lastName:'',
            email: '',
            password: '',
            confirmPassword:'',
        }

        this.firstNameValidate = this.firstNameValidate.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    firstNameValidate(){
        //var checkFirstName = document.getElementById('firstName');
       
        if(this.state.firstName == ""){
            document.getElementById("firstName").style.borderColor = "red";
            document.getElementById("firstNameIcon").innerHTML = "*Field is required";
        }else
        if(this.state.lastName == ""){
            document.getElementById("lastName").style.borderColor = "red";
            document.getElementById("lastNameIcon").innerHTML = "*Field is required";
        }else
        if(this.state.email == ""){
            document.getElementById("email").style.borderColor = "red";
            document.getElementById("emailIcon").innerHTML = "*Field is required";
        }
        if(this.state.password === this.state.confirmPassword){
            document.getElementById("password").style.borderColor = "red";
            document.getElementById("passwordIcon").innerHTML = "*Passwords do not match";
        }

    }
    //const emailRegEx = ReqExp(/^[a-zA-Z0-9.!#$%&*+/=?^{\}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+) *$/);
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();

        const patient = {
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            username: this.state.username,      
        }
        
        if(this.firstNameValidate()){
            axios.post('http://localhost:5000/patients/register', patient)
            .then( this.props.history.push('/login'));   
        }

       // register(patient).then(res => {
        //    if(res){
        //        this.props.history.push('/login')
        //    }
        //})
    }

    render(){
        return(
            <div className="container">
                <div className="row">

                    
                    <form noValidate onSubmit={this.onSubmit} className="col-md-8 mx-auto">
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        
                        <div className="form-group">
                            <span id="firstNameIcon"></span>

                            <label htmlFor="firstName">First Name*</label>
                            <input 
                                type="text"
                                className="form-control"
                                name="firstName"
                                id = "firstName"
                                placeholder="Enter First Name"
                                onBlur="firstNameValidate()"
                                value={this.state.firstName}
                                onChange={this.onChange}
                            />
                            
                            <span id="firstNameStatus" class="errorHeader"> First name is required!</span>
                        </div>

                        <div className="form-group">
                            <span id="lastNameIcon"></span>
                            <label htmlFor="lastName">Last Name</label>
                            <input 
                                type="text"
                                className="form-control"
                                name="lastName"
                                id = "lastName"
                                placeholder="Enter Last Name"
                                value={this.state.lastName}
                                onChange={this.onChange}
                            />
                        </div>

                        <div className="form-group">
                        <span id="emailIcon"></span>
                            <label htmlFor = "email">Email</label>
                            <input 
                                type = "email"
                                className = "form-control"
                                name = "email"
                                id = "email"
                                placeholder="Enter Email"
                                value={this.state.email}
                                onChange={this.onChange}
                            />
                        </div>
                        
                        <div className="form-group">
                        <span id="passwordIcon"></span>
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Enter Password"
                                value={this.state.password}
                                onChange={this.onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Password</label>
                            <input 
                                type="confirmPassword"
                                className="form-control"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={this.state.confirmPassword}
                                onChange={this.onChange}
                            />
                        </div>

                        <button className="btn btn-lg btn-primary btm-block">
                            Register
                        </button>

                    </form>
                </div>
            </div>
        )
    }
}

export default Register;