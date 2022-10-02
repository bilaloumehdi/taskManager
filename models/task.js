const mongoose = require('mongoose') 

const taskSchema = new mongoose.Schema({
    // validation 
    name:{
        type:String ,
        required:[true,'must provide a name'] ,
        trim:true,
        maxlength:[30,'must be less than 30 characters']
    },
    completed: {
        type:Boolean ,
        default: false,
    }
})

module.exports = mongoose.model('task',taskSchema) 