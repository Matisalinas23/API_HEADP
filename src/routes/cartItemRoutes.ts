import express from 'express'
import { createCartItem, deleteCartItem, getCartItemsByUser } from '../controllers/cartItemController'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = express.Router()

router.post('/:userId/:productId', authMiddleware, createCartItem)
router.get('/:id', authMiddleware, getCartItemsByUser)
router.delete('/:id', authMiddleware, deleteCartItem)

export default router