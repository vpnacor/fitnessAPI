const Workout = require('../models/Workout');





module.exports.addWorkout = (req, res) => {

            let newWorkout = new Workout({           
                    name: req.body.name,
                    duration: req.body.duration,
                    userId: req.user.id
                
            });

            return newWorkout.save().then(result => {
                return res.status(201).send({
                    userId:result.userId,
                    name: result.name,
                    duration:result.duration,
                    status: result.status,
                    _id:result._id,
                    dateAdded:result.dateAdded,
                    __v: result.__v
                    
                })
            })
            .catch(err => errorHandler(err, req, res));
        
    
}


module.exports.getMyWorkout = (req, res) => {
    return Workout.find({userId: req.user.id})
        .then(result => {
            if(result.length === 0 ){
                return res.status(404).send({
                    message: 'No Workout found'
                })
            } else {
                return res.status(200).send({
                    workouts:result.map(w => ({
                    _id:w._id,
                    userId:w.userId,
                    name: w.name,
                    duration:w.duration,
                    status: w.status,
                    dateAdded:w.dateAdded,
                    __v: w.__v
                    }))
                })
            }
        })
        .catch(err => errorHandler(err, req, res));
}


module.exports.updateWorkout = (req, res) => {
    return Workout.findById(req.params.id)
        .then(result => {

            if(!result){
                return res.status(404).send({
                    message: 'Workout not Found'
                })
            } else {

                result.name = req.body.name || result.name;
                result.duration = req.body.duration || result.duration;

                return result.save();
            }

        }).then(updatedWorkout => {
            return res.status(200).send({
                message:'Workout updated successfully',
                updatedWorkout: {
                    _id:updatedWorkout._id,
                    userId:updatedWorkout.userId,
                    name: updatedWorkout.name,
                    duration:updatedWorkout.duration,
                    status: updatedWorkout.status,
                    dateAdded:updatedWorkout.dateAdded,
                    __v: updatedWorkout.__v
                }
            })
        })
        .catch(err => errorHandler(err, req, res));
}

module.exports.deleteWorkout = (req, res) =>{
    return Workout.findByIdAndDelete(req.params.id)
        .then(result => {
            return res.status(200).send({
                message: "Workout deleted successfully"
            })
        })
        .catch(err => errorHandler(err, req, res));
}

