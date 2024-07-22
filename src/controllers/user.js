const User = require("../modules/User");
const { signInSchema, signUpSchema } = require("../lib/validators/auth");
const { z } = require("zod");
const { hash, compareHash, generateToken } = require("../lib/utils");

const showSignUp = (req, res) => {
  res.render("sign_up");
};

const signUp = async (req, res) => {
  try {
    const { email, password, fullName, address, phoneNumber } = signUpSchema.parse(
      req.body
    );
    
    const emailExists = await User.findOne({ email });
    
    if (emailExists) {
      return res.status(422).json({ message: "Email already exists" });
    }
    
    const hashedPassword = await hash(password);
    
    const user = new User({
      email,
      password: hashedPassword,
      fullName,
      address,
      phoneNumber,
    });
    
    user.save();
    res.redirect("/");
    //res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      const { message } = error.errors[0];
      return res.status(422).json({ message: `Validation Error: ${message}` });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const showSignIn = (req, res) => {
  res.render("sign_in");
};

const signIn = async (req, res) => {
  try {
    const { email, password } = signInSchema.parse(req.body);

    const emailExists = await User.findOne({ email });

    if (!emailExists) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const user = emailExists;   
    const userIsLogin = await compareHash(password, user.password);

    if (userIsLogin) {
      const token = await generateToken({id:user._id, email:user.email, role: user.role});
      
      res.cookie("token", token, { httpOnly: true });

      return res.status(200).json({ message: "Auth success" });
    }

    return res.status(401).json({ message: "Incorrect email or password" });
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      const { message } = error.errors[0];
      return res.status(422).json({ message: `Validation Error: ${message}` });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("user");
  res.clearCookie("token");
  res.redirect("/");
};

module.exports = {
  showSignUp,
  signUp,
  showSignIn,
  signIn,
  logout,
};
