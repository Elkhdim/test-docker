const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({

    full_name : {
        type: String,
        max : 255 ,
        min : 6,
        required : true
        
    },
    email : {
        type: String,
        max : 255 ,
        min : 6,
        required : true
        
    },
    password : {
        type: String,
        max : 255 ,
        min : 6,
        required : true
        
    }
   
});

module.exports = mongoose.model('User',userSchema);