var express = require('express');
const { redirect } = require('express/lib/response');
var router = express.Router();
require('dotenv').config();
const Cognito = require('../cognito/index');
const { verify } = require('../cognito/index');
const body = {
   email: "insomnis2020@naver.com",
   password: "Test123456789101112!",
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', async function(req,res,next){
  const response = await Cognito.signIn(body.email,body.password);
  console.log(response);
  res.render('/');
});

module.exports = router;
