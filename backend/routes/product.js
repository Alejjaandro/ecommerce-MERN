const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken');

const Product = require('../models/Product');

const router = require('express').Router();

// MORE EXPLANATIONS ON "/auth.js" & "/user.js" //

// ===== CREATE Product ===== //
router.post('/', verifyTokenAndAdmin, async (req, res) => {

    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();

        res.status(200).json(savedProduct);

    } catch (error) {
        res.status(500).json(error);
    }
});

// ===== UPDATE Product ===== //
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json(error);
    }
});

// ===== DELETE Product ===== //
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {

    try {
        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json('Product Deleted');

    } catch (error) {
        res.status(500).json(error);
    }
});

// ===== GET Product ===== //
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {

    try {
        const product = await Product.findById(req.params.id);

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json(error);
    }
});

// ===== GET all Products ===== //
router.get('/find', verifyTokenAndAdmin, async (req, res) => {

    try {
        const product = await Product.find();

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;