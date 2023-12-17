const express=require("express");
const router = express.Router();
const Admin=require('../models/Admin');
const { body, validationResult } = require('express-validator');
const { request } = require("express");
const fetchAdmin = require("../middelware/fetchAdmin");

// Route1: fetchingAllTask using get request
router.get('/fetchalltask',fetchAdmin, async(req, res) => {
    try {
      const admin=await Admin.find();
      res.json(admin);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occured");
    }
  });


module.exports=router