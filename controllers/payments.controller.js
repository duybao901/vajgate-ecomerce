const Payments = require('../models/payments.model');
const Users = require('../models/users.model');
const Products = require('../models/products.model');

class PaymentsController {
    async getPayments(req, res) {
        try {
            const payments = await Payments.find();
            return res.json(payments);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }

    async createPayment(req, res) {
        try {
            const user = await Users.findById(req.user.id).select('-password');
            if (!user) {
                return res.status(400).json({ msg: 'User not found' });
            }

            const { cart, paymentID, address } = req.body;
            const { _id, name, email } = user;

            const newPayment = new Payments({
                user_id: _id,
                name,
                email,
                cart,
                paymentID,
                address,
            });
            await newPayment.save();

            cart.filter((item) => {
                return rentedProduct(item._id, item.quantity, item.rented);
            });

            return res.json({ newPayment });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

const rentedProduct = async (id, quantity, oldRented) => {
    await Products.findByIdAndUpdate(
        { _id: id },
        {
            rented: quantity + oldRented,
        },
    );
};

module.exports = new PaymentsController();
