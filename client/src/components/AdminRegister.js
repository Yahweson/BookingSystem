import React, {Component} from 'react';

import axios from 'axios';

export default class AdminRegister extends Component{
    constructor(props){
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
      

        this.state = {
            admins: [] ,
            password:"",
            email: "",
            
        }
    }

    conmponentDidMount(){
        

    }

    onChangeEmail(e){
        this.setState({
            email : e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password : e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const admin = {
            email : this.state.email,
            username: this.state.username,
            password: this.state.password,
        }

        axios.post('http://localhost:5000/admin/add/', admin)
        .then(res => console.log(res.data));

        console.log({admin});
     //   window.location = '/admin/dash';
    }

    render(){
        return(
            <div>
                <div>
                    <ul>
                        {this.state.admins.map(admin => 
                            <li key={admin._id}>{admin.username}{admin.email}</li>    
                        )}
                    </ul>
                </div>
                
                <form noValidate onSubmit={this.onSubmit} className="col-md-8 mx-auto">
                        <h1 className="h3 mb-3 font-weight-normal">Register Admin</h1>
                        
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
        )
    }

}


