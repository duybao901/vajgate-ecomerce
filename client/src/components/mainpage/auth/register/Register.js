import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import loginImg from './login-img.jpg';
import axios from 'axios';

// MUI stuff
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Register() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        images: {},
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
            await axios.post('/user/register', { ...user });

            localStorage.setItem('firstLogin', true);
            setUser({ ...user, loading: false });

            window.location.href = '/';
        } catch (err) {
            setUser({ ...user, loading: false });
            if (user.email === '') {
                setErrors({ msg: 'Email not empty' });
            } else {
                if (user.name === '' && user.email !== '') {
                    setErrors({ msg: 'Name not empty' });
                } else {
                    setErrors(err.response.data);
                }
            }
        }
    };
    return (
        <div className="login register">
            <div className="login-img">
                <img src={loginImg} alt="login-img"></img>
            </div>
            <form
                noValidate
                autoComplete="off"
                onSubmit={onSubmit}
                className="form-login"
            >
                <TextField
                    label="Name"
                    variant="outlined"
                    value={user.name}
                    onChange={onHandleChange}
                    name="name"
                    required={true}
                    className="form-input"
                    helperText={
                        errors.msg === 'Name not empty' ? errors.msg : ''
                    }
                    error={errors.msg === 'Name not empty' ? true : false}
                    autoComplete=""
                ></TextField>
                <TextField
                    label="Email"
                    variant="outlined"
                    value={user.email}
                    onChange={onHandleChange}
                    name="email"
                    className="form-input"
                    required={true}
                    helperText={
                        errors.msg === 'Email not empty' ? errors.msg : ''
                    }
                    error={errors.msg === 'Email not empty' ? true : false}
                    autoComplete=""
                />
                <TextField
                    label="Password (6+ Charactor)"
                    variant="outlined"
                    required={true}
                    value={user.password}
                    onChange={onHandleChange}
                    name="password"
                    type="password"
                    className="form-input"
                    autoComplete=""
                    helperText={
                        errors.msg === 'Mật khẩu không được nhỏ hơn 6 ký tự'
                            ? 'Password must not be less than 6 characters'
                            : ''
                    }
                    error={
                        errors.msg === 'Mật khẩu không được nhỏ hơn 6 ký tự'
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
                            'Register'
                        )}
                    </Button>

                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    );
}
