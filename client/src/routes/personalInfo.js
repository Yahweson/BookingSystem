const router = require('express').Router();

let PersonalInfo = require('../models/patientInfo.model');

router.route('/').get((req,res) => {
    PersonalInfo.find()
        .then(personalInfo => res.json(personalInfo))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) =>{

    const patientId = req.body.patientId;
    const idNumber = Number(req.body.idNumber);
    const gender = req.body.gender;
    const condition = req.body.condition;
    const cell = Number(req.body.cell);
    const workNumber = Number(req.body.workNumber);
    const address = req.body.address;
    

    const newPersonalInfo = new PersonalInfo ({
        idNumber,
        gender,
        condition,
        cell,
        workNumber,
        address,
        patientId
    });

    console.log(newPersonalInfo);

    newPersonalInfo.save()
        .then(() =>res.json('Personal Info Added'))
        .catch(err => res.status(400).json('Error: ' + err));

});


router.route('/:id').get((req, res) =>{
    PersonalInfo.findById(req.params.id)
        .then(info => res.json(info))
        .catch(err => res.status(400).json(info));
});

router.route('/remove/:id').delete((req, res) =>{

    console.log(req.params.id);

    PersonalInfo.findByIdAndDelete(req.params.id)
        .then( () => res.json('Info deleted'))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route('/update/:id').post((req,res) => {

    PersonalInfo.findOne({
        patientId : req.params.id
    })
        .then(info => {
            
            if(req.body.idNumber == ""){info.idNumber = info.idNumber}else{info.idNumber=req.body.idNumber};
            if(req.body.gender == ""){info.gender = info.gender}else{info.gender=req.body.gender};
            if(req.body.condition == ""){info.condition = info.condition}else{info.condition=req.body.condition};
            if(req.body.cell == ""){info.cell = info.cell}else{info.cell=req.body.cell};
            if(req.body.workNumber == ""){info.workNumber = info.workNumber}else{info.workNumber=req.body.workNumber};
            if(req.body.address == ""){info.address = info.address}else{info.address=req.body.address};
            info.patientId = info.patientId;

            info.save()
                .then( () => res.json('Personal Info updated'))
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;