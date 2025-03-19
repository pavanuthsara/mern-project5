import mongoose from "mongoose";

const buyerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    
}, {
    timestamps: true //createdAt, updatedAt
});

const Buyer = mongoose.model('Buyer', buyerSchema);
export default Buyer;