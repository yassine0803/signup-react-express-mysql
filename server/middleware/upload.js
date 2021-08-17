import multer from "multer";
import path from "path";
const __dirname = path.resolve();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/public/uploads`);
  },
  filename: (req, file, cb) => {
    let extension = file.originalname.split(".")[1];
    cb(
      null,
      `img-${Date.now()}${Math.floor(Math.random() * 101) * 2461}.${extension}`
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024,
  },
});

export default upload;
