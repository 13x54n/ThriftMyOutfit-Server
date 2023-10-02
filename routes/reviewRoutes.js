const express = require('express');
const Review = require('../models/Review');

const reviewRouter = express.Router();

// UPDATE Review
reviewRouter.patch('/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!review) return res.status(404).send({ message: 'Review not found' }); 
        res.send(review);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = reviewRouter;
