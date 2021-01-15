import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlobleState } from '../../../GlobleState';
import PaypalButton from './PaypalButton';
import axios from 'axios';

export default function Cart() {
    const state = useContext(GlobleState);
    const [cart, setCart] = state.usersApi.cart;
    const [callback, setCallback] = state.usersApi.callback;

    const [total, setTotal] = useState(0);
    const [token] = state.token;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const totalCart = () => {
            let total = 0;
            total = cart.reduce((total, sum) => {
                return total + sum.quantity * sum.price;
            }, 0);
            setTotal(total);
        };
        totalCart();
    }, [cart]);

    const addToCart = async (cart) => {
        await axios.patch(
            '/user/addCart',
            { cart },
            {
                headers: { Authorization: token },
            },
        );
    };

    const increment = (id) => {
        cart.forEach((item) => {
            if (item._id === id) {
                item.quantity += 1;
            }
        });
        setCart([...cart]);
        addToCart(cart);
    };

    const decrement = (id) => {
        cart.forEach((item) => {
            if (item._id === id) {
                item.quantity === 1
                    ? (item.quantity = 1)
                    : (item.quantity -= 1);
            }
        });
        setCart([...cart]);
        addToCart(cart);
    };

    const removeCartItem = (id) => {
        if (window.confirm('Do you want to delete this product!')) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1);
                }
            });
            addToCart(cart);
            setCart([...cart]);
        }
    };

    const tranSuccess = async (payment) => {
        console.log(payment);

        const { paymentID, address } = payment;

        await axios.post(
            'api/payment',
            { cart, paymentID, address },
            {
                headers: { Authorization: token },
            },
        );

        setCart([]);
        addToCart([]);
        alert('You have successfully placed an order');
        setCallback(!callback); // de goi lai api
    };

    return (
        <div className="cart">
            {cart.length === 0 ? (
                <div className="cart-empty">
                    <h2>Cart Empty</h2>
                    <img
                        className="cart-empty-image"
                        src="https://i1.wp.com/www.huratips.com/wp-content/uploads/2019/04/empty-cart.png?fit=603%2C288&ssl=1"
                        alt="cart-empty"
                    ></img>
                </div>
            ) : (
                <>
                    <div className="cart-banner">
                        <div className="cart-container cart-banner-f">
                            <div>Cart</div>
                            <div className="cart-banner-home">
                                <Link to="">Home</Link>
                                &nbsp;/
                                <span> Cart</span>
                            </div>
                        </div>
                    </div>
                    <div className="cart-container">
                        <h2 className="cart-title">Shopping Cart</h2>
                        <div className="cart-body">
                            <div className="cart-content">
                                <table className="cart-table">
                                    <thead>
                                        <tr>
                                            <th>&nbsp;</th>
                                            <th>&nbsp;</th>
                                            <th>&nbsp;</th>
                                            <th>&nbsp;</th>
                                            <th>&nbsp;</th>
                                            <th>&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((product, index) => {
                                            return (
                                                <tr
                                                    className="cart-item"
                                                    key={index}
                                                >
                                                    <td
                                                        className="cart-remove"
                                                        onClick={() =>
                                                            removeCartItem(
                                                                product._id,
                                                            )
                                                        }
                                                    >
                                                        x
                                                    </td>
                                                    <td className="cart-thumbnail">
                                                        <Link
                                                            to={`/detail/${product._id}`}
                                                        >
                                                            <img
                                                                src={
                                                                    product
                                                                        .images
                                                                        .url
                                                                }
                                                                alt="product-img"
                                                            ></img>
                                                        </Link>
                                                    </td>
                                                    <td className="cart-name">
                                                        <Link
                                                            to={`/detail/${product._id}`}
                                                        >
                                                            {product.name}
                                                        </Link>
                                                    </td>
                                                    <td className="cart-price">
                                                        ${product.price} / 1h
                                                    </td>
                                                    <td className="cart-quantitys">
                                                        <span className="cart-quantity-label">
                                                            HOURS
                                                        </span>
                                                        <button
                                                            className="cart-quantity-ct"
                                                            onClick={() =>
                                                                decrement(
                                                                    product._id,
                                                                )
                                                            }
                                                        >
                                                            -
                                                        </button>
                                                        <span className="cart-quantity-number">
                                                            {product.quantity}
                                                        </span>
                                                        <button
                                                            className="cart-quantity-ct"
                                                            onClick={() =>
                                                                increment(
                                                                    product._id,
                                                                )
                                                            }
                                                        >
                                                            +
                                                        </button>
                                                    </td>
                                                    <td className="cart-price-t">
                                                        $
                                                        {product.price *
                                                            product.quantity}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="cart-checkout">
                                <h2>CART TOTALS</h2>
                                <div className="cart-checkout-box">
                                    <div className="cart-subtotal">
                                        <div className="cart-subtotal-label">
                                            Subtotal
                                        </div>
                                        <div className="cart-subtotal-number">
                                            ${total}
                                        </div>
                                    </div>
                                    <div className="cart-shipping">
                                        <div className="cart-shipping-label">
                                            Shipping
                                        </div>
                                        <p>
                                            There are no shipping methods
                                            available. Please double check your
                                            address, or contact us if you need
                                            any help.
                                        </p>
                                    </div>
                                </div>
                                <div className="cart-total">
                                    <div className="cart-total-label">
                                        total
                                    </div>
                                    <div className="cart-total-number">
                                        ${total}.00
                                    </div>
                                </div>
                                <Link to="#!" className="cart-payment-btn">
                                    Payment
                                </Link>
                                <div style={{ float: 'right' }}>
                                    <PaypalButton
                                        total={total}
                                        tranSuccess={tranSuccess}
                                    ></PaypalButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className="cart-container">
                <Link to="/" className="cart-to-home">
                    <i
                        className="fas fa-long-arrow-alt-left"
                        style={{ marginRight: '5px' }}
                    ></i>
                    Go Back To Shopping
                </Link>
            </div>
        </div>
    );
}
