import express from "express"
import { createCategorie, getCategories } from "../controllers/categoriesControllers"

const router = express.Router()

router.post('/', createCategorie)
router.get('/', getCategories)

export default router