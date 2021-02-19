const router = require('express').Router();
const bcrypt = require('bcryptjs');

let Admin = require('../models/admin.model');

router.route('/').get(( req , res) => {

    Admin.find()
        .then(admin => res.json(admin))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/add').post((req, res) => {

    const email = req.body.email;
    const password = req.body.password;    

    const newAdmin = new Admin ({
        email,
        password,
        
    });

    Admin.findOne({
        email : req.body.email
    })
    .then( admin => {
        if(!admin){
            bcrypt.hash(req.body.password, 10 , (err, hash) =>{
                newAdmin.password = hash;

                newAdmin.save()
                .then(() => res.json('Admin Added'))
                .catch(err => res.status(400).json('Error: ' + err));
            })
        }
    })

  //  req.checkbody('email','Email field is reqiured').isEmail();

});

router.route('/:id').get((req, res) =>{
    Admin.findById(req.params.id)
        .then(admin => res.json(admin))
        .catch(err => res.status(400).json(admin));
});

router.route('/remove/:id').delete((req, res) =>{
    Admin.findByIdAndDelete(req.params.id)
        .then( () => res.json('admin deleted'))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route('/update/:id').post((req,res) => {
    Admin.findById(req.params.id)
        .then(admin => {
            
            admin.username = req.body.username;
            admin.email = req.body.email;
            admin.password = req.body.password;

            admin.save()
                .then( () => res.json('admin updated'))
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {
    Admin.findOne({
        username: req.body.username
    })
    .then(admin => {
        if(admin){
            if(req.body.password === admin.password){
                console.log('Correct password Admin');
               // window.location = 'http://localhst:3000/admin/dash';
                res.send('Correct password Admin');
            }
            else{
                console.log('Incorrect password Admin');
                res.send('Incorrect password Admin')
            }
        }
        else{
            console.log('Invalid Patient password Admin');
            res.send('Invalid Admin');
        }
    })
    .catch(err => {
        res.send('error: ' + err);
    });
});

module.exports = router;