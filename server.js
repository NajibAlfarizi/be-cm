import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

// Inisialisasi dotenv
dotenv.config()

// Koneksi ke MongoDB
connectDB()

// Inisialisasi app
const app = express()


// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json()) // untuk menerima data JSON
app.use(morgan('dev')) // untuk log request ke console
app.use("/uploads", express.static(path.join(path.resolve(), "/uploads"))); // untuk mengakses file statis di folder uploads

// Routes dasar untuk test
app.get('/', (req, res) => {
  res.send('API ChiCha Mobile CRM berjalan... 🚀')
})

// Import routes
import authRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'

// Gunakan routes
app.use('/api/auth', authRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)

// Middleware error handling
app.use(notFound)
app.use(errorHandler)

// Jalankan server
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di mode ${process.env.NODE_ENV} di port ${PORT}`)
})
