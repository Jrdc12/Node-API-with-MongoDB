const express = require('express')
const router = express.Router()
const Employee = require('../model/EmployeesModel')

// Post Method
router.post('/emp/employees', async (req, res) => {
    const employee = new Employee({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        salary: req.body.salary
    })

    try {
        const savedEmployee = await employee.save()
        res.status(201).send(savedEmployee)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Get Method
router.get('/emp/employees', async (req, res) => {
    try {
        const employees = await Employee.find()
        res.status(200).json(employees)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})



module.exports = router