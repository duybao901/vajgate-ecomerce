import React, { useState, useEffect } from 'react';
import ProductsApi from './api/ProductsApi';
import UsersApi from './api/UsersApi';
import CategoriesApi from './api/CategoriesApi';
import axios from 'axios';

export const GlobleState = React.createContext();

export function DataProvider({ children }) {
    const [token, setToken] = useState(false);

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');
        if (firstLogin) {
            const refreshToken = async () => {
                const res = await axios.get('/user/refresh_token');
                setToken(res.data.accesstoken);

                setTimeout(() => {
                    refreshToken();
                }, 10 * 60 * 1000);
            };
            refreshToken();
        }
    }, [token]);

    const state = {
        token: [token, setToken],
        productsApi: ProductsApi(), // [products, setProducts]
        usersApi: UsersApi(token), // [isLogged, setIsLogged]; [isAdmin, setIsAdmin]; addCart ;  [cart, setCart]
        categoriesApi: CategoriesApi(),
    };

    return (
        <GlobleState.Provider value={state}>{children}</GlobleState.Provider>
    );
}
