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
router.get('/find/:id', async (req, res) => {

    try {
        const product = await Product.findById(req.params.id);

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json(error);
    }
});

// ===== GET all Products ===== //
router.get('/', async (req, res) => {

    /* 
    We can also make queries to mongoDB.
    In this case we create 2 queries, "new" & "category", both are in request.
    */
    const qNew = req.query.new;
    const qCategory = req.query.category;

    try {
        // We initialize a variable "products".
        let products;

        // If qNew exists, searches by {createsAt} and orders the result in descending order {-1},
        // with a limit of 5 products.
        if (qNew) {
            products = await Product.find().sort( {createdAt: -1} ).limit(5);
        
        // If qCategory exists, searches for the products with the categories that we stablish in the query.
        // The "$in" operator selects the documents where the value of a field equals any value in the specified array. 
        } else if (qCategory) {
            products = await Product.find({
                categories : {
                    $in: [qCategory]
                }
            });
        
        // If there is no query, return all products.
        } else {
            products = await Product.find();
        }

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;