const express = require("express");
const router = express.Router();
const userController = require("../users/userController");
router.post('/sign-up',userController.signUp);
router.post("/sign-in", userController.signIn);
module.exports = router;