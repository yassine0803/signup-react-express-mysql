import express from 'express';
import { uploadImage, editProfileImage, getUserGallery, editProfileGallery } from '../controllers/images.js';
import uploadMiddleware from '../middleware/upload.js';
import {auth} from '../middleware/auth.js';

const router = express.Router();


router.post('/upload', uploadMiddleware.single('file'), uploadImage);
router.get('/gallery/user/:userId', auth, getUserGallery);
router.post('/edit-profile-image/:name', auth, uploadMiddleware.single('file'), editProfileImage);
router.post('/edit-gallery-image/:name', auth, uploadMiddleware.single('file'), editProfileGallery);

export default router;