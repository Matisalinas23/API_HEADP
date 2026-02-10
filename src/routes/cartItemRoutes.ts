import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { createCartItem, deleteCartItem, getCartItemsByUser } from '../controllers/cartItemController.js'

const router = express.Router()

router.post('/:userId/:productId', authMiddleware, createCartItem)
router.get('/:id', authMiddleware, getCartItemsByUser)
router.delete('/:id', authMiddleware, deleteCartItem)

export default router