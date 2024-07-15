const jwt = require("jsonwebtoken");
const User = require("../modules/User");
const { signInSchema, signUpSchema } = require("../lib/validators/auth");
const { z } = require("zod");
const { hash, compareHash } = require("../lib/utils");

const showSignUp = (req, res) => {
  res.render("sign_up", { user: {}, isLogged: req.session.isLogged });
};

const signUp = (req, res) => {
  try {
    const { email, password, FullName, address, phoneNumber } = signUpSchema.parse(req.body);

    const emailExists = User.findOne({ email });

    if (emailExists) {
      return response.status(422).json({ message: "Email already exists" });
    }

    const hashedPassword = hash(password);

    const user = new User({
      email,
      password: hashedPassword,
      FullName,
      address,
      phoneNumber,
    });

    user.save();

    res.redirect("/sign-in");
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      const { message } = error.errors[0];
      return response.status(422).json({ message: `Validation Error: ${message}` });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const showSignIn = (req, res) => {
  res.render("sign_in", { isLogged: req.session.isLogged });
};

const signIn = async (req, res) => {
  try {
    const { email, password } = signInSchema.parse(req.body);

    const emailExists = await User.findOne({ email });

    if (!emailExists) {
        return response.status(401).json({ message: "Auth failed" });
    }

    const user = emailExists;
    const userIsLogin = await compareHash(password, user.password);

    if (userIsLogin) {
      req.session.isLogged = true;
      let token = jwt.sign(
        {
          ID: user.id,
          Email: user.Email,
          role: user.Role,
        },
        "to live in peace and comfort"
      );
      res.json({
        message: "Auth successful",
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const logout = (req, res) => {
  req.session.isLogged = false;
  res.redirect("/");
};

module.exports = {
  showSignUp,
  signUp,
  showSignIn,
  signIn,
  logout,
};
