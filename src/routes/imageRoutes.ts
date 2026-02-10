import express from "express"
import { getImages, updateImage } from "../controllers/imageControllers.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get('/', getImages)
router.put('/:id',authMiddleware, updateImage)

export default router