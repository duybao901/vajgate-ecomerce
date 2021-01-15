import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { GlobleState } from '../../../../GlobleState';

export default function ProductItem({
    product,
    isAdmin,
    deleteProduct,
    handleCheckProduct,
}) {
    const state = useContext(GlobleState);
    const addCart = state.usersApi.addCart;

    const [openModal, setOpenModal] = useState(false);

    const day = dayjs(product.birthday).format('DD-MM-YYYY');

    const openModel = () => {
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    const onHandleChange = () => {
        handleCheckProduct(product._id);
    };

    return (
        <React.Fragment>
            <div className="col-sm-12 col-md-6 col-lg-4">
                <div className="prouduct_cart">
                    {product.price > 1200 ? (
                        <>
                            <div className="prouduct_cart-new">New</div>
                        </>
                    ) : (
                        ''
                    )}
                    {isAdmin ? (
                        <input
                            type="checkbox"
                            checked={product.checked}
                            className="prouduct_cart-checkbox"
                            onChange={onHandleChange}
                        ></input>
                    ) : (
                        ''
                    )}
                    <Link to={`/detail/${product._id}`}>
                        <img
                            src={product.images.url}
                            alt="product-item"
                            className="product-img"
                        ></img>
                    </Link>

                    <div className="content">
                        <Link to={`/detail/${product._id}`}>
                            <div className="product-name">{product.name}</div>
                        </Link>
                        {isAdmin ? (
                            ''
                        ) : (
                            <>
                                <div className="price">
                                    ${product.price} / 1h
                                </div>
                                <div
                                    className="btn-addtocart"
                                    onClick={() => addCart(product)}
                                >
                                    Add To Cart
                                </div>
                            </>
                        )}
                    </div>

                    <button className="quick-look" onClick={openModel}>
                        <div>Quick look</div>
                    </button>
                    <button
                        className="rp-btn-addtocart"
                        onClick={() => addCart(product)}
                    >
                        <div>Add to cart</div>
                    </button>
                </div>
                {isAdmin ? (
                    <div className="product_admin-btn">
                        <div
                            className="product_admin-delete"
                            onClick={() =>
                                deleteProduct(
                                    product._id,
                                    product.images.public_id,
                                )
                            }
                        >
                            Delete
                        </div>
                        <div className="product_admin-edit">
                            {' '}
                            <Link
                                to={`/product/edit/${product._id}`}
                                style={{ color: 'white' }}
                            >
                                Edit
                            </Link>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
                <div className={openModal ? 'modal modal-show' : 'modal'}>
                    <div className="modal-content">
                        <div className="btn-close-modal" onClick={closeModal}>
                            &times;
                        </div>
                        <div className="modal-detail">
                            <img
                                src={product.images.url}
                                alt="product-item"
                                className="modal-img"
                            ></img>
                            <div className="modal-info">
                                <h2 className="modal-name">
                                    <Link to={`/detail/${product._id}`}>
                                        {product.name}
                                    </Link>
                                </h2>
                                <p className="modal-price">
                                    $ {product.price} / 1h
                                </p>
                                <ul className="modal-list">
                                    <li>
                                        <span>
                                            Japan Name: {product.japanName}
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            Size: {product.bust},{' '}
                                            {product.waist}, {product.hip}
                                        </span>
                                    </li>
                                    <li>
                                        <span>Height: {product.height} cm</span>
                                    </li>
                                    <li>
                                        <span>
                                            Blood Type: {product.blood_type}
                                        </span>
                                    </li>
                                    <li>
                                        <span>Birthday: {day}</span>
                                    </li>
                                    <li>
                                        <span>Hobby: {product.hobby}</span>
                                    </li>
                                </ul>
                                {isAdmin ? (
                                    <div
                                        className="product_admin-btn"
                                        style={{ marginTop: '50px' }}
                                    >
                                        <div
                                            className="product_admin-delete"
                                            onClick={() =>
                                                deleteProduct(
                                                    product._id,
                                                    product.images.public_id,
                                                )
                                            }
                                        >
                                            Delete
                                        </div>
                                        <div className="product_admin-edit">
                                            <Link
                                                to={`/product/edit/${product._id}`}
                                                style={{ color: 'white' }}
                                            >
                                                Edit
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className="card_btn-addtocart"
                                        onClick={() => addCart(product)}
                                    >
                                        Add To Cart
                                    </div>
                                )}
                                <div className="btn-sharebox">
                                    Share:
                                    <span>
                                        <i className="fab fa-facebook-f"></i>
                                    </span>
                                    <span>
                                        <i className="fab fa-instagram"></i>
                                    </span>
                                    <span>
                                        <i className="fab fa-twitter"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
