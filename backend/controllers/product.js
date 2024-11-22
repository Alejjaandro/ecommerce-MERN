import Product from '../models/Product.js';
import fs from 'fs';
import path from 'path';

// MORE EXPLANATIONS ON "/auth.js" & "/user.js" //

// ===== CREATE Product ===== //
export const createProduct = async (req, res) => {
    const productExists = await Product.findOne({ title: req.body.title });
    if (productExists) { return res.status(400).json({ message: ['There is already a product with this name.'] }) }

    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json({message: "Product Created", newProduct: newProduct});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// ===== UPDATE Product ===== //
export const updateProduct = async (req, res) => {

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json({message: "Product Updated", updatedProduct: updatedProduct});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// ===== DELETE Product ===== //
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        const response = await Product.findByIdAndDelete(req.params.id);
        
        res.status(200).json({message: 'Product deleted', deletedProduct: product});
               
    } catch (error) {
        res.status(500).json(error);
    }};

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