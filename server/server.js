import dotenv from "dotenv";
import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoute from './routes/authRoutes.js'
import messageRoute from './routes/messageRoutes.js'
import { app, server } from "./socket/socket.js"

dotenv.config();

app.use(express.json())
app.use(cookieParser())

const allowedOrigins = [
    process.env.CLIENT,
    process.env.LOCAL,
]
var corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true
}    

app.use(cors(corsOptions));

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

mongoose.set('strictQuery', true).connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to database')
        server.listen(process.env.PORT, () => {
            console.log('listening for requests on port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
}) 

export { app }