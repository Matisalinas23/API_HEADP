import express from "express"
import { createCategorie, getCategories } from "../controllers/categoriesControllers"
import { authMiddleware } from "../middlewares/authMiddleware"

const router = express.Router()

router.post('/',authMiddleware, createCategorie)
router.get('/', getCategories)

export default router