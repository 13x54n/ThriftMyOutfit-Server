const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        required: true
    },
    imageAlt: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);
