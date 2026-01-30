const expresss = require('express');
const path = require('path');
const router = expresss.Router();

 router.get('/afterLogIn',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','/','afterLogin.html'));
 })
 router.get('/afterSignIn',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','/','afterRegister.html'));
 })

  module.exports=router;