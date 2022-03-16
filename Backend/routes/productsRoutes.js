import express from 'express';
import { addCategory, subCategory, getAllCategories, deleteCategory, deleteSubCategory } from '../controller/ProductController.js';
const router = express.Router();

router.post("/addCategory", addCategory)
router.post("/subCategory", subCategory)
router.get("/getAllCategories", getAllCategories)
router.post("/deleteCategory", deleteCategory)
router.post("/deleteSubCategory", deleteSubCategory)


export default router

