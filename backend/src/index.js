import express from 'express'
import morgan from 'morgan'

import{ connectDB } from './db.js'
import authRoutes from "./routes/auth.routes.js"

const app = express()
app.use(morgan('dev'))
app.use(express.json())
connectDB()
app.use('/api',authRoutes)

app.listen(4500)
console.log('servidor corriendo', 4500)