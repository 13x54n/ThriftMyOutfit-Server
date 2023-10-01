const express = require('express');
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product');

const router = express.Router();

const productValidationRules = [
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
    body('href').isString().withMessage('Href must be a string').notEmpty().withMessage('Href is required'),
    body('price').isString().withMessage('Price must be a string').notEmpty().withMessage('Price is required'),
    body('imageSrc').isURL().withMessage('ImageSrc must be a valid URL').notEmpty().withMessage('ImageSrc is required'),
    body('imageAlt').isString().withMessage('ImageAlt must be a string').notEmpty().withMessage('ImageAlt is required')
];

// Create
router.post('/', productValidationRules, async (req, res) => {
    console.log(req)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read all
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Read one
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send();
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update
router.patch('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).send();
        res.send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).send();
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
