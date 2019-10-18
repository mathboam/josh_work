const express = require("express");
const router = express.Router();
const myController = require('../Controllers/myController');
const passport = require('passport');

router.get('/',myController.homepageController);
router.get('/users/register',myController.registerController);
router.post('/users/register',myController.registermiddleware);
router.get('/users/login',myController.loginController);
router.post('/users/login',myController.passportAuthentication);
router.get('/users/dashboard',myController.dashboardcontroller);
router.get('/users/logout',myController.logoutHandle);
router.get('/users/registration',myController.registration,myController.dashboardcontroller);
router.post('/users/regstration',myController.registration);
router.get('/',myController.loginController);



module.exports = router;