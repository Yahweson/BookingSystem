import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import jwtDecode  from 'jwt-decode';
//import jwt from 'jsonwebtoken';
import axios from 'axios';

export default class Profile extends Component{

    constructor(props){
        super(props);

        //this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            id:""
        }
    }

    
    componentDidMount(){
       // const token = localStorage.usertoken;  
       const tokens = localStorage.getItem('usertoken');
       const decoded = jwtDecode(tokens);

       
       this.setState({
           firstName: decoded.firstName,
           lastName: decoded.lastName,
           email: decoded.email,
           id: decoded._id,
       });

    }


   // conmponentDidMount(){
//        this.setState({
//            firstName: decoded.firstName,
//            lastName: decoded.lastName,
//            email: decoded.email,
//            username: decoded.username,
//        });    
  //  }


    render(){
        return(
            <div>
                <p>You are on the Patient Dash Component</p>

                <section id = "main">
                    <div className="container">
                        <div className="row">

                            <div className=" col-md-3">
                                <div className="list-group">
                                    <a href="#" className="list-group-item active"><span className="fa fa-cog" aria-hidden="true"></span> Dashboard</a>
                                    
                                        <Link to={"/personalInfo" + this.state.id} className="list-group-item">
                                           Add Personal Info
                                        </Link>
                                    
                                        <Link to ={"/viewPersonalInfo" + this.state.id} className="list-group-item">
                                            View Personal Info
                                        </Link> 
                                     
                                    <a href="#" className="list-group-item"><i className="fas fa-align-left"></i><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                                        <Link to ="/makeAppointment" >
                                            Make Appointment
                                        </Link>
                                     </a>
                                    <a href="#" className="list-group-item"><i className="fas fa-user " aria-hidden="true"></i>
                                        <Link to="/viewAppointment">
                                            View Appointments
                                        </Link>
                                        
                                    </a>
                                    <Link className="list-group-item">Deactivate</Link>
                                </div>
                                <br />
                                
                            </div>
                            
                            <div className="col-md-9">
                                
                                <div className="panel panel-default">
                                    <div className="panel-heading bg-primary"  >
                                        <h3 className="panel-title" >Business Overview </h3>
                                    </div>
                                    <div className="panel-body">  
                                        
                                        <div className="row">
                                                    <div className="col-md-3">
                                                        <div className="well dash-box">
                                                            <h2><span className="fa fa-list-alt" aria-hidden="true"></span> 24</h2>
                                                            <h4>Appointments</h4>
                                                        </div>
                                                    </div>
                                        
                                        </div>


                            
                                    </div>
                                </div>
                                
                                <div className="panel panel-default">
                                    <div className="panel-heading ">
                                        <h3 className="panel-title">Latest Users </h3>
                                    </div>
                                    <div className="panel-body">
                                        <table className="table table-hover table-striped">
                                        <tbody>   
                                            <tr>
                                                <td>First Name</td>
                                                <td>Last Name</td>
                                                <td>Email</td>
                                                <td>Action</td>
                                            </tr>
                                            <tr>
                                                <td>{this.state.firstName}</td>
                                                <td>{this.state.lastName}</td>
                                                <td>{this.state.email}</td>
                                                
                                                <td>
                                                    <Link to ={'/editProfile' + this.state.id}>edit</Link> 
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table> 
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}


