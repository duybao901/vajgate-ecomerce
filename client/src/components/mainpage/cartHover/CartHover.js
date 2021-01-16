import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobleState } from '../../../GlobleState';
import axios from 'axios';

function CartHover() {
    const state = useContext(GlobleState);
    const [cart, setCart] = state.usersApi.cart;
    const [token] = state.token;

    const totalCart = () => {
        let total = 0;
        total = cart.reduce((total, sum) => {
            return total + sum.quantity * sum.price;
        }, 0);
        return total;
    };

    const removeCartItem = async (id) => {
        if (window.confirm('Do you want to delete this product!')) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1);
                }
            });
            totalCart();
            setCart([...cart]);
            await axios.patch(
                '/user/addCart',
                { cart },
                {
                    headers: { Authorization: token },
                },
            );
        }
    };
    return cart.length === 0 ? (
        ''
    ) : (
        <div className="cart-notify">
            <ul>
                {cart.map((product, index) => {
                    return (
                        <li key={index} className="cart-notify-item">
                            <Link to={`/detail/${product._id}`}>
                                <img
                                    src={product.images.url}
                                    alt="product-img"
                                    className="cart-notify-img"
                                ></img>
                            </Link>
                            <div className="cart-notify-info">
                                <div>
                                    <Link
                                        to={`/detail/${product._id}`}
                                        className="cart-notify-name"
                                    >
                                        {product.name}
                                    </Link>
                                    <div
                                        onClick={() =>
                                            removeCartItem(product._id)
                                        }
                                        className="cart-hover-remove"
                                    >
                                        x
                                    </div>
                                </div>
                                <div className="cart-notify-quantity">
                                    {product.quantity}h X ${product.price}
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
            <div className="cart-notify-total">
                <div className="cart-notify-total-l">Total:</div>
                <div className="cart-notify-total-n">${totalCart()}</div>
            </div>
            <Link to="/cart" className="cart-notify-btn view-cart-btn">
                View Cart
            </Link>
            <button className="cart-notify-btn payment-cart-btn">
                Payment
            </button>
        </div>
    );
}

export default CartHover;
