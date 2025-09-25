import express from 'express';
import { deleteAddress, getAllAddress } from '../controllers/addressControlles';

const router = express.Router();

// create address
router.get('/', getAllAddress)
router.delete('/:id', deleteAddress)

export default router;