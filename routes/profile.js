var express = require('express');
var router = express.Router();
require('dotenv').config();
var jwt = require('jsonwebtoken');
var request = require('request');
var jwkToPem = require('jwk-to-pem');



router.get('/',(req,res,next)=>{
    res.render('profile');
});

module.exports = router;
