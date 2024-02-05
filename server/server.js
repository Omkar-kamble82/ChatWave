require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const authRoute = require('./routes/authRoutes')
const messageRoute = require('./routes/messageRoutes')

const app = express()

app.use(express.json())
app.use(cookieParser())

const allowedOrigins = [
    process.env.CLIENT,
    process.env.LOCAL
]
var corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}    

app.use(cors(corsOptions));

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

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
