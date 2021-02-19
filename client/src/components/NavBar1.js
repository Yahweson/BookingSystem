import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import jwtDecode  from 'jwt-decode';

class Navbars extends Component{

    constructor(props){
        super(props);

        this.state = {
            userAdmin : ""
        }
    }

    componentDidMount(){
        if(localStorage.usertoken){
            const tokens = localStorage.getItem('usertoken');
            const decoded = jwtDecode(tokens);
            const userAdmin = decoded.userAdmin;

            this.setState({
                userAdmin : userAdmin
            });
            
        }
    }

    logOut(e){
        e.preventDefault();
        localStorage.removeItem('usertoken');
        this.props.history.push('/');
    }


    render(){
        const loginRegLink = (
            <ul className="navbar-nav"> 
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to ="/register" className="nav-link">
                        Register
                    </Link>
                </li>
            </ul>
        )

        const adminLink = (

            <ul className="navbar-nav"> 
            <li className="nav-item">
                <Link to="/dash" className="nav-link">
                    admin
                </Link>
            </li>

            <li className="nav-item">
                <a href="/" onClick={this.logOut.bind(this)} className="nav-link">
                    Logout
                </a>
            </li>
        </ul>
        )

        const userLink = (
            <ul className="navbar-nav"> 
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                        Profile
                    </Link>
                </li>

                <li className="nav-item">
                    <a href="/" onClick={this.logOut.bind(this)} className="nav-link">
                        Logout
                    </a>
                </li>
            </ul>
        )

        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
                <button className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbar1"
                    aria-controls="navbar1"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-md-center" id="navbar1">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                    </ul>
                    
                    {
                        this.state.userAdmin === 'user' ? (
                            <ul className="navbar-nav"> 
                                <li className="nav-item">
                                    <Link to="/profile" className="nav-link">
                                        Profile
                                    </Link>
                                </li>
                
                                <li className="nav-item">
                                    <a href="/" onClick={this.logOut.bind(this)} className="nav-link">
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        ) : 
                        this.state.userAdmin === 'admin' ?(
                            <ul className="navbar-nav"> 
                                <li className="nav-item">
                                    <Link to="/dash" className="nav-link">
                                        Admin
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <a href="/" onClick={this.logOut.bind(this)} className="nav-link">
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        ):(
                            <ul className="navbar-nav"> 
                                    <li className="nav-item">
                                        <Link to="/login" className="nav-link">
                                            Login
                                        </Link>
                                    </li>
                    
                                    <li className="nav-item">
                                        <Link to ="/register" className="nav-link">
                                            Register
                                        </Link>
                                    </li>
                                </ul>
                        )
                    }
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbars)