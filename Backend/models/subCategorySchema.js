import mongoose from "mongoose";
const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
    }

});


const subCategoryModel = mongoose.model('subCategory', subCategorySchema);

export default subCategoryModel;  