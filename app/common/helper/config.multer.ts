import multer from "multer";
import path from "path";

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique file names
    },
});

// File filter to allow only images (optional)
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/; // Add more formats if needed
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        return cb(new Error("Invalid file type. Only images are allowed!"));
    }
};

// Set up multer middleware
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
    fileFilter,
});

export default upload;
