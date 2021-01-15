import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import Cart from './icons/cart.svg';
import Menu from './icons/menu.svg';
import './header.css';
import CartHover from '../mainpage/cartHover/CartHover';
import { GlobleState } from '../../GlobleState';

export default function Header() {
    const state = useContext(GlobleState);
    const [isLogged] = state.usersApi.isLogged;
    const [isAdmin] = state.usersApi.isAdmin;
    const [cart] = state.usersApi.cart;
    const [profile, setProfile] = useState(false);
    const [menu, setMenu] = useState(false);

    const user = state.usersApi.user[0];
    useEffect(() => {
        if (user) {
            setProfile(document.querySelector('.profile'));
        }
    }, [user]);

    useEffect(() => {
        if (profile) {
            profile.addEventListener('click', function () {
                profile.classList.toggle('active');
            });
        }
    }, [profile]);

    const logoutUser = async () => {
        await axios.get('user/logout');
        localStorage.clear();
        window.location.href = '/';
    };
    const adminRoute = () => {
        return (
            <>
                <NavLink
                    to="/create_product"
                    activeClassName="nav-link--active"
                    className="nav-link"
                    exact
                >
                    Create Product
                </NavLink>
                <NavLink
                    to="/categories"
                    activeClassName="nav-link--active"
                    className="nav-link"
                    exact
                >
                    Categories
                </NavLink>
            </>
        );
    };

    const userRoute = () => {
        return (
            <>
                <img
                    src={user.images.url}
                    alt="menu"
                    className="profile-image"
                ></img>
                <div className="profile-indicator"></div>
                <NavLink
                    to="/history"
                    activeClassName="nav-link--active"
                    className="nav-link "
                    exact
                >
                    History
                </NavLink>
                <NavLink
                    to="/"
                    activeClassName=""
                    className="nav-link "
                    exact
                    onClick={logoutUser}
                >
                    Logout
                </NavLink>
            </>
        );
    };

    useEffect(() => {
        const menu1 = document.querySelector('.menu');
        menu1.addEventListener('click', () => {
            setMenu(true);
        });
    }, []);

    return (
        <header className="header" id="header">
            <h2>
                <Link
                    to="/"
                    exact="true"
                    className="logo"
                    style={isAdmin ? { fontSize: '20px' } : {}}
                >
                    VAJGATE{isAdmin ? '-Admin' : ''}
                </Link>
            </h2>
            <ul className="nav">
                <li>
                    <NavLink
                        to="/"
                        activeClassName="nav-link--active"
                        className="nav-link"
                        exact
                    >
                        Home
                    </NavLink>
                </li>
                {isAdmin ? adminRoute() : ''}
            </ul>
            <div className="header-right">
                <div className={isLogged === false ? 'cart' : 'cart'}>
                    <Link to="/cart">
                        <span className="nb">{cart.length}</span>
                        <img src={Cart} alt="cart"></img>
                    </Link>
                    <CartHover cart={cart} />
                </div>

                {isLogged && user ? (
                    <>
                        <div className="menu">
                            <img className="header-menu" src={Menu}></img>
                        </div>
                        <div
                            className={
                                menu ? 'rp-menu-child active' : 'rp-menu-child'
                            }
                        >
                            <div
                                className="rp-menu-child-close"
                                onClick={() => setMenu(false)}
                            >
                                X
                            </div>
                            <div
                                style={{
                                    display: 'block',
                                    textAlign: 'center',
                                    width: '100%',
                                }}
                            >
                                <NavLink
                                    to="/history"
                                    activeClassName="nav-link--active"
                                    className="nav-link "
                                    exact
                                >
                                    History
                                </NavLink>
                                <NavLink
                                    to="/"
                                    activeClassName=""
                                    className="nav-link "
                                    exact
                                    onClick={logoutUser}
                                >
                                    Logout
                                </NavLink>
                            </div>
                            {isAdmin ? adminRoute() : ''}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="menu">
                            <img className="header-menu" src={Menu}></img>
                        </div>
                        <div
                            className={
                                menu ? 'rp-menu-child active' : 'rp-menu-child'
                            }
                        >
                            <div
                                className="rp-menu-child-close"
                                onClick={() => setMenu(false)}
                            >
                                X
                            </div>
                            <div
                                style={{
                                    display: 'block',
                                    textAlign: 'center',
                                    width: '100%',
                                }}
                            >
                                <div>
                                    <NavLink
                                        to="/login"
                                        className="nav-link"
                                        activeClassName="nav-link--active"
                                    >
                                        Login
                                    </NavLink>
                                </div>
                                <div>
                                    <NavLink
                                        to="/register"
                                        className="nav-link"
                                        activeClassName="nav-link--active"
                                    >
                                        Register
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {isLogged && user ? (
                    <div className="profile-box">
                        <div className="profile">
                            <div className="profile-name">{user.name}</div>
                            <i className="fas fa-sort-down"></i>
                        </div>
                        <div className="profile-child">{userRoute()}</div>
                    </div>
                ) : (
                    <div className="menu-login-sm">
                        <div>
                            <NavLink
                                to="/login"
                                className="nav-link"
                                activeClassName="nav-link--active"
                            >
                                Login
                            </NavLink>
                        </div>
                        <div>
                            <NavLink
                                to="/register"
                                className="nav-link"
                                activeClassName="nav-link--active"
                            >
                                Register
                            </NavLink>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
