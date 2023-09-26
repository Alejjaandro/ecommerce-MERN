import { Router } from 'express';
import multer from 'multer';

const router = Router();

// Multer configuration for storing images.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/productImages');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Import Controllers
import { createProduct, updateProduct, deleteProduct, getProduct, getAllProducts } from '../controllers/product.js';
import { verifyAdmin } from '../middleware/verifyToken.js';
import { validator } from '../middleware/validator.js';
import { productValidator } from '../validators/productValidator.js';

// We create the endpoints. 
router.get("/find/:id", getProduct);
router.get("/", getAllProducts);

router.post("/saveProdImage", verifyAdmin, upload.single('thumbnail'), (req, res) => {
    console.log(req.file);
    res.status(200).json({ message: "Image uploaded successfully", fileName: req.file.filename });
});

router.post("/", verifyAdmin, validator(productValidator), createProduct);
router.put("/:id", verifyAdmin, validator(productValidator), updateProduct);
router.delete("/:id", verifyAdmin, deleteProduct);

export default router;