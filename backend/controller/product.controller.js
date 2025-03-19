import Product from "../model/product.model.js";

export const getProducts = async (req, res) => {
    try{
      const products = await Product.find({});
      res.status(200).json({data: products, success: true});
    }catch(error){
      console.log("Error in get products: ", error.message);
      res.status(500).json({ success: false, message: 'server error' });
    }
  };

export const getProductById = async (req, res) => {
    const {id} = req.params;
    try{
      const product = await Product.findById(id);
      if(product){
        res.status(200).json({data: product, success: true});
      }else{
        res.status(404).json({success: false, message: 'Product not found'});
      }
    }catch(error){
      console.log("Error in get product: ", error.message);
      res.status(500).json({ success: false, message: 'server error' });  
    }
  };


export const createProduct = async (req, res) => {
    const product = req.body;
  
    if(!product.name || !product.price || !product.image) {
      res.status(400).json({success: false, message: 'All fields are required' });
    }
  
    const newProdut = new Product(product);
  
    try{
      await newProdut.save();
      res.status(201).json({data: newProdut, success: true});
    } catch (error) {
      console.log("Error in create product: ", error.message);
      
      res.status(500).json({ success: false, message: 'Something went wrong' });
    }
  };


export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const product = req.body;
    try{
      const updatedProduct = await Product
        .findByIdAndUpdate(id, product, {new: true});
      if(updatedProduct){  
        res.status(200).json({data: updatedProduct, success: true});
      }else{
        res.status(404).json({success: false, message: 'Product not found'});
      }    
    }catch(error){
      console.log("Error in update product: ", error.message);
      res.status(500).json({ success: false, message: 'server error' });
    }
  };


  export const deleteProduct = async (req, res) => {
    const {id}= req.params;
    console.log("id: ", id);
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: 'Product deleted successfully'});
    }catch(error){
        res.status(404).json({success: false, message: 'Product not found'});
    }
};