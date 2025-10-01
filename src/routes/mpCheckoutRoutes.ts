import express from 'express';
import { createPreferenceId } from '../controllers/mpCheckoutControllers';
import { webhook } from '../controllers/mpCheckoutControllers';

const router = express.Router()

router.post('/createPreferenceId', createPreferenceId)
router.post("/webhook", webhook)

export default router;