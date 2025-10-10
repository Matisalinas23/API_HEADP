import express from 'express'
import { clearSales, getAllSales } from '../controllers/saleControllers'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = express.Router()

router.get('/', authMiddleware, getAllSales)
router.delete('/', authMiddleware, clearSales)

export default router;