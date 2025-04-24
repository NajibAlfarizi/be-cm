import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination(req, res, cb) {
        cb(null, "uploads/");
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}path.extname(file.originalname)}`);
    },
});

//filter gambar
function chekFileType(req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("gambar hanya boleh dalam format jpg, jpeg, dan png");
    }
}

export const uploads = multer({
    storage,
    size: {
        limits: { fileSize: 3000000 }, // 1MB
    },
    fileFilter: function (req, file, cb) {
        chekFileType(req, file, cb);
    }
});