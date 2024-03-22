const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,

    },
    address:{
        type:String,
        require:true,
    },
    gender:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:true,
        unique: true
    },
    password:{
        type:String,
        require:true,
    }
})


const users = mongoose.model('users',userSchema);
module.exports = users;