'use strict';
const { CognitoJwtVerifier } = require("aws-jwt-verify");
const AwsConfig = require('../lib/AwsConfig');
const AWSCognito = require('../cognito/amazon-cognito-identity');
var express = require('express');
const { render } = require('express/lib/response');
var router = express.Router();
require('dotenv').config();
const Cognito = require('../cognito/index');
const { verify } = require('../cognito/index');
const jwt = require('jsonwebtoken')


const body = {
   email: "",
   password: "",
};
const jwtVerifier = CognitoJwtVerifier.create({
    userPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
    tokenUse: "access",
    clientId: process.env.AWS_COGNITO_CLIENT_ID,
    scope: "read",
});

var verifiedCode = '';

async function Signup() {
    const response = await Cognito.signUp(body.email,body.password);
    var status = Object.keys(response);
    console.log("statuscode: "+ status[0] + ", code number : " + response[status[0]])
}

async function Verify() {
    const response = await Cognito.verify(body.email,verifiedCode);
    console.log(response);
}

async function SignIn() {
    const response = await Cognito.TestsignIn(body.email,body.password);
    return response;
   
}
    

router.get('/',(req,res,next)=>{
    res.render('login');
});

router.post('/login',async (req,res,next)=>{
    var id = req.body.email;
    var pw = req.body.password;
    body['email'] = id;
    body['password'] = pw;
    var data = await SignIn();
    const token = jwt.sign(
        response,
        'secret',{
            expiresIn: '1m',
            issuer: 'secret'
        });

    res.redirect('https://test-login-test.auth.us-east-1.amazoncognito.com/');

});
router.get('/login', async (req,res,next)=>{
    if(!req.session.jwt){
        console.log('토큰 어디갔어');
    }
    console.log('로그인 완료');
    res.render('profile');
})

router.get('/join', (req,res,next)=>{
    res.render('join');
})
router.post('/add', (req,res,next)=>{
    var id = req.body.email;
    var pw = req.body.password;
    body['email'] = id;
    body['password'] = pw;

    Signup();

    res.render('verify');
    
})
router.post('/verify', (req,res,next)=>{
    verifiedCode = req.body.verifycode;
    Verify();

    res.redirect('/');
})

router.get("/verify", async (req, res, next) => {
    try {
      // A valid JWT is expected in the HTTP header "authorization"
        await jwtVerifier.verify(req.header("authorization"));
    } catch (err) {
      console.error(err);
      return res.status(403).json({ statusCode: 403, message: "Forbidden" });
    }
    res.json({ private: "only visible to users sending a valid JWT" });
  });


router.get('/test', async(req, res,next)=>{
    res.render('test');
})


module.exports = router;