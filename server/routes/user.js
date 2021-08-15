import express from "express";
const router = express.Router();
import {signup, checkUser, getUser, editUser} from '../controllers/users.js';

router.post('/signup', signup);
router.post('/check-user', checkUser)
router.get('/:id', getUser)
router.patch('/:id', editUser)


export default router;

