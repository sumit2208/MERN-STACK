const express = require("express");
const router = express.Router();
const { createUser, login } = require("../controller/userContoller");

router.post("/create",createUser)
router.post("/Login",login)


module.exports = router 