import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './model/product.model.js';
import productRoutes from './routes/product.route.js';
import Farmer from './model/farmer.model.js';
import Product2 from './model/product2.model.js';
import Buyer from './model/buyer.model.js';
import Order from './model/order.model.js';

dotenv.config();

const app = express();

app.use(express.json()); //allow to accept json data in the res.body

app.use('/api/products',productRoutes );

app.get("/best-selling/:farmerId", async (req, res) => {
    try {
        const farmerId = req.params.farmerId;

        // Find products belonging to the given farmer
        const products = await Product.find({ farmerId }).select("id name category pricePerUnit image");
        const productIds = products.map(product => product.id);

        // Aggregate orders to calculate total sales per product
        const bestSelling = await Order.aggregate([
            { $match: { productId: { $in: productIds } } },
            { $group: { _id: "$productId", totalSales: { $sum: "$totalprice" } } },
            { $sort: { totalSales: -1 } } // Sort in descending order of total sales
        ]);

        // Merge product details with sales data
        const result = bestSelling.map(sale => {
            const product = products.find(p => p.id === sale._id.toString());
            return { 
                productId: sale._id,
                name: product.name,
                category: product.category,
                pricePerUnit: product.pricePerUnit,
                image: product.image,
                totalSales: sale.totalSales
            };
        });

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/api/farmers", async (req, res) => {
    try {
        const farmer = new Farmer(req.body);
        await farmer.save();
        res.json(farmer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/api/products2", async (req, res) => {
    try {
        const product = new Product2(req.body);
        await product.save();
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.get("/api/products2/:farmerId", async (req, res) => {
    try {
        const farmerId = req.params.farmerId;
        const products = await Product2.find({ farmerId }).select("name");
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/api/buyers", async (req, res) => {
    try {
        const buyer = new Buyer(req.body);
        await buyer.save(); 
        res.json(buyer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/api/orders", async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }   
}
);

app.get("/farmers/:farmerId", async (req, res) => {
    try {
        const { farmerId } = req.params;

        // Find all products of the farmer
        const products = await Product2.find({ farmerId });

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found for this farmer" });
        }

        // Get product IDs
        const productIds = products.map(product => product._id);

        // Aggregate total earnings for each product
        const earningsData = await Order.aggregate([
            { $match: { productId: { $in: productIds } } },
            { $group: { _id: "$productId", totalEarnings: { $sum: "$totalPrice" } } }
        ]);

        // Map earnings to products
        const earningsByProduct = products.map(product => {
            const earnings = earningsData.find(e => e._id.toString() === product._id.toString());
            return {
                productId: product._id,
                productName: product.name,
                totalEarnings: earnings ? earnings.totalEarnings : 0
            };
        });

        res.status(200).json({ farmerId, earningsByProduct });

    } catch (error) {
        res.status(500).json({ error: "Failed to calculate earnings", details: error.message });
    }
});


app.listen(3001, () => {
    connectDB();
    console.log('Server is running on http://localhost:3001');
});
