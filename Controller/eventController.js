const events = require('../Model/eventModel')
const users = require('../Model/userSchema')
const bcrypt= require('bcrypt')



exports.registerEvent = async(req,res)=>{
    const userId = req.payload;
    const file = req.file.filename;
    

    try{
        const {title,description,days,dob,scheme,category,password,email} = req.body;

        const existingUser = await users.findById(userId)
        console.log(existingUser)
        if(existingUser){
            const isPasswordValid = await bcrypt.compare(password, existingUser.password);
            console.log(isPasswordValid)
            if(isPasswordValid){
                const eventData = new events({
                    title,
                    description,
                    email,
                    file,
                    days,
                    dob,
                    scheme,
                    category,
                    
                })
                await eventData.save();
                res.status(200).json("content submitted")
            }
            else{
                res.status(406).json("Invalid password, please enter the password you have created while login / signup")
            }

        }
        
    }
    catch(err){
        console.log(err)
        res.status(401).json(err)
    }
}