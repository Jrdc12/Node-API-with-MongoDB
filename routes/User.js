const express = require('express')
const router = express.Router()
const User = require('../model/UserModel')



// Post Method
router.post('/user/signup', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const savedUser = await user.save()
        res.status(201).send(savedUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Login Method
router.post('/user/login', async (req, res) => {

    const {
        username,
        password
    } = req.body;
    
    const user = await User.findOne({
        username: username
    })
 
    if (user) {
        if (user.password === password) {
            res.status(200).json({"username" : user.username, "password": user.password})
        } 
    } else {
        res.status(400).json({
            "status": false,
            "message": "Invalid UserName or Password"
        })
    }
})


module.exports = router