const jwt = require('jsonwebtoken')

const users = require('../Model/userSchema');



exports.registerUser = async (req, res) => {

    const { name, address, gender, username, password } = req.body;



    try {

        const existingUser = await users.findOne({ username });

        if (existingUser) {
            res.status(406).json("Username already exists, please login or create use another")
        }
        else {
            const newUser = new users({
                name,
                address,
                gender,
                username,
                password
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
    console.log(req.body)

    const { username, password } = req.body;

    try {
        console.log("inside login")
        const existingUser = await users.findOne({ username, password })

        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.SECRET_KEY);
            console.log(token);
            return res.status(200).json({token });
        }
        else {
            res.status(406).json("Invalid username or Password");
        }

    }
    catch (err) {
        console.log(err)
        res.status(401).json(err)

    }
}