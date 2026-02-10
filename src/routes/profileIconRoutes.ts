import express from "express"
import multer from "multer"
import { createProfileIcon, deleteProfileIcon, getAllProfileIcons, getProfileIconById, getProfileIconByUserId, updateProfileIcon } from "../controllers/profileIconControllers.js"
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router()
const upload = multer({ dest: "uploads/" }); // Carpeta temporal

router.get("/get_by_user_id/:id", authMiddleware, getProfileIconByUserId)

router.get("/:id", authMiddleware, getProfileIconById)
router.delete("/:id", authMiddleware, deleteProfileIcon)

router.post("/", authMiddleware, upload.single("image"), createProfileIcon);
router.get("/", authMiddleware, getAllProfileIcons)
router.put("/:id", updateProfileIcon)

export default router;