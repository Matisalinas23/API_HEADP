import dotenv from 'dotenv'
import express from 'express'

import cors from "cors"
import { corsOrigin } from './services/allowedOrigins.service.js'
import cookieParser from 'cookie-parser';
import { addressRoutes, authRoutes, cartItemRoutes, categoryRoutes, imageRoutes, mpCheckoutRoutes, productRoutes, profileIconRoutes, salesRoutes, userRoutes } from './routes/index.js';

dotenv.config()

const app = express()
app.use(express.json())

app.use(cors({
  origin: corsOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  
}));

app.use(cookieParser());

// Routes
app.use('/auth', authRoutes)
app.use('/address', addressRoutes)
app.use('/users', userRoutes)
app.use('/profile_icons', profileIconRoutes)
app.use('/categories', categoryRoutes)
app.use('/products', productRoutes)
app.use('/images', imageRoutes)
app.use('/cartItems', cartItemRoutes)
app.use('/mpCheckouts', mpCheckoutRoutes)
app.use('/sales', salesRoutes)


export default app