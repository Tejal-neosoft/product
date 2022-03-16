import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String
    },

    subCategory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory",
    },]

});

const categoryModel = mongoose.model('category', categorySchema)

export default categoryModel;

