import express from 'express';
import { addProfileIcon, deleteUser, getAllUsers, getUserByEmail, getUserById, updateUser, updateuserAddress } from '../controllers/userControllers';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.put('/update_address/:id', authMiddleware, updateuserAddress)
router.put("/add_profile_icon/:id", authMiddleware, addProfileIcon);
router.get('/get_by_email/:email', getUserByEmail);

router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

router.get('/', getAllUsers);

export default router;
