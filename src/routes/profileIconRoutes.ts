import express from "express"
import multer from "multer"
import { createProfileIcon, deleteProfileIcon, getAllProfileIcons } from "../controllers/profileIconControllers"
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router()
const upload = multer({ dest: "uploads/" }); // Carpeta temporal

router.post("/", authMiddleware, upload.single("image"), createProfileIcon);
router.get("/", authMiddleware, getAllProfileIcons)
router.delete("/:id", authMiddleware, deleteProfileIcon)

export default router;