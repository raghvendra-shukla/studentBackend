const express=require("express");
const router = express.Router();
const Admin=require('../models/Admin');
const { body, validationResult } = require('express-validator');
const { request } = require("express");
const fetchAdmin = require("../middelware/fetchAdmin");

// // Route1: fetchingAllAdmin using get request
// router.get('/fetchallAdmin',fetchAdmin, async(req, res) => {
//     try {
//       const admin=await Admin.find();
//       res.json(admin);
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal server error occured");
//     }
//   });

// // Route2: fetchingAAdmin using get request
// router.get('/fetchaAdmin',fetchAdmin, async(req, res) => {
//   try {
//     const admin=await Admin.find({user:req.user.id});
//     res.json(admin);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal server error occured");
//   }
// });

// Route3: adding new Admin using post 
router.post("/addtask",[
  body("task"),
  body("days")
],fetchAdmin,async(req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  try{
    const {task,days}=req.body;
    const admin=new Admin({
      task,days,user:req.user.id
    });
    const saveData=await admin.save();
    res.json(saveData);
  }catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

// Route:3 delete the using delete request
router.delete("/deletetask/:id",fetchAdmin,async (req,res)=>{
  //find the Admin to be delete and delete it
  try{
    let admin=await Admin.findById(req.params.id);
    if(!admin){return res.status(404).send("Not Found")};
    if(admin.user.toString()!==req.user.id){
      return res.send("Not Allowed");
    }
    admin=await Admin.findByIdAndDelete(req.params.id);
    res.json("Success:The note has been deleted");
  }
  catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports=router