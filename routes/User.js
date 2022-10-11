const express = require('express')
const router = express.Router()

// Post Method
router.post('/user/signup', (req, res) => {
    res.status(201).send("User is created")
})

router.post('/emp/employees', (req, res) => {
    res.status(201).send("create new employee")
})

router.post('/user/login', (req, res) => {
    res.status(200).send("Logged In")
})

// Get Method
router.get('/emp/employees', (req, res) => {
    res.status(200).send("All employees")
})

// Get user by employee ID
router.get('/emp/employees/:id', (req, res) => {
    res.status(200).send("Employee by ID")
})

// Put method updating employees
router.put('/emp/employees/:id', (req, res) => {
    res.status(200).send("Updated")
})

// Delete method
router.delete('/emp/employees/:id', (req, res) => {
    res.status(200).send("Deleted")
})






module.exports = router