import {sqldb} from '../config/index.js';


export const uploadImage = async (req, res) => {
    const {filename} = req.file;
    return res.json({
        filename
    });
}

export const editProfileImage = async (req, res) => {
    const { name } = req.params;
    const {filename} = req.file;
    const sql = ``;
}

export const getUserGallery = async (req, res) => {
    const { userId } = req.params;
    let sql = `SELECT image FROM galleryImg where user_id = '${userId}'`;
    sqldb.query(sql, (err, rows) => {
        if (err) throw err;
        res.status(200).json(rows);
    })
}

export const editProfileGallery = async(req, res) => {
    const { name } = req.params;
    const {filename} = req.file;
    let sql = `UPDATE galleryImg SET image = '${filename}' where image = '${name}'`;
    try {
        sqldb.query(sql,(err, rows)=>{
            res.status(201).json({filename});
        })
    } catch (error) {
        console.log(error);
    }
}