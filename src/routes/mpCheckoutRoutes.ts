import express from 'express';
import { createPreferenceId } from '../controllers/mpCheckoutControllers';
import { webhook } from '../controllers/mpCheckoutControllers';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router()

router.post('/createPreferenceId', authMiddleware, createPreferenceId)
router.post('/webhook/:stock', authMiddleware, webhook)

export default router;