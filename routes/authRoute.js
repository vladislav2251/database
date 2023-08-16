const express = require("express");
const router = express.Router();
const { createUser, loginUser } = require("../controller/userCtrl.js");

//post
router.post("/register", createUser);
router.post("/login", loginUser);

//get

//put

//delete

module.exports = router;