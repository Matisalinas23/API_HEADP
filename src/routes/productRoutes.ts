import express from "express"
import { createProduct, deleteProduct, getProductByCategories, getProduct, getProducts, updatedCategoriesProduct, updateProduct, updateProductImage, getProductByPriceRange } from "../controllers/productController"
import multer from "multer";
import { verifyAdmin } from "../middlewares/verifyAdmin";

const router = express.Router()
const upload = multer()

router.post("/", verifyAdmin, upload.single("image"), createProduct); 
router.get('/', getProducts)
router.put('/:id', verifyAdmin, updateProduct)
router.delete('/:id', verifyAdmin, deleteProduct)
router.put('/update_image/:id', verifyAdmin, upload.single("image"), updateProductImage)
router.put('/update_categories/:id', verifyAdmin, updatedCategoriesProduct)
router.get('/search', getProduct)
router.get('/filter_by_categories', getProductByCategories) // *baseurl*/products/filter_by_categories?categoryIds=1,2,3
router.get('/filter_by_price_range', getProductByPriceRange) // *baseurl*/products/filter_by_price_range?min=100000&max=250000

export default router