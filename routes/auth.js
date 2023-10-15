const express = require("express");
const router = express.Router();
const { loginUser, registerUser } = require("../controllers/auth");

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);

/*
we can also write it like
/api/v1/auth/login
router.post("/login",loginUser)
router.post("/register",registerUser)

*/

module.exports = router;
 