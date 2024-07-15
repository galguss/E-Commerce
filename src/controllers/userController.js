const jwt = require('jsonwebtoken');
const Users = require('../modules/user_M');
const Encryption_M = require('../modules/Encryption_M');

exports.showSignUp = (req, res) => {
    res.render('sign_up', {user : {}, isLogged: req.session.isLogged });
}

exports.signUp = (req, res) => {
    try {
        const {Email, Password, Full_Name, Address, Phone_Number} = req.body;
        const Encryption = new Encryption_M(Password);
        const user = new Users({
            Email,
            Password: Encryption.getEncryption(),
            Full_Name,
            Role: 'USER',
            Address,
            Phone_Number
        });
        user.save();
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}

exports.showSignIn = (req, res) => {
    res.render('sign_in', { isLogged: req.session.isLogged });
}

exports.signIn = async (req,res) => {
    try {
        const { Email, Password } = req.body;
        const Encryption = new Encryption_M( Password );
        const user = await Users.findOne({ Email });
        const userIsLogin = Encryption.IsCompatible(user.Password);
        if(userIsLogin){
            req.session.isLogged = true;
            let token = jwt.sign({
               ID: user.id,
               Email: user.Email,
               role: user.Role,
           }, "to live in peace and comfort");
           res.json({ 
               message: "Auth successful",
               token: token,
           });
        }
        
    } catch (error) {
        console.log(error);
    }
}

exports.logout =(req,res) => {
    req.session.isLogged = false;
    res.redirect('/');
}