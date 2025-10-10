import express from 'express';
import { addProfileIcon, deleteUser, getAllUsers, getUserByEmail, getUserById, updateUser } from '../controllers/userControllers';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/:email', getUserByEmail);
router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);
router.put("/add_profile_icon/:id", authMiddleware, addProfileIcon);

export default router;
