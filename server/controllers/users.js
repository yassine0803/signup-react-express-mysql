
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {sqldb} from '../config/index.js';

const secret = 'test';

export const signup = async (req, res) => {
    const {name, username, email, password, profileImg, galleryImg } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 12);
        const sql = `INSERT INTO users (name, username, profileImg, email, password) VALUES ('${name}','${username}','${profileImg}','${email}','${hashedPassword}')`;
        sqldb.query(sql,(err,user)=>{
            if(err) throw err;
            galleryImg.forEach((imageName, index) => galleryImg[index] = [user.insertId, imageName]);
            const sql = 'INSERT INTO galleryImg (user_id, image) VALUES ?';
            sqldb.query(sql, [galleryImg]);
            const token = jwt.sign({ email: email, id: user.insertId}, secret, { expiresIn: "1h" });
            res.status(201).json({ userId:user.insertId,token });
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const checkUser = async (req, res) => {
    const { username } = req.body;
    try {
        let sql = `SELECT * FROM users where username = '${username}'`;
        sqldb.query(sql, (err, rows) => {
            if(err) throw err;
            if (rows.length) return res.json({ message: "Username already exists" });
            res.status(201).json({ message: "new user" });
        })
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