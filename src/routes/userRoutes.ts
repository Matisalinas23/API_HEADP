import express from 'express';
import { addProfileIcon, deleteUser, getAllUsers, getUserByEmail, getUserById, updateUser, updateuserAddress } from '../controllers/userControllers';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.put('/update_address/:id', authMiddleware, updateuserAddress)
router.put("/add_profile_icon/:id", authMiddleware, addProfileIcon);

router.get('/:email', getUserByEmail);
router.get('/', getAllUsers);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

export default router;
