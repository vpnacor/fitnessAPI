const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({

    
    name:{
        type:String ,
        required:[true, 'Name input is Required']
    },

    duration:{
        type:String,
        required:[true, 'Duration is required']
    },

    userId:{
        type:String,
        required:[true, 'User ID is required']
    },
    dateAdded: {
         type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'Pending'
    }

})

module.exports = mongoose.model('Workout', workoutSchema)