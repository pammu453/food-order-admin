import express from 'express'
import { addFoodItem, getAllFoodItems, deleteFood } from '../controllers/foodController.js'
import multer from 'multer'
import path from 'path'

const router = express.Router()
const __dirname = path.resolve()

const uploadDir = path.join(__dirname, '../uploads');

// image storage Engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

router.post("/addFoodItem", upload.single("image"), addFoodItem)
router.get("/getAllFoodItems", getAllFoodItems)
router.delete("/deleteFood/:id", deleteFood)


export default router