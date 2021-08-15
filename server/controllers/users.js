
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModal from "../models/user.js";

const secret = 'test';

export const signup = async (req, res) => {
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
}

export const checkUser = async (req, res) => {
    console.log(req.body);
    const { username } = req.body;
    try {
        const oldUser = await UserModal.findOne({ username });

        if (oldUser) return res.json({ message: "Username already exists" });
        res.status(201).json({ message: "new user" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await UserModal.findById(id).select({"password": 0});
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const editUser = async (req, res) => {
    const { id } = req.params;

    const result = await UserModal.findByIdAndUpdate(id, {...req.body}, {new: true})
 
    res.json(result);
}