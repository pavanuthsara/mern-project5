import mongoose from "mongoose";

const product2Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    pricePerKg: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    farmerId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Farmer",
        required: true
    },
    
}, {
    timestamps: true //createdAt, updatedAt
});

const Product2 = mongoose.model('Product2', product2Schema);
export default Product2;