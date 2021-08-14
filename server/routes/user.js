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

router.post('/check-user', async (req, res) => {
    console.log(req.body);
    const { username } = req.body;
    try {
        const oldUser = await UserModal.findOne({ username });

        if (oldUser) return res.json({ message: "Username already exists" });
        res.status(201).json({ message: "new user" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
})


//get user info
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const data = await UserModal.findById(id).select({"password": 0});
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})
export default router;

