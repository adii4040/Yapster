import dotenv from 'dotenv'
dotenv.config()

import express  from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()

app.use(cors())

app.use(express.json({ limit:'16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))
app.use(cookieParser())


//import the routes here
import healtCheckRoute from './Routes/healthCheck.route.js'
import userRoutes from './Routes/user.route.js'



app.use('/api/v1/healthcheck', healtCheckRoute)
app.use('/api/v1/user', userRoutes)

export { app }
