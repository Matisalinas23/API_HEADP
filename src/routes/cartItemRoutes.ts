import express from 'express'
import { createCartItem, getCartItemsByUser } from '../controllers/cartItemController'

const router = express.Router()

router.post('/:userId/:productId', createCartItem)
router.get('/:id', getCartItemsByUser)

export default router