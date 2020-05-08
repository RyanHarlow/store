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
    res.send('person')
})

router.post('/', function(req, res){
    const {firstName, lastName, email, password} = req.body;

    const validEmail = validator.isEmail(email);
    const validPassword = schema.validate(password)

    if(validEmail && validPassword){
        bcrypt.hash(password, saltRounds, function(err, hash) {
            try {
                db.Person.create({firstName, lastName, email, hash}).then(person => {
                    console.log("new person auto-generated ID:", person.id);
                    req.session.user = email;
                    res.json({success: 'User Created'});
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


module.exports = router;