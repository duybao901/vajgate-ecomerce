import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GlobleState } from '../../../GlobleState';
import { Link } from 'react-router-dom';

function DetailHistory() {
    const { id } = useParams();
    const state = useContext(GlobleState);
    const [history] = state.usersApi.history;
    const [detailHistory, setDetailHistory] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getDetailHistory = () => {
            history.forEach((payment) => {
                if (payment._id === id) {
                    setDetailHistory(payment);
                }
            });
        };
        getDetailHistory();
    }, [id, history]);

    useEffect(() => {
        if (detailHistory.length === 0) return null;
        else {
            const totalCart = () => {
                let total = 0;
                total = detailHistory.cart.reduce((total, sum) => {
                    return total + sum.quantity * sum.price;
                }, 0);
                setTotal(total);
            };
            totalCart();
        }
    }, [detailHistory]);

    if (detailHistory.length === 0) return null;

    const { address, cart } = detailHistory;

    return (
        <div className="detail-history">
            <div className="container">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Potal Code</th>
                            <th scope="col">Contry Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{address.recipient_name}</td>
                            <td>
                                {address.line1} - {address.city}
                            </td>
                            <td>{address.postal_code}</td>
                            <td>{address.country_code}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="detail-history-cart">
                    <table className="table table-bordered detail-tabel detail-tabel-sm">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Products</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((product, index) => {
                                return (
                                    <tr key={index}>
                                        <td style={{ textAlign: 'center' }}>
                                            <img
                                                src={product.images.url}
                                                alt="history_image"
                                                className="detail-history-cart-img"
                                            ></img>
                                        </td>
                                        <td style={{ textTransform: 'uppercase',fontWeight:'500' }}>{product.name}</td>
                                        <td>{product.quantity} h</td>
                                        <td>{product.price} $</td>
                                    </tr>
                                );
                            })}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                        padding: '20px',
                                    }}
                                    className="dt-ht-sm-total"
                                >
                                    Total: {total} $
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Link to="/history" className="cart-to-home">
                    <i
                        className="fas fa-long-arrow-alt-left"
                        style={{ marginRight: '5px' }}
                    ></i>
                    Go Back To History
                </Link>
            </div>
        </div>
    );
}

export default DetailHistory;
