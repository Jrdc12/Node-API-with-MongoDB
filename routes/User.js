require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../model/UserModel')
const jwt = require('jsonwebtoken')




// Post Method
router.post('/user/signup', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    user.password = await bcrypt.hash(user.password, 10)

    try {
        const oldUser = await User.findOne({ username: req.body.username })
        if (oldUser) {
            return res.status(409).json({
                message: "User already exists"
            })
        }

        const savedUser = await user.save()

        const token = jwt.sign(
            {
                username: savedUser.username,
                email: savedUser.email,
            }, process.env.TOKEN_SECRET, { expiresIn: '1h' }
        )
        
        savedUser.token = token
        res.header("Access-Control-Allow-Origin", "*");
        res.status(201).send({
            "message": "User created successfully",
            user: savedUser
        })

    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Login Method
router.post('/user/login', async (req, res) => {
    try {

        const {
            username,
            password
        } = req.body;
        
        const user = await User.findOne({
            username: username
        })
        

        if (user) {
            const auth = await bcrypt.compare(password, user.password)
            if (auth) {
                //create token
                const token = jwt.sign(
                    {
                        username: user.username,
                        email: user.email,
                    }, process.env.TOKEN_SECRET, { expiresIn: '1h' }
                )
                user.token = token

                res.status(200).json({
                    "status": true,
                    "username": user.username,
                    "message": "User logged in successfully",
                    "token": token
                })
            } else {
                res.status(400).json({
                    status: false,
                    message: "Invalid username or password"
                })
            }
        } else {
            res.status(400).json({
                status: false,
                message: "Invalid UserName or Password"
            })
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


module.exports = router