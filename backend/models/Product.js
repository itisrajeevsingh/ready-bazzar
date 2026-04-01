const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        images: [String],
        description: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        colors: [String],
        sizes: [String],
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        originalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        discount: {
            type: Number,
            required: true,
            default: 0,
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        reviews: {
            type: Number,
            required: true,
            default: 0,
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
