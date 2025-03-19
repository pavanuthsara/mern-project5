import express from 'express';
import mongoose from 'mongoose';
import Product from '../model/product.model.js';
import { getProducts } from '../controller/product.controller.js';
import { createProduct } from '../controller/product.controller.js';
import { updateProduct } from '../controller/product.controller.js';
import { getProductById } from '../controller/product.controller.js';
import { deleteProduct } from '../controller/product.controller.js';

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getProductById);
  
router.patch('/:id',updateProduct);
  
router.post('/', createProduct);
  
router.delete('/:id', deleteProduct);

export default router;