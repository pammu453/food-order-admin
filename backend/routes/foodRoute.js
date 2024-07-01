import express from 'express'
import { addFoodItem, getAllFoodItems, deleteFood } from '../controllers/foodController.js'
import multer from 'multer'

import fs from 'fs';
import path from 'path';

const router = express.Router()

const __dirname = path.resolve()

// image storage Engine
const uploadDir = path.join(__dirname, '../../backend/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Image storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage })

router.post("/addFoodItem", upload.single("image"), addFoodItem)
router.get("/getAllFoodItems", getAllFoodItems)
router.delete("/deleteFood/:id", deleteFood)


export default router