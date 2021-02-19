import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import jwtDecode  from 'jwt-decode';

class Navbar extends Component{

    logOut(e){
        e.preventDefault();
        localStorage.removeItem('usertoken');
        this.props.history.push('/');
    }


    checkToken(){

        const tokens = localStorage.getItem('usertoken');
        const decoded = jwtDecode(tokens);
        const userAdmin = decoded.userAdmin;
        
        if(userAdmin === "user"){
           // this.props.history.push('/profile');
           return (
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

        }else if(userAdmin === 'admin'){
           // this.props.history.push('/dash');     
            this.adminLink.bind(this);
            this.adminLink();
        }
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

        const checkLogin = (
            this.checkToken.bind(this)
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
                    
                    {localStorage.usertoken ? userLink : loginRegLink}


                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar)