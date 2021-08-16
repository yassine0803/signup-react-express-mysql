import express from 'express';
import { uploadImage, editProfileImage, getUserGallery, editProfileGallery } from '../controllers/images.js';
import uploadMiddleware from '../middleware/upload.js';


const router = express.Router();


router.post('/upload', uploadMiddleware.single('file'), uploadImage);
router.get('/gallery/user/:userId', getUserGallery);
router.post('/edit-profile-image/:name', uploadMiddleware.single('file'), editProfileImage);
router.post('/edit-gallery-image/:name', uploadMiddleware.single('file'), editProfileGallery);

export default router;