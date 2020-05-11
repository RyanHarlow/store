const express = require('express')
const router = express.Router()
const validator = require('validator');
const passwordValidator = require('password-validator')
const schema = new passwordValidator();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('./db/index');

schema
    .is().min(12)
    .has().uppercase()
    .has().lowercase()
    .has().digits();

router.get('/', function (req, res) {
    if(!req.session.user){
        res.json({user: null})
    }else{
        db.Person.findOne({ where: {email: req.session.user} }).then(person => {
            let user = person.dataValues;
            delete user["hash"];
            res.json({user})
        }).catch(err => {
            res.json({err: 'Error authenticating'})
        })
    }
})

router.post('/', function(req, res){
    const {firstName, lastName, email, password} = req.body;

    const validEmail = validator.isEmail(email);
    const validPassword = schema.validate(password)

    if(validEmail && validPassword){
        bcrypt.hash(password, saltRounds, function(err, hash) {
            try {
                db.Person.findOrCreate({where: {email: email}, defaults:{firstName, lastName, email, hash}}).then(([person, created]) => {
                    if(!created){
                        res.json({err: 'User with entered email already exists'})
                    }else {
                        console.log("new person auto-generated ID:", person.id);
                        req.session.user = email;
                        res.json({success: 'User Created'});
                    }
                });
            }catch(error){
                res.json({err: 'there was an error generating your account'})
            }
        });
    }else if(validEmail){
        res.json({err: 'Password not valid'})
    }else{
        res.json({err: 'email not valid'})
    }
})

router.post('/login', (req,res) => {
    const {email, password} = req.body;

    db.Person.findOne({where: {email}}).then(person => {
        if(!person){
            res.json({err: 'Incorrect email or password'})
        }else{
            bcrypt.compare(password, person.dataValues.hash, function(err, result) {
                if(err){
                    res.json({err: 'There was an error logging in'})
                }else{
                    if(result){
                        req.session.user = email;
                        res.json({success: 'User Logged in'})
                    }else{
                        res.json({err: 'Incorrect email or password'})
                    }
                }

            });
        }
    }).catch(err => {
        res.send({err: 'There was an error logging in'})
    })
})

router.post('/logout', (req, res) => {
    req.session.destroy(function(err) {
        if(err){
            res.json({err: 'error logging out'})
        }else{
            res.json({success: 'you have been logged out'})
        }
    })
})


module.exports = router;