import express from 'express';
import { createPreferenceId } from '../controllers/mpCheckoutControllers.js';
import { webhook } from '../controllers/mpCheckoutControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router()

router.post('/createPreferenceId', authMiddleware, createPreferenceId)
router.post('/webhook/:stock', authMiddleware, webhook)

export default router;