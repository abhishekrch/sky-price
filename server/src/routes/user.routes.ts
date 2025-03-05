
import express from 'express';
import { getProfile, updateProfile } from '../controllers/user.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/me', protect, getProfile);
router.put('/me', protect, updateProfile);

export default router;
