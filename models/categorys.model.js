const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Categorys', categorySchema);
