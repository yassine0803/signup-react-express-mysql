import express from 'express';
import { baseURL } from '../config/index.js';
import uploadMiddleware from '../middleware/upload.js';


const router = express.Router();


router.post('/upload', uploadMiddleware.single('file'), async (req, res) => {
    console.log(req);
    const {filename} = req.file;
    return res.json({
        filename
    });
});

export default router;