const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { createAccessToken, errorHandler } = require('../auth');




module.exports.userRegister = (req, res) => {
    if (!req.body.email || !req.body.email.includes('@')){
        return res.status(400).send({
            message:'Email Invalid'
        })
    }

    if(!req.body.password || req.body.password.length < 8){
      return  res.status(400).send({
            message:'Password must be atleast 8 characters'
        })
    }

    return User.findOne({email: req.body.email})
        .then(result => {
            if (result){
        return res.status(409).send({
                success: false,
                message: 'Duplicate email found'
            })} 



            let newUser = new User({
                email:req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
            })

            return newUser.save().then(savedUser => {
             return res.status(201).send({
                    message:'Registered Successfully'
                })
            })
        })
            .catch(err => errorHandler(err, req, res));

}

module.exports.userLogin = (req, res) => {
    if(req.body.email.includes('@')){
        return User.findOne({email: req.body.email}).
        then(result => {
            if(result === null){
                return res.status(404).send({message: 'No email found'})
            } else {
                const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password)

                if (isPasswordCorrect){
                    return res.status(200).send({
                        access: createAccessToken(result)
                    })
                } else {
                    return res.status(401).send({
                        message: 'Email and Password does not match'
                    })
                }
            }
        }) 
        .catch(err => errorHandler(err, req, res));
    } else {
        return res.status(401).send({
            message:'Invalid Email'
        })
    }
    
}


module.exports.userDetails = (req, res) => {
    return User.findById(req.user.id).select('-password')
        .then(result => {
            
            if (!result){
                return res.status(404).send({
                    message:'User not found'
                })
            } else {
                return res.status(200).send({
                    user:{
                        result
                    }
                })
            }



        })
            .catch(err => errorHandler(err, req, res));
}