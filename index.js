require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString)
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database is connected')
})

const app = express()
app.use(express.json()) // for parsing application.json
const port = 3000

const userRoute = require('./routes/User')
app.use('/api', userRoute)

app.get('/api', (req, res) => {
    res.send("HOME!")
})







app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})