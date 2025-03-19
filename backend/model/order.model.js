import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId, ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    buyerId: {
        type: mongoose.Schema.Types.ObjectId, ref: "Buyer",
        required: true
    },   
}, {
    timestamps: true //createdAt, updatedAt
}); 

const Order = mongoose.model('Order', orderSchema);
export default Order;