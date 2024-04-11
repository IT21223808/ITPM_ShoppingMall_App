const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    },
    gender:{
       type:String,
       required:true 
    },
    dateOfBirth:{
        type:Date,
        required:true
    },
    phoneNumber:{
        type:String,
    },
    address:{
        type:String,
    },
    isadmin:{
        type:String
    }

},
{
    timestamp:true,
})

const User = mongoose.model("User",userSchema);

module.exports = User;