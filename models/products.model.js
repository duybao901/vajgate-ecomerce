const mongoose = require('mongoose');
const productsScheme = new mongoose.Schema(
    {
        product_id: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        name: {
            type: String,
            trim: true,
            required: true,
        },
        japanName: {
            type: String,
            trim: true,
        },
        bust: {
            type: Number,
        },
        waist: {
            type: Number,
        },
        hip: {
            type: Number,
        },
        height: {
            type: Number,
        },
        birthday: {
            type: Date,
            required: true,
        },
        blood_type: {
            type: String,
        },
        hobby: {
            type: String,
            trim: true,
        },
        category: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
        },
        checked: {
            type: Boolean,
            default: 0,
        },
        images: {
            type: Object,
            required: true,
        },
        rented: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Products', productsScheme);
