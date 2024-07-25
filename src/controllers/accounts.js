const User = require("../modules/User");
const { userUpdateSchema, searchUserSchema , upgradeSchema } = require("../lib/validators/user");
const { z } = require("zod");

const getAllAccounts = async (req, res) => {
    const accounts = await User.find();
    res.status(200).json(accounts);
}

const showUpdateForm = async (req, res)=>{
    try {
        const { id } = upgradeSchema.parse(
            req.params
        );

        const account = await User.findById(id);

        if(!account){
            return res.status(204).json({message: "Account not found system"})
        }

        res.status(200).render('accountForm', {account})
    } catch (error) {
        if (error instanceof z.ZodError) {
            const { message } = error.errors[0];
            return res.status(422).json({ message: `Validation Error: ${message}` });
        }

        res.status(500).json({ message: "Internal Server Error" }); 
    }
}

const upgradeAccount = async (req, res) => {
    try {
        const { id } = upgradeSchema.parse(
            req.body
        );
        const account = await User.findById(id);

        if(!account){
            return res.status(204).json({message: "Account not found system"})
        }

        const user = {
            role:(account.role === "USER")? "ADMIN":"USER"
        }
        await User.findByIdAndUpdate(id, user);
        res.status(200).json({ message: "User Upgraded" });

    } catch (error) {
        console.log(error);

        if (error instanceof z.ZodError) {
            const { message } = error.errors[0];
            return res.status(422).json({ message: `Validation Error: ${message}` });
        }

        res.status(500).json({ message: "Internal Server Error" }); 
    }
}

const searchAccount = async (req, res) => {
    try {
        const { address } = searchUserSchema.parse(
            req.body
        );

        const accounts = await User.find({ address });

        if(!accounts){
          return  res.status(404).json({ message: "This user does not exist in the system" });
        }

        res.status(200).json(accounts);
        
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
        
        const data = await User.findByIdAndUpdate(id, user);

        if(data === null){
            return res.status(204).json({message: "Updated feild"})
        }

        res.status(200).json({ message: "User Updated" });

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
        const { id } = upgradeSchema.parse(
            req.body
        );

        const data = await User.findByIdAndDelete(id);

        if(data === null){
            return res.status(204).json({message: "Deleted feild"})
        }

        res.status(200).json({ message: "User Deleted" });
    } catch (error) {
        console.error(error);

        if (error instanceof z.ZodError) {
            const { message } = error.errors[0];
            return res.status(422).json({ message: `Validation Error: ${message}` });
        }

        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    updateAccount,
    upgradeAccount,
    deleteAccount,
    getAllAccounts,
    searchAccount,
    showUpdateForm
};