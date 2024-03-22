const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const users = require('../Model/userSchema');



exports.registerUser = async (req, res) => {

    const { name, address, gender, username, password } = req.body;



    try {

        const existingUser = await users.findOne({ username });

        if (existingUser) {
            res.status(406).json("Username already exists, please login or create use another")
        }
        else {
            const hashedPassword =await bcrypt.hash(password,10);
            const newUser = new users({
                name,
                address,
                gender,
                username,
                password:hashedPassword
            })
            await newUser.save();
            res.status(200).json('User signup successfull')
        }

    }
    catch (err) {
        res.status(401).json(err)
    }
}


exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await users.findOne({ username });

        if (!existingUser) {
            return res.status(406).json("Invalid username or password");
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (isPasswordValid) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.SECRET_KEY);
            return res.status(200).json({ token });
        } else {
            return res.status(406).json("Invalid username or password");
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json("Internal Server Error");
    }
}



exports.editPassword = async(req,res)=>{
    const userId = req.payload;
    console.log(userId)

    // try{
    // }
    // catch(err){
    //     res.status(401).json(err)

    // }
}