import express from 'express'
import morgan from 'morgan'

import { connectDB } from './db.js'
import productRoutes from "./routes/productroutes.js"
import purchaseRoutes from "./routes/purchaseroutes.js" 

const app = express()
app.use(morgan('dev'))
app.use(express.json())

connectDB()

app.use('/api', productRoutes)
app.use('/api', purchaseRoutes)   

app.listen(4500, () => {
  console.log('Servidor corriendo en http://localhost:4500')
})
