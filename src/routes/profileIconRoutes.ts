import express from "express"
import multer from "multer"
import { createProfileIcon, deleteProfileIcon, getAllProfileIcons } from "../controllers/profileIconControllers"

const router = express.Router()
const upload = multer({ dest: "uploads/" }); // Carpeta temporal

router.post("/", upload.single("image"), createProfileIcon);
router.get("/", getAllProfileIcons)
router.delete("/:id", deleteProfileIcon)

export default router;