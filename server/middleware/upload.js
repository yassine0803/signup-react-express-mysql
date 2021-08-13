import multer from 'multer';
import path from 'path';
const __dirname = path.resolve();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/public/uploads`);
    },
    filename: (req, file, cb) => {
        let extension = file.originalname.split('.')[1];
        cb(null, `img-${Date.now()}.${extension}`);
    }
});

const upload = multer({ storage });

export default upload;