import express from 'express'
import { clearSales, getAllSales } from '../controllers/saleControllers'

const router = express.Router()

router.get('/', getAllSales)
router.delete('/', clearSales)

export default router;