import express from 'express';
import { addProfileIcon, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/userControllers';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById); // Note: This should likely be getUserById instead of getAllUsers
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.put("/add_profile_icon/:id", addProfileIcon);

export default router;
