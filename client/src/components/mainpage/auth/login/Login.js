import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import loginImg1 from './login-1.png';

import axios from 'axios';

// MUI stuff
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Login() {
    const [user, setUser] = useState({
        email: '',
        password: '',
        loading: false,
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const onHandleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        setUser({ ...user, loading: true });

        try {
            await axios.post('/user/login', { ...user });

            localStorage.setItem('firstLogin', true);
            setUser({ ...user, loading: false });

            window.location.href = '/';
        } catch (err) {
            setUser({ ...user, loading: false });
            if (user.email === '') {
                setErrors({ msg: 'Email not empty' });
            } else {
                if (user.password === '') {
                    setErrors({ msg: 'Password not empty' });
                } else {
                    setErrors(err.response.data);
                }
            }
        }
    };
    return (
        <div className="login register">
            <div className="login-img">
                <img src={loginImg1} alt="login-img"></img>
            </div>
            <form
                noValidate
                autoComplete="off"
                onSubmit={onSubmit}
                className="form-login"
            >
                <TextField
                    autoComplete=""
                    label="Email"
                    variant="outlined"
                    value={user.email}
                    onChange={onHandleChange}
                    name="email"
                    className="form-input"
                    required={true}
                    helperText={
                        errors.msg === 'Email not empty'
                            ? errors.msg
                            : errors.msg === 'Tài khoản không tồn tại'
                            ? 'User not exits'
                            : ''
                    }
                    error={
                        errors.msg === 'Email not empty' ||
                        errors.msg === 'Tài khoản không tồn tại'
                            ? true
                            : false
                    }
                />
                <TextField
                    autoComplete=""
                    label="Password (6+ Charactor)"
                    variant="outlined"
                    required={true}
                    value={user.password}
                    onChange={onHandleChange}
                    name="password"
                    type="password"
                    className="form-input"
                    helperText={
                        errors.msg === 'Password not empty'
                            ? errors.msg
                            : errors.msg === 'Mật khẩu không đúng'
                            ? 'Password wrong'
                            : ''
                    }
                    error={
                        errors.msg === 'Password not empty' ||
                        errors.msg === 'Mật khẩu không đúng'
                            ? true
                            : false
                    }
                />
                <div className="login-group">
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onSubmit={onSubmit}
                        disabled={user.loading}
                    >
                        {user.loading ? (
                            <CircularProgress size={25} />
                        ) : (
                            'Login'
                        )}
                    </Button>

                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    );
}
