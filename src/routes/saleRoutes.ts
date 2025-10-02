import express from 'express'
import { getAllSales } from '../controllers/saleControllers'

const router = express.Router()

router.get('/', getAllSales)

export default router;