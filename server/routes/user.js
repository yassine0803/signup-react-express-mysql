import express from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModal from "../models/user.js";
const router = express.Router();

const secret = 'test';

router.post('/signup', async (req, res) => {
    const { password } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserModal.create({ ...req.body, password: hashedPassword });

        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

        console.log(error);
    }
});

router.post('/check-user', (req, res) => {
    const username = req.body;
    try {
        const oldUser = await UserModal.findOne({ username });

        if (oldUser) return res.status(400).json({ message: "Username already exists" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
})
export default router;