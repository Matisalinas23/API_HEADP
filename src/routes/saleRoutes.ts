import express from 'express'
import { clearSales, getAllSales } from '../controllers/saleControllers.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', authMiddleware, getAllSales)
router.delete('/', authMiddleware, clearSales)

export default router;