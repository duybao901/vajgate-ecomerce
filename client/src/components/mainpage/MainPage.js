import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Cart from './cart/Cart';
import Products from './products/Products';
import Register from './auth/register/Register';
import Login from './auth/login/Login';
import NotFoundPage from './utils/notFoundPage/NotFoundPage';
import DetailProduct from './detailsProduct/DetailsProduct';
import History from './history/OrderHistory';
import DetailHistory from './history/DetailHistory';
import Categories from './categories/Categories';
import CreateProduct from './createProduct/CreateProduct';
import { GlobleState } from '../../GlobleState';

export default function MainPage() {
    const state = useContext(GlobleState);
    const [isAdmin] = state.usersApi.isAdmin;
    const [isLogged] = state.usersApi.isLogged;
    return (
        <div>
            <Switch>
                <Route path="/" component={Products} exact></Route>
                <Route path="/detail/:id" component={DetailProduct} exact />
                <Route path="/cart" component={Cart} exact></Route>
                <Route
                    path="/register"
                    component={isLogged ? NotFoundPage : Register}
                    exact
                ></Route>
                <Route
                    path="/login"
                    component={isAdmin ? NotFoundPage : Login}
                    exact
                ></Route>
                <Route
                    path="/history"
                    component={isLogged ? History : NotFoundPage}
                    exact
                ></Route>
                <Route
                    path="/history/:id"
                    component={isLogged ? DetailHistory : NotFoundPage}
                    exact
                ></Route>
                <Route
                    path="/categories"
                    component={isAdmin ? Categories : NotFoundPage}
                    exact
                ></Route>
                <Route
                    path="/create_product"
                    component={isAdmin ? CreateProduct : NotFoundPage}
                    exact
                ></Route>
                <Route
                    path="/product/edit/:id"
                    component={isAdmin ? CreateProduct : NotFoundPage}
                    exact
                ></Route>

                <Route path="*" component={NotFoundPage} exact></Route>
            </Switch>
        </div>
    );
}
