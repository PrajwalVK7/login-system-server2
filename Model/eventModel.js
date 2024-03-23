const mongoose=require('mongoose');


const eventSchema = new mongoose.Schema({

    title:{
        type:String,
        require:true,
        unique:true
    },
    description:{
        type:String,
        require:true,
    },
    file:{
        type:String,
        require:true,
    },
    days:{
        type:Number,
        require:true,
    },
    dob:{
        type:String,
        require:true,
    },
    scheme:{
        type:String,
        require:true,
    },
    category:{
        type:String,
        require:true,
    }

})


const events = mongoose.model('events',eventSchema);
module.exports = events;