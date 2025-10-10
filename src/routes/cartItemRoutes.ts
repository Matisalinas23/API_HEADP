import express from 'express'
import { createCartItem, getCartItemsByUser } from '../controllers/cartItemController'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = express.Router()

router.post('/:userId/:productId', authMiddleware, createCartItem)
router.get('/:id', authMiddleware, getCartItemsByUser)

export default router