const Products = require('../models/products.model');

class Apifeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        // Để filter thì cần phải loại trừ, chuyển req.query thành chuổi để thêm dấu $ rồi chuyển thành object ngược lại
        const queryObj = { ...this.queryString };

        const excludedFields = ['page', 'sort', 'limit'];
        excludedFields.forEach((el) => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);

        // { "gt": "123" } --> {"$gt":"123"}
        // theo chuan mongoose
        queryStr = queryStr.replace(
            /\b(gt|gte|lt|lte|qe|regex)\b/g,
            (match) => '$' + match,
        );
        this.query.find(JSON.parse(queryStr));
        return this;
    }
    sorting() {
        // Using query builder
        if (this.queryString.sort) {
            const sortStr = this.queryString.sort.split(',').join(' ');
            this.query.sort(sortStr);
        } else {
            this.query.sort('-createdAt');
        }
        return this;
    }
    paginating() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 9;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

class ProductsController {
    async getProducts(req, res, next) {
        try {
            const features = new Apifeatures(Products.find({}), req.query)
                .filtering()
                .sorting()
                .paginating();

            const products = await features.query;
            return res.json({
                messages: 'Success',
                results: products.length,
                products,
            });
        } catch (err) {
            return res
                .status(500)
                .json({ err: err.messages, error: 'error At getProducts' });
        }
    }
    async createProduct(req, res, next) {
        try {
            const {
                product_id,
                name,
                japanName,
                bust,
                waist,
                hip,
                height,
                birthday,
                blood_type,
                hobby,
                category,
                price,
                images,
            } = req.body;
            console.log(req.body);
            const product = await Products.findOne({ product_id });
            if (product) {
                return res.status(400).json({ msg: 'Product is exist' });
            }
            if (!images)
                return res.status(400).json({ msg: 'Image not found' });
            const newProduct = new Products({
                product_id,
                name,
                japanName,
                bust,
                waist,
                hip,
                height,
                birthday,
                blood_type,
                hobby,
                category,
                price,
                images,
            });
            newProduct.save();
            return res.json({ msg: 'Add product successfully.' });
        } catch (err) {
            return res.status(500).json({ msg: 'error At createProduct' });
        }
    }
    async deleteProduct(req, res, next) {
        try {
            const { id } = req.params;
            await Products.findByIdAndDelete(id);
            return res.json({ msg: 'Delete product successfully' });
        } catch (err) {
            return res.status(500).json({ msg: 'Delete product fail' });
        }
    }
    async updateProduct(req, res, next) {
        try {
            const {
                product_id,
                name,
                japanName,
                bust,
                waist,
                hip,
                height,
                birthday,
                blodd_type,
                hobby,
                category,
                price,
                images,
            } = req.body;

            await Products.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    product_id,
                    name,
                    japanName,
                    bust,
                    waist,
                    hip,
                    height,
                    birthday,
                    blodd_type,
                    hobby,
                    category,
                    price,
                    images,
                },
            );
            return res.json({ msg: 'Update sản phẩn thành công' });
        } catch (err) {
            return res
                .status(500)
                .json({ err: err.messages, error: 'error At updateProduct' });
        }
    }
}

module.exports = new ProductsController();
