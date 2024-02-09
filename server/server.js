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

if (!process.env.MONGO_URI) {
    throw new Error('Missing required environment variable: MONGO_URI');
}

if (!process.env.CLIENT) {
    throw new Error('Missing required environment variable: CLIENT');
}

if (!process.env.LOCAL) {
    throw new Error('Missing required environment variable: LOCAL');
}

const allowedOrigins = [
    process.env.CLIENT,
    process.env.LOCAL,
]
const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200,
    credentials: true
};   

app.use(cors(corsOptions));

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

mongoose.set('strictQuery', true).connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to the database');
        server.listen(process.env.PORT, () => {
            console.log('Server is listening for requests on port', process.env.PORT);
        });
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
});

export { app, server }