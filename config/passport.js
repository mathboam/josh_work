const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



// load user model
require('../models/User');
const Student = mongoose.model('User');


module.exports = function(passport){
passport.use(
new localStrategy({usernameField: 'studentID'},(studentID,password,done) =>{
    // match user
    Student.findOne({studentID:studentID})
    .then(student =>{
        if (!student) {
            return done(null,false,{message: 'This account is not registered'});
        }
        // match password
        bcrypt.compare(password,student.password,(err,isMatch)=>{
            if(err){
                console.log(err);
            }else if(isMatch){
                 return done(null,student);
            }else{
                return done(null,false, {message:'password is incorrect'});
            }
        });
    })
    .catch(err =>{
        if (err) {
            console.log(err);
            
        }
    });
})
);
passport.serializeUser(function(student,done){
    done(null,student.id);
});

passport.deserializeUser(function(id,done){
    Student.findById(id,function(err,student){
        done(err,student);
    })
})
}
