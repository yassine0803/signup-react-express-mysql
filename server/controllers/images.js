import {sqldb} from '../config/index.js';
import { unlinkSync } from 'fs';
import path from 'path';
const __dirname = path.resolve();
export const uploadImage = async (req, res) => {
    const {filename} = req.file;
    return res.json({
        filename
    });
}

export const editProfileImage = async (req, res) => {
    const { name } = req.params;
    const {filename} = req.file;
    let sql = `UPDATE users SET profileImg = ? where profileImg = ?`;
    unlinkSync(`${__dirname}/public/uploads/${name}`);
    try {
        sqldb.query(sql, [filename, name], (err, rows)=>{
            res.status(201).json({filename});
        })
    } catch (error) {
        console.log(error);
    }
}

export const getUserGallery = async (req, res) => {
    const { userId } = req.params;
    let sql = `SELECT image FROM galleryImg where user_id = ?`;
    sqldb.query(sql, [userId],(err, rows) => {
        if (err) throw err;
        res.status(200).json(rows);
    })
}

export const editProfileGallery = async(req, res) => {
    const { name } = req.params;
    const {filename} = req.file;
    const sql = `UPDATE galleryImg SET image = ? where image = ?`;
    unlinkSync(`${__dirname}/public/uploads/${name}`);
    try {
        sqldb.query(sql, [filename, name], (err, rows)=>{
            res.status(201).json({filename});
        })
    } catch (error) {
        console.log(error);
    }
}