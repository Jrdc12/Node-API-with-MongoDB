const express = require('express')
const router = express.Router()
const Employee = require('../model/EmployeesModel')

//COMMENT

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
        const oldEmployee = await Employee.findOne({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
        })

        if (oldEmployee) {
            return res.status(409).json({
                message: "Employee already exists"
            })
        }

        const savedEmployee = await employee.save()
        res.status(201).send(savedEmployee)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Get Method

// this gets all employees
router.get('/emp/employees', async (req, res) => {
    try {
        const employees = await Employee.find()
        res.status(200).json(employees)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/emp/employees/:id', async (req, res) => {
    try {
        const employee = req.body
        const employeeId = await Employee.findById(req.params.id)
        res.status(200).json(employeeId)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

// PUT Method
router.put('/emp/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)

        if (req.body.first_name != null) {
            employee.first_name = req.body.first_name
        }
        if (req.body.last_name != null) {
            employee.last_name = req.body.last_name
        }
        if (req.body.email != null) {
            employee.email = req.body.email
        }
        if (req.body.gender != null) {
            employee.gender = req.body.gender
        }
        if (req.body.salary != null) {
            employee.salary = req.body.salary
        }
        const updatedEmployee = await employee.save()
        res.status(200).json(updatedEmployee)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Delete Method
router.delete('/emp/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)
        const deletedEmployee = await employee.remove()
        res.status(200).json({message: "Employee Deleted"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router