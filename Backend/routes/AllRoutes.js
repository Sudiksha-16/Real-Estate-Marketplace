let express = require("express");
const {housesModel,usersModel,enquiriesModel} = require("../models/allschemas");
let allroutes = express.Router();
const multer = require("multer");
const upload = multer();
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const auth = require('./au');


allroutes.get('/',(req,res) => {
    console.log(" reached root");
    res.send("Welcome to real estate market place back end service");
});

allroutes.get('/houses',async (req,res) => {
    console.log(" reached /houses");
    try{
        let houses = await housesModel.find({});
        res.send(houses);
    }
    catch(err){
        console.log(err);
        res.status(500).send(" error while fetching houses");
    }
    
});

allroutes.get('/house/:id',async (req,res) => {
    console.log(" reached /house" + req.params.id);
    let myid = parseInt(req.params.id);
    try{
        console.log("id"+req.params.id);
        let house = await housesModel.findOne({id:myid});
        console.log(house);
        res.send(house);
    }
    catch(err){
        console.log(err);
        res.status(500).send(" error while fetching houses");
    }
    
});

allroutes.post('/signup',upload.none(),async (req,res) =>{
    //store data in DB using model , and send the newly created object
    try{ 
        console.log(req.body);
        // use model and save to back end
        let newuser = new usersModel(req.body)
        let userFromDB = await newuser.save();
        console.log(userFromDB);
        res.send(userFromDB);
    }
    catch(err){
        //check whether user already exists or send appropriate message
        // error code 1100
        console.log(" error while adding user. check if it is duplicate");
        console.log(err);
        res.status(500).send(err)
    }
});

// without JWT
allroutes.post('/login',upload.none(),async (req,res) =>{
    //check email password DB using model , and send a success response
    try{ 
        console.log(req.body);
        // use model and find  
        let response = await usersModel.find({email:req.body.email,password:req.body.password});
        console.log(response);        
        res.send(response);       
    }
    catch(err){
        console.log(err);
        res.status(500).send(err)
    }
});


  allroutes.post('/addenquiry',upload.none(),async (req,res) =>{
    //get all details and store in db
    try{ 
        console.log(req.body);
        // use model and save to back end
        let newEnquiry = new enquiriesModel(req.body)
        let enquirySavedFromDB = await newEnquiry.save();
        console.log(enquirySavedFromDB);
        res.send(enquirySavedFromDB);
    }
    catch(err){
        console.log(" error while adding enquiry.");
        console.log(err);
        res.status(500).send(err)
    }
});


allroutes.get('/enquiries',async (req,res) => {
    console.log(" reached /enquiries");
    try{
        let enquiries = await enquiriesModel.find({});
        res.send(enquiries);
    }
    catch(err){
        console.log(err);
        res.status(500).send(" error while fetching enquiries");
    }
    
});

module.exports = allroutes;
