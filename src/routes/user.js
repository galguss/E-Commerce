const router = require("express").Router();

const {
  showSignUp,
  signUp,
  showSignIn,
  signIn,
  logout,
} = require("../controllers/user");

router.get("/sign-up", showSignUp);
router.post("/sing-up", signUp);

router.get("/sign-in", showSignIn);
router.post("/sign-in", signIn);

router.get("/logout", logout);

module.exports = router;
