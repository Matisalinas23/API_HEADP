import express from "express"
import { getImages, updateImage } from "../controllers/imageControllers"
import { authMiddleware } from "../middlewares/authMiddleware"

const router = express.Router()

router.get('/', getImages)
router.put('/:id',authMiddleware, updateImage)

export default router