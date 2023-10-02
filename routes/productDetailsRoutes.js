const express = require('express');
const ProductDetails = require('../models/ProductDetails');

const productDetailsRouter = express.Router();

// UPDATE ProductDetails
productDetailsRouter.patch('/:id', async (req, res) => {
    try {
        const productDetails = await ProductDetails.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!productDetails) return res.status(404).send({ message: 'ProductDetails not found' });
        res.send(productDetails);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = productDetailsRouter;
