import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

// First log the env var to check if it's set
console.log("BASE_CLIENT_URL:", process.env.BASE_CLIENT_URL)

// DEBUG: log all route/middleware registrations
const originalUse = app.use
app.use = function (path, ...handlers) {
  console.log("app.use() path:", path)
  return originalUse.apply(this, arguments)
}
const originalGet = app.get
app.get = function (path, ...handlers) {
  console.log("app.get() path:", path)
  return originalGet.apply(this, arguments)
}

// Now apply your middleware
app.use(cors({
  origin: process.env.BASE_CLIENT_URL,
  credentials: true
}))

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))
app.use(cookieParser())

// Import routes
import healtCheckRoute from './Routes/healthCheck.route.js'
import userRoutes from './Routes/user.route.js'
import messageRoutes from './Routes/message.route.js'

// Mount routes
app.use('/api/v1/healthcheck', healtCheckRoute)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/message', messageRoutes)

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"

  return res.status(statusCode).json({
    statusCode: statusCode,
    success: false,
    message,
    errors: err.errors || [],
    data: null,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  })
})

export { app }
