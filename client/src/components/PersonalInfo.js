import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';

export default class PersonalInfo extends Component{
    constructor(props){
        super(props);

        this.onChangeIdNumber = this.onChangeIdNumber.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeCell = this.onChangeCell.bind(this);
        this.onChangeWorkNumber = this.onChangeWorkNumber.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeCondition = this.onChangeCondition.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
      

        this.state = {
            admins: [] ,
            idNumber:"",
            gender: "",
            condition: "",
            cell: "",
            workNumber: "",
            address: "",
            patientIdpatientId:"",
        }
    }

    conmponentDidMount(){
        

    }

    onChangeCondition(e) {
        this.setState({
            condition : e.target.value
        });
    }

    onChangeAddress(e) {
        this.setState({
            address : e.target.value
        });
    }
    
    onChangeIdNumber(e) {
        this.setState({
            idNumber : e.target.value
        });
    }

    onChangeWorkNumber(e) {
        this.setState({
            workNumber : e.target.value
        });
    }

    onChangeGender(e) {
        this.setState({
            gender : e.target.value
        });
    }

    onChangeEmail(e){
        this.setState({
            email : e.target.value
        });
    }

    onChangeCell(e) {
        this.setState({
            cell : e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
       
        this.setState({
             patientId : this.props.match.params.id
        });
        
        const info = {
            idNumber : this.state.idNumber,
            gender: this.state.gender,
            condition: this.state.condition,
            cell: this.state.cell,
            workNumber: this.state.workNumber,
            address: this.state.address,
            patientId: this.props.match.params.id
        }

        console.log(info);
        axios.post('http://localhost:5000/patientInfo/add/', info)
        .then(res => console.log(res.data));

        //console.log({admin});
     //   window.location = '/admin/dash';
    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        
                            <Link to="/profile" className="nav-link">
                                back
                            </Link>
                        
                    </div>
                </div>
                
                <form noValidate onSubmit={this.onSubmit} className="col-md-8 mx-auto">
                        <h1 className="h3 mb-3 font-weight-normal">Personal Info</h1>

                        <div className="form-group">
                            <label htmlFor="gender">Identification Number</label>
                            <input 
                                type="text"
                                className="form-control"
                                name="idNumber"
                                placeholder="Enter Indentification Number"
                                value={this.state.idNumber}
                                onChange={this.onChangeIdNumber}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <input 
                                type="text"
                                className="form-control"
                                name="gender"
                                placeholder="Enter Gender"
                                value={this.state.gender}
                                onChange={this.onChangeGender}
                            />
                        </div>

                        <div className="form-goup">
                            <label htmlFor="condition">Pre-existing Condition</label>	
                            <textarea 
                                onChange={this.onChangeCondition}
                                className="form-control" 
                                id="reason" 
                                cols="30" 
                                rows="10" 
                                placeholder="Describe pre-existing condition ...">            
                            </textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="cell">Cell</label>
                            <input 
                                type="text"
                                className="form-control"
                                name="cell"
                                placeholder="Enter Cell"
                                value={this.state.cell}
                                onChange={this.onChangeCell}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="workNumber">Work Number</label>
                            <input 
                                type="text"
                                className="form-control"
                                name="workNumber"
                                placeholder="Enter Work Number"
                                value={this.state.workNumber}
                                onChange={this.onChangeWorkNumber}
                            />
                        </div>

                        <div className="form-goup">
                            <label htmlFor="address">Address</label>	
                            <textarea 
                                onChange={this.onChangeAddress}
                                className="form-control" 
                                id="reason" 
                                cols="30" 
                                rows="10" 
                                placeholder="Enter your address ... right here">            
                            </textarea>
                        </div>

                        <button className="btn btn-lg btn-primary btm-block">
                            Add Info
                        </button>

                    </form>
            </div>
        )
    }

}


