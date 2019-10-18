const express = require("express");     // Importing Package
const path = require("path");
const expressLayouts = require('express-ejs-layouts');
const ejs = require("ejs");
const session = require('express-session');
const route = require("./Routes/routes");
const flash  = require('connect-flash');
const passport = require('passport');
const app = express();                  // Executing application
const mongoose = require("mongoose");   // Importing Package
mongoose.Promise = global.Promise; //tell mongoose es6 promises
const PORT = 2019;
require('./config/passport')(passport);

// Specifies where to find dependencies for the view
app.use(express.static(__dirname+'/Public'));

app.set("views", path.join(__dirname, 'Views'));
app.use(expressLayouts);
app.set('view engine', 'ejs');

// express session middleware
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));



app.use(flash());


app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.counter = 0;
    next();
});

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
app.use(route);
// require('../models/User');








mongoose.connect("mongodb://localhost:27018/api", { useNewUrlParser: true ,useUnifiedTopology:true})
.then(() => {
    console.log("CONNECTED");
}).catch(err => {
    console.log(err);
});

app.listen(PORT, ()=> console.log("Server started!!!")); // Listening for request and response