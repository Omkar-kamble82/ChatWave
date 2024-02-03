require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const authRoute = require('./routes/authRoutes')

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoute);

mongoose.set('strictQuery', true).connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to database')
        app.listen(process.env.PORT, () => {
            console.log('listening for requests on port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
}) 
