import express from "express"
import { getImages, updateImage } from "../controllers/imageControllers"

const router = express.Router()

router.get('/', getImages)
router.put('/:id', updateImage)

export default router