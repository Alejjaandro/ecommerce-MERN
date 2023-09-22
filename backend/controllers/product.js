import Product from '../models/Product.js';

// MORE EXPLANATIONS ON "/auth.js" & "/user.js" //

// ===== CREATE Product ===== //
export const createProduct = async (req, res) => {

    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json({message: "Product Created", newProduct: newProduct});
    } catch (error) {
        res.status(500).json(error);
    }
};

// ===== UPDATE Product ===== //
export const updateProduct = async (req, res) => {

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json({message: "Product Updated", updateProduct: updatedProduct});
    } catch (error) {
        res.status(500).json(error);
    }
};

// ===== DELETE Product ===== //
export const deleteProduct = async (req, res) => {

    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Product Deleted'});
    } catch (error) {
        res.status(500).json(error);
    }
};

// ===== GET Product ===== //
export const getProduct = async (req, res) => {

    try {
        const product = await Product.findById(req.params.id);

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json(error);
    }
};

// ===== GET all Products ===== //
export const getAllProducts = async (req, res) => {

    try {

        const products = await Product.find();
        res.status(200).json(products);

    } catch (error) {
        res.status(500).json(error);
    }
};