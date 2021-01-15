const Categorys = require('../models/categorys.model');
const Products = require('../models/products.model');
class CategorysController {
    async getCategorys(req, res, next) {
        try {
            const categorys = await Categorys.find({});
            res.json(categorys);
            // res.json('test')
        } catch (err) {
            res.status(500).json({ err: err.messages });
        }
    }
    async createCategory(req, res, next) {
        try {
            const { name } = req.body;
            const category = await Categorys.findOne({ name });
            if (category)
                res.status(400).json({ msg: `${name} already exists` });
            console.log(name);
            const newCategory = new Categorys({ name });
            newCategory.save();
            return res.json({ msg: 'Thêm dữ liệu thành công' });
        } catch (err) {
            return res
                .status(500)
                .json({ err: err, msg: 'error at createCategory' });
        }
    }
    async deleteCategory(req, res, next) {
        try {
            const { id } = req.params;
            const category = await Categorys.findById({ _id: id });
            console.log(category.name);
            const product = await Products.find({ category: category.name });
            console.log(product, category);
            if (product.length > 0) {
                return res
                    .status(400)
                    .json({ msg: 'Please delete related products.' });
            } else {
                await Categorys.findByIdAndDelete({ _id: id });
                return res.json({ msg: 'Delete data successfully.' });
            }
        } catch (err) {
            return res
                .status(500)
                .json({ err: err, msg: 'error at deleteCategory' });
        }
    }
    async updateCategory(req, res, next) {
        try {
            const { name } = req.body;
            const { id } = req.params;

            await Categorys.findByIdAndUpdate({ _id: id }, { name });
            res.json({ msg: 'Cập nhât dữ liệu thành công' });
        } catch (err) {
            return res
                .status(500)
                .json({ err: err, msg: 'error at updateCategory' });
        }
    }
}

module.exports = new CategorysController();
