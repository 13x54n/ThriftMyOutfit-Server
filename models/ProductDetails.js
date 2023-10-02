const mongoose = require('mongoose');

const breadcrumbSchema = new mongoose.Schema({
    id: Number,
    name: String,
    href: String
});

const imageSchema = new mongoose.Schema({
    src: String,
    alt: String
});

const colorSchema = new mongoose.Schema({
    name: String,
    class: String,
    selectedClass: String
});

const sizeSchema = new mongoose.Schema({
    name: String,
    inStock: Boolean
});

const productDetailsSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    breadcrumbs: [breadcrumbSchema],
    images: [imageSchema],
    colors: [colorSchema],
    sizes: [sizeSchema],
    description: String,
    highlights: [String],
    details: String
});

module.exports = mongoose.model('ProductDetails', productDetailsSchema);
