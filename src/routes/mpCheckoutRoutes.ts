import express from 'express';
import { createPreferenceId } from '../controllers/mpCheckoutControllers';

const router = express.Router()

router.post('/createPreferenceId', createPreferenceId)

export default router;