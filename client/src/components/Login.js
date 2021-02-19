import React, {Component} from 'react';
import {login} from './PatientFunctions';
import axios from 'axios';
import jwtDecode  from 'jwt-decode';

export default class Login extends Component{
    constructor(props){
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
        }

    }

   // onChanged(e){
    //    this.state({[e.target.name]: e.target.value});
   // }

   onChangePassword(e){
       this.setState({
           password: e.target.value
       });
   }
    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const patient = {
            email: this.state.email,
            password: this.state.password,
        }

        //axios.post('http://localhost:5000/patients/login',patient)
        //    .then(res => {
               // console.log(res.data);
        //        if(res.data)
        //        {
        //            localStorage.setItem('usertoken', res.data);
        //            this.props.history.push('/profile');
                   // console.log(res.data);    
        //        }
        //    });
            

        login(patient).then(res => {
            const tokens = localStorage.getItem('usertoken');
            const decoded = jwtDecode(tokens);
            const userAdmin = decoded.userAdmin;
            //alert(res.data);
            if(userAdmin === "user"){
                this.props.history.push('/profile');
            }else if(userAdmin === 'admin'){
                this.props.history.push('/dash');
            }
        });
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <form noValidate onSubmit={this.onSubmit} className="col-md-8 mx-auto">
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Enter Email"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Enter Password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                            />
                        </div>

                        <button className="btn btn-lg btn-primary btm-block">
                            Sign in
                        </button>

                    </form>
                </div>
            </div>
        )
    }
}

