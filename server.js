import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import connectDB from './config/db.js'
// import { notFound, errorHandler } from './middleware/errorMiddleware.js'

// Inisialisasi dotenv
dotenv.config()

// Koneksi ke MongoDB
connectDB()

// Inisialisasi app
const app = express()

// Middleware
app.use(cors())
app.use(express.json()) // untuk menerima data JSON
app.use(morgan('dev')) // untuk log request ke console

// Routes dasar untuk test
app.get('/', (req, res) => {
  res.send('API ChiCha Mobile CRM berjalan... 🚀')
})

// Middleware error handling
// app.use(notFound)
// app.use(errorHandler)

// Jalankan server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di mode ${process.env.NODE_ENV} di port ${PORT}`)
})
