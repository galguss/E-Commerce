const User = require("../modules/User");
const { userUpdateSchema, searchUserSchema } = require("../lib/validators/auth");
const { z } = require("zod");

const getAllAccounts = async (req, res) => {
    const accounts = await User.find();
    res.status(201).json(accounts);
}

const upgradeAccount = async (req, res) => {
    try {
        const { id } = req.body;
        const account = await User.findById(id);
        const user = {
            role:(account.role === "USER")? "ADMIN":"USER"
        }
        await User.findByIdAndUpdate(id, user);
        res.status(201).json({ message: "User Upgraded" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" }); 
    }
}

const searchAccount = async (req, res) => {
    try {
        const { email } = searchUserSchema.parse(
            req.body
        );

        const account = await User.findOne({ email });

        if(!account){
          return  res.status(422).json({ message: "This user does not exist in the system" });
        }

        res.status(201).json(account);
        
    } catch (error) {
        console.log(error);

        if (error instanceof z.ZodError) {
            const { message } = error.errors[0];
            return res.status(422).json({ message: `Validation Error: ${message}` });
        }

        res.status(500).json({ message: "Internal Server Error" }); 
    }
}

const updateAccount = async (req, res) => {
    try {
        const {id ,email, fullName, address, phoneNumber } = userUpdateSchema.parse(
            req.body
        );

        const user = {
            email,
            fullName,
            address,
            phoneNumber,
        };
        
        await User.findByIdAndUpdate(id, user);
        res.status(201).json({ message: "User Updated" });

    } catch (error) {
        console.error(error);

        if (error instanceof z.ZodError) {
            const { message } = error.errors[0];
            return res.status(422).json({ message: `Validation Error: ${message}` });
          }
          res.status(500).json({ message: "Internal Server Error" });
    }
}

const deleteAccount = async (req, res) => {
    try {
        const { id } = req.body;
        await User.findByIdAndDelete(id);
        res.status(201).json({ message: "User Deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    updateAccount,
    upgradeAccount,
    deleteAccount,
    getAllAccounts,
    searchAccount
};