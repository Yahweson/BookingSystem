const router = require('express').Router();

let Appointment = require('../models/appointmet.model');

router.route('/').get((req,res) => {
    Appointment.find()
        .then(appointments => res.json(appointments))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) =>{
    const symptoms = req.body.symptoms;  
    const status = req.body.status;
    const patientId = req.body.patientId;

    const newAppointment = new Appointment ({
        symptoms,
        status,
        patientId,
    });

    newAppointment.save()
        .then(() =>res.json('Appointment Added'))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/:id').get((req, res) =>{
    Appointment.findById(req.params.id)
        .then(appointment => res.json(appointment))
        .catch(err => res.status(400).json(appointment));
});

router.route('/remove/:id').delete((req, res) =>{
    Appointment.findByIdAndDelete(req.params.id)
        .then( () => res.json('Appointment deleted'))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route('/update/:id').post((req,res) => {
    
    Appointment.findById(req.params.id)
        .then(appointment => {

            if(req.body.status == ""){appointment.status = appointment.status}else{appointment.status=req.body.status};
            if(req.body.date == ""){appointment.date = appointment.date}else{appointment.date=req.body.dates};
            if(req.body.time == ""){appointment.time = appointment.time}else{appointment.time=req.body.appTime};


            appointment.save()
                .then( () => res.json('Appointment updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;