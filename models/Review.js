const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    productDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductDetails',
        required: true
    },
    average: Number,
    totalCount: Number
});

module.exports = mongoose.model('Review', reviewSchema);
