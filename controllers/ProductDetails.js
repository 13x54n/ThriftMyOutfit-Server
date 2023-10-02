const ProductDetails = require("../models/ProductDetails");

// CREATE
function createProductDetails(product, detailsData) {
    const newProductDetails = new ProductDetails({
        product: product._id,
        ...detailsData
    });
    return newProductDetails.save();
}

// READ
function getProductDetails(productId) {
    return ProductDetails.findOne({ product: productId }).populate('product');
}

// UPDATE
function updateProductDetails(productDetailsId, updatedData) {
    return ProductDetails.findByIdAndUpdate(productDetailsId, updatedData, { new: true });
}

// DELETE
function deleteProductDetails(productDetailsId) {
    return ProductDetails.findByIdAndDelete(productDetailsId);
}

module.exports = {createProductDetails, getProductDetails, updateProductDetails, deleteProductDetails}