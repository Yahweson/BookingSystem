import React, {Component} from 'react';

import { Link } from 'react-router-dom';

export default class Dash extends Component{
    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    conmponentDidMount(){

    }

    onSubmit(e){
        e.preventDefault();

        window.location = '/';
    }

    render(){
        return(
            <div>
                <p>You are on the Dash Component</p>

                <section id = "main">
                    <div className="container">
                        <div className="row">
                            <div className=" col-md-3">
                                <div className="list-group">
                                    <a href="#" className="list-group-item active"><span className="fa fa-cog" aria-hidden="true"></span> Dashboard</a>
                                    <Link to="/viewPatient" className="list-group-item">
                                        View Patients
                                    </Link>
                                     

                                    
                                    <Link to="/viewAppDash" className="list-group-item">
                                        View Appointments and Confirm
                                    </Link>
                                 
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
                                                <div className="col-md-3 ">
                                                        <div className="well dash-box">
                                                            <h2><span className="fa fa-user" aria-hidden="true"></span> 74</h2>
                                                            <h4>Appointments</h4>
                                                        </div>
                                                    </div>
                                                
                                                    <div className="col-md-3">
                                                        <div className="well dash-box">
                                                            <h2><span className="fa fa-list-alt" aria-hidden="true"></span> 24</h2>
                                                            <h4>Patients</h4>
                                                        </div>
                                                    </div>
                                        
                                                <div className="col-md-3">
                                                        <div className="well dash-box">
                                                            <h2><span className="fas fa-align-left" aria-hidden="true"></span> 102</h2>
                                                        <h4>Posts</h4>
                                                        </div>
                                                    </div>
                                        
                                                    <div className="col-md-3">
                                                        <div className="well dash-box">
                                                            <h2><i className="fas fa-phone" aria-hidden="true"></i> 10 474</h2>
                                                            <h4>Visitors</h4>
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
                                                <td>Name</td>
                                                <td>Email</td>
                                                <td>Joined</td>
                                            </tr>
                                            <tr>
                                                <td>Jill Scott</td>
                                                <td>jilScott@gmail.com</td>
                                                <td>Dec 10, 2020</td>
                                            </tr>
                                            <tr>
                                                <td>Jill Scott</td>
                                                <td>jilScott@gmail.com</td>
                                                <td>Dec 10, 2020</td>
                                            </tr>
                                            <tr>
                                                <td>Jill Scott</td>
                                                <td>jilScott@gmail.com</td>
                                                <td>Dec 10, 2020</td>
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


