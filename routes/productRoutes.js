const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Create
router.post('/', async (req, res) => {
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
