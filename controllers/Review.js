const Review = require("../models/Review");

// CREATE
function createReview(productDetails, reviewData) {
    const newReview = new Review({
        productDetails: productDetails._id,
        ...reviewData
    });
    return newReview.save();
}

// READ
function getReviews(productDetailsId) {
    return Review.find({ productDetails: productDetailsId });
}

// UPDATE
function updateReview(reviewId, updatedData) {
    return Review.findByIdAndUpdate(reviewId, updatedData, { new: true });
}

// DELETE
function deleteReview(reviewId) {
    return Review.findByIdAndDelete(reviewId);
}

module.exports = {createReview, getReviews, updateReview, deleteReview}