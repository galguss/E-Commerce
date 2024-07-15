const router = require('express').Router();

const { showSignUp, signUp, showSignIn, signIn, logout } = require("../controllers/user");

router.get("/signup", showSignUp);
router.post("/singup", signUp);
router.get("/signin", showSignIn);
router.post("/signin", signIn);
router.get("/logout", logout);

module.exports = router;
