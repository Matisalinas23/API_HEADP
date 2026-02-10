import express from "express"
import { createCategorie, getCategories } from "../controllers/categoriesControllers.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post('/',authMiddleware, createCategorie)
router.get('/', getCategories)

export default router