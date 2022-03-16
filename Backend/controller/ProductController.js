import categoryModel from "../models/categorySchema.js";
import subCategoryModel from "../models/subCategorySchema.js"
import ErrorHandler from "../utils/ErrorHandler.js";
import sendData from '../middleware/SendData.js'

export const getAllCategories = async (req, res, next) => {
  try {
    const category = await categoryModel.find().populate("subCategory")

    res.status(202).json({
      succes: true,
      category
    })
  }
  catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
}

export const addCategory = async (req, res, next) => {
  try {
    const { categoryName } = req.body
    await categoryModel.create({
      categoryName
    })

    const category = await categoryModel.find()

    res.status(202).json({
      succes: true,
      category
    })
  }
  catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};
export const subCategory = async (req, res, next) => {
  try {
    const subdata = await subCategoryModel.create({
      name: req.body.name,
      category: req.body.categoryId
    });

    const catego = await categoryModel.findById(req.body.categoryId)
    catego.subCategory.push(subdata._id)

    await catego.save();

    const cat = await categoryModel.find().populate("subCategory")
    console.log(cat)


    sendData(cat, 202, res)

  }
  catch (error) {
    next(new ErrorHandler(error.message, 500));

  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const cat = await categoryModel.findById(req.body.categoryId);

    const sub = await subCategoryModel.deleteMany({
      _id: cat.subCategory
    })
    cat.remove();
    next(new ErrorHandler("category deleted", 201));

  }
  catch (error) {
    next(new ErrorHandler(error.message, 500));

  }
}

export const deleteSubCategory = async (req, res, next) => {
  try {
    const subcate = await subCategoryModel.findOneAndDelete({
      _id: req.body.categoryId
    })
    const cat = await categoryModel.findOneAndUpdate({ _id: subcate.category }, { $pullAll: { subCategory: [req.body.categoryId] } })
    console.log(cat)
    next(new ErrorHandler("sub category deleted", 200));

  }
  catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
}

