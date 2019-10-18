const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('../models/User');
const bcrypt = require('bcryptjs');

const Student = mongoose.model('User');
const passport = require('passport');

exports.homepageController  = (req,res) =>{
    res.render('welcome',{title:'WELCOME'});
}

// register controller
exports.registerController = (req,res,next) => {
    res.render('register',{title:'Register',errors: [],error:'',counter:0});
}

// login controller
exports.loginController = (req,res) => {
    res.render('login',{title:'Login',errors: [],error:'',counter:0});
}

exports.registermiddleware = (req,res) => {
    const { name , email , password , studentID , password2, hall ,room} = req.body;
    let errors = [];

    // check required fields
    if (!name || !password || !studentID || !email ) {
        errors.push({msg:"Fill up all the fields"});
    }
    // check if password match 
    if (password != password2) {
        errors.push({msg:"Passwords donnot match"})
    }
    // check if password is strong 
    if (password.length < 6) {
        errors.push({msg:"Password should be more than six character"});
    }
    if(errors.length >0){
        res.render('register',{title:"Register",errors,name,email,studentID,conter:0});
    }else{
        // check if the acoount is not registered already
        Student.findOne({studentID:studentID}).then(student =>{
            if(student){
                errors.push({msg:"The account already exist"});
                res.render('register',{
                    errors,
                    name,
                    email,
                    studentID,
                    title:'Register'
                })
            }else{
                // account is not in the database
                const newStudent = new Student({
                    name,
                    email,
                    studentID,
                    password,
                    hall,
                    room
                })
                // console.log(newStudent);
                // res.send('hello');
                
                // // hash password
                bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newStudent.password, salt, function(err, hash) {
                        // Store hash in your password DB.
                        if (err) {
                            console.log(err);
                        }else{
                            newStudent.password = hash;
                            // save data
                            newStudent.save().then(user => {
                                if(user){
                                    req.flash('success_msg','You are successfully registered');
                                    res.redirect('/users/login');
                                }
                            }).catch(err => {
                                if (err){
                                    console.log(err);
                                }
                            });
                        }
                    });
                });
                 
            }
        })
    }
}

exports.passportAuthentication = (req,res,next) => {
    passport.authenticate('local',{
        successRedirect:'/users/dashboard',
        failureRedirect:'/users/login',
        failureFlash:true
    })(req,res,next);
}

exports.dashboardcontroller = (req,res,next)=>{
    Student.find({},function(err,doc){
        if (err) {
            console.log(err);
        }else{
        res.render('dashboard',{title:"Dashboard",students:doc});
        }
    })
}

exports.logoutHandle = (req,res) => {
    req.logout();
    req.flash('success_msg','you are logged out');
    res.redirect('/users/login');
}

exports.registration = (req,res,next) => {
    res.render('Registration',{title:'Registration',errors:[],counter:0});
    const  { hall, room} = req.body;
    var id = Student.findById({_id:this.id});
    Student.findByIdAndUpdate(id,
        {
            $set:{hall: hall,room:room}
        },
        {
            new: true
        }, (err,udpated)=>{
            if(err){
                console.log(err);
            }else if (udpated) {
            req.flash('success_msg','hall registered');
            next();
            }
                
        })
}

