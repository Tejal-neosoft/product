import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({

    product_name: {
        type: String,
        required: true
    },
    product_image: {
        type: String,
        required: true
    },
    product_desc: {
        type: String,
        required: true
    },

    product_cost: {
        type: Number,
        required: true
    },

})
export default mongoose.model("products", productSchema)