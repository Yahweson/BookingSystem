const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const cors = require('cors');
const express = require("express");
const patients = express.Router();

let Patient = require('../models/patient.model');
const Admin = require('../models/admin.model');

process.env.SECRET_KEY = 'secret';
patients.use(cors());


router.route('/').get(( req , res) => {

    Patient.find()
        .then(patients => res.json(patients))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/register').post((req, res) => {

    const { email ,firstName, lastName, password, username} = req.body;

  //  const email = req.body.email;
    //const firstName = req.body.firstName;
    //const lastName = req.body.lastName;
   // const password = req.body.password;
  //  const username = req.body.username;

  //const salt = bcrypt.genSalt();
  //const passwordHash = bcrypt.hash(password, salt);

    const newPatient = new Patient ({   
        email,
        firstName,
        lastName,
        password,
        username,
        
    });

    

    Patient.findOne({
        email: req.body.email
    })
    .then( patient => {
        if(!patient){

           // newPatient.save()
            //.then(() => res.json('Patient Added'))
            //.catch(err => res.status(400).json('Error: ' + err));
           
            bcrypt.hash(req.body.password, 10 , (err, hash) =>{
                newPatient.password = hash;

                //console.log(newPatient);    
                newPatient.save()
                .then(() => res.json('Patient Added'))
                .catch(err => res.status(400).json('Error: ' + err));
            });
            
        }
        else{
            res.send('Username already exists');
        }
    })
    .catch(err => res.status(400).json("Error: " + err));

});

router.route('/remove/:id').delete((req, res) =>{
    Patient.findByIdAndDelete(req.params.id)
        .then( () => res.json('patient deleted'))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route('/update/:id').post((req,res) => {
    Patient.findById(req.params.id)
        .then(patient => {
            if(req.body.email == ""){patient.email = patient.email}else{patient.email=req.body.email};
            if(req.body.firstName == ""){patient.firstName = patient.firstName}else{patient.firstName=req.body.firstName};
            if(req.body.lastName == ""){patient.lastName = patient.lastName}else{patient.lastName=req.body.lastName};
            patient.password = patient.password;            

            console.log(patient);
            patient.save()
                .then( () => res.json('patient updated'))
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {

    Patient.findOne({
        email: req.body.email
    })
    .then(patient => {
        if(patient){
           
            const isMatch = bcrypt.compareSync(req.body.password, patient.password);
            
            if(isMatch){
                //console.log(req.body.email);
                const payload = {
                    _id: patient._id,
                    firstName: patient.firstName,
                    lastName: patient.lastName,
                    username: patient.username,
                    email: patient.email,
                    userAdmin: 'user',
                }
                
                let token = jwt.sign(payload, process.env.SECRET_KEY,{
                    expiresIn: 1440
                });
                //console.log(token);
                //res.send(patient._id);
                res.send(token);
            }else{
                console.log("Patient does not exist");
                //res.json({error: "Patient does not exist"});
            }
        }else{
           // res.json({error: "Patient does not exist"});
            //console.log("Patient does not 2 exist");
            Admin.findOne({
                email: req.body.email
            })
            .then(admin =>{
                if(admin){
                    console.log('Found' );

                    const diff = bcrypt.compareSync(req.body.password, admin.password);

                    if(diff){

                        const sending = {
                            _id : admin._id,
                            email : admin.email,
                            userAdmin: 'admin',
                        }

                        let tokenLogin = jwt.sign(sending, process.env.SECRET_KEY,{
                            expiresIn: 1440
                        });

                        res.send(tokenLogin);
                        console.log(sending);
                    }

                }
                
            })
            .catch(err => {
                res.send('error: ' + err)
            });
        }
    })
    .catch(err =>{
        //res.send('error: ' + err);
        //res.json({error : "Patient does not exist"});
        console.log("Patient does not 3 exist");

    });
});

router.route('/profile:id').get(( req , res) => {

    const identity = req.body;
   var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

   Patient.findById({
       //_id: decoded._id
       _id: identity
   })
   .then(patient =>{
        if(patient){
            res.json(patient + 'profile');
            console.log(patient);
        }else{
            res.send("Patient does not exits")
        }
   })
   .catch(err => {
       res.send('error: ' + err)
   });

});

router.route('/signin').post((req, res) => {

    Patient.findOne({
        email: req.body.email
    })
    .then(patient => {
        if(patient){
           
            const isMatch = bcrypt.compareSync(req.body.password, patient.password);
            
            if(isMatch){
                //console.log(req.body.email);
                const payload = {
                    _id: patient._id,
                    firstName: patient.firstName,
                    lastName: patient.lastName,
                    username: patient.username,
                    email: patient.email,
                    userAdmin: 'user',
                }
                
                let token = jwt.sign(payload, process.env.SECRET_KEY,{
                    expiresIn: 1440
                });
                //console.log(token);
                //res.send(patient._id);
                res.send(token);
            }else{
                console.log("Patient does not exist");
                //res.json({error: "Patient does not exist"});
            }
        }else{
           // res.json({error: "Patient does not exist"});
            console.log("Patient does not 2 exist");
        }
    })
    .catch(err =>{
        //res.send('error: ' + err);
        //res.json({error : "Patient does not exist"});
        console.log("Patient does not 3 exist");

    });
});
module.exports = router;