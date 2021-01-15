import { useState, useEffect } from 'react';
import axios from 'axios';

function UsersApi(token) {
    const [isLogged, setIslogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);
    const [history, setHistory] = useState([]);
    const [callback, setCallback] = useState(false);
    const [user, setUser] = useState(false);
    // thang nay dung de render cai history khi mua hang hanh cong -> goi lai API

    //  Add Cart
    const addCart = async (product) => {
        if (isLogged === false) {
            alert('Please login to continue buying');
        } else {
            const check = cart.every((item) => {
                return item._id !== product._id;
            });
            if (check) {
                setCart([...cart, { ...product, quantity: 1 }]);
                axios.patch(
                    '/user/addCart',
                    { cart: [...cart, { ...product, quantity: 1 }] },
                    {
                        headers: { Authorization: token },
                    },
                );
            } else {
                alert('This product has been added to cart.');
            }
        }
    };

    // Get User
    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: { Authorization: token },
                    });
                    setIslogged(true);
                    if (res.data.role === 1) {
                        setIsAdmin(true);
                    }
                    setCart(res.data.cart);
                    setUser(res.data);
                } catch (err) {
                    console.log(err.response);
                }
            };
            getUser();
        }
    }, [token, isAdmin, isLogged]);

    // Payment
    useEffect(() => {
        if (token) {
            const getHistory = async () => {
                if (isAdmin) {
                    let res = await axios.get('/api/payment', {
                        headers: { Authorization: token },
                    });
                    setHistory(res.data);
                } else {
                    let res = await axios.get('/user/history', {
                        headers: { Authorization: token },
                    });
                    setHistory(res.data);
                }
            };
            getHistory();
        }
    }, [token, callback, isAdmin]);

    return {
        isLogged: [isLogged, setIslogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        history: [history, setHistory],
        callback: [callback, setCallback],
        addCart: addCart,
        user: [user, setUser],
    };
}

export default UsersApi;
