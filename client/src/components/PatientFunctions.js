import axios from 'axios';
import jwt_decoded from 'jwt-decode';
import jwtDecode from 'jwt-decode';

export const register = newPatient => {
    return axios
    .post('http://loclhost:5000/patients/register', {
        email: newPatient.email,
        firstName: newPatient.firstName,
        lastName: newPatient.lastName,
        password: newPatient.password,
        username: newPatient.username
    })
    .then(res => {
        console.log('Registered');
    });
}

export const login = patient => {
    return axios
        .post('http://localhost:5000/patients/login', {
            email: patient.email,
            password: patient.password
        })
        .then(res => {
           // console.log(res.data);
           

           const token = res.data;

            localStorage.setItem('usertoken', token);

           // console.log(token);
            return res.data;


        })
        .catch(err => {
            console.log(err);
        });
}