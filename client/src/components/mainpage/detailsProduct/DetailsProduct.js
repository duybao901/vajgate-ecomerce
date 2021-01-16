import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GlobleState } from '../../../GlobleState';
import { Link } from 'react-router-dom';
import ProductItem from '../utils/productItem/ProductItem';
import dayjs from 'dayjs';

function DetailsProduct() {
    let params = useParams();
    const state = useContext(GlobleState);
    const [products] = state.productsApi.products;
    const [detailProduct, setDetailProduct] = useState([]);
    const [isAdmin] = state.usersApi.isAdmin;
    const addCart = state.usersApi.addCart;

    // Component did mount
    useEffect(() => {
        if (params) {
            products.forEach((product) => {
                if (product._id === params.id) {
                    setDetailProduct(product);
                }
            });
        }
    }, [params, products]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [detailProduct]);
    return (
        <div className="container">
            <div className="card-product">
                <div className="card__title">
                    <Link to="/" className="icon">
                        <i className="fa fa-arrow-left"></i>
                    </Link>
                    <h3 style={{ marginLeft: '20px' }}>
                        {detailProduct.category}
                    </h3>
                </div>
                <div className="card__body">
                    <div className="card__body-left">
                        {detailProduct.images ? (
                            <img
                                src={detailProduct.images.url}
                                alt="product-detail"
                            ></img>
                        ) : (
                            ''
                        )}
                    </div>
                    <div className="card__body-right">
                        <h2 className="modal-name">{detailProduct.name}</h2>
                        <p className="modal-price">
                            $ {detailProduct.price} / 1h
                        </p>
                        <ul className="modal-list">
                            <li>
                                <span>
                                    Japan Name: {detailProduct.japanName}
                                </span>
                            </li>
                            <li>
                                <span>
                                    Size: {detailProduct.bust},{' '}
                                    {detailProduct.waist}, {detailProduct.hip}
                                </span>
                            </li>
                            <li>
                                <span>Height: {detailProduct.height} cm</span>
                            </li>
                            <li>
                                <span>
                                    Blood Type: {detailProduct.blood_type}
                                </span>
                            </li>
                            <li>
                                <span>
                                    Birthday:{' '}
                                    {dayjs(detailProduct.birthday).format(
                                        'DD-MM-YYYY',
                                    )}
                                </span>
                            </li>
                            <li>
                                <span>Hobby: {detailProduct.hobby}</span>
                            </li>
                            <span className="stock"> In stock</span>
                            <div className="reviews">
                                <ul className="stars">
                                    <li>
                                        <i className="fa fa-star"></i>
                                    </li>
                                    <li>
                                        <i className="fa fa-star"></i>
                                    </li>
                                    <li>
                                        <i className="fa fa-star"></i>
                                    </li>
                                    <li>
                                        <i className="fa fa-star"></i>
                                    </li>
                                    <li>
                                        <i className="far fa-star"></i>
                                    </li>
                                </ul>
                                <span>(64 reviews)</span>
                            </div>
                        </ul>
                        <div className="detail_product-rented">
                            Rented: {detailProduct.rented} / h
                        </div>
                    </div>
                </div>
                <div className="indicator"></div>
                <div className="card__bottom">
                    <Link to="/">VAJGATE</Link>
                    {isAdmin ? (
                        <div className="product_admin-btn">
                            {/* <div className="product_admin-delete">Delete</div>🐊🚀 */}
                            <div className="product_admin-edit">
                                <Link
                                    to={`/product/edit/${detailProduct._id}`}
                                    style={{ color: 'white' }}
                                >
                                    Edit
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="card_btn-addtocart"
                            onClick={() => addCart(detailProduct)}
                        >
                            Add To Cart
                        </div>
                    )}
                </div>
            </div>
            <div className="related-products">
                <h2>Related products</h2>
                <div className="row">
                    {products.map((product, index) => {
                        if (product.category === detailProduct.category) {
                            if (index <= 7) {
                                return (
                                    <ProductItem
                                        product={product}
                                        key={index}
                                    />
                                );
                            }
                        }
                        return null;
                    })}
                </div>
            </div>
        </div>
    );
}

export default DetailsProduct;
