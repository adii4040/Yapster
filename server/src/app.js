import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()

app.use(cors({
    origin: process.env.BASE_CLIENT_URL,
    credentials: true
}))

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))
app.use(cookieParser())


//import the routes here
import healtCheckRoute from './Routes/healthCheck.route.js'
import userRoutes from './Routes/user.route.js'
import messageRoutes from './Routes/message.route.js'


app.use('/api/v1/healthcheck', healtCheckRoute)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/message', messageRoutes)


// Global error handler (must come after all routes)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        statusCode: statusCode,
        success: false,
        message,
        errors: err.errors || [],
        data: null,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
});


export { app }
