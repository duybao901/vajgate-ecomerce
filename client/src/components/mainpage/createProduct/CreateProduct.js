import React, { useState, useContext, useEffect } from 'react';
import { GlobleState } from '../../../GlobleState';
import DatePicker from 'react-datepicker';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import loadingimage from './loading.gif';

import 'react-datepicker/dist/react-datepicker.css';
import Tooltip from '@material-ui/core/Tooltip';

function CreateProduct() {
    const params = useParams();

    var initialState = {
        product_id: '',
        name: '',
        japanName: '',
        bust: 0,
        waist: 0,
        hip: 0,
        height: 0,
        blood_type: '',
        birthday: Date(),
        hobby: '',
        price: 0,
        category: '',
        images: {},
    };
    const history = useHistory();

    const state = useContext(GlobleState);
    const [categories] = state.categoriesApi.categories;
    const [products] = state.productsApi.products;
    const [callback, setCallback] = state.productsApi.callback;

    const [isAdmin] = state.usersApi.isAdmin;
    const [token] = state.token;

    const [product, setProduct] = useState(initialState);
    const [images, setImages] = useState(false);
    const [loading, setLoading] = useState(false);
    const [startdate, setStartDate] = useState(new Date());
    const [onEdit, setOnEdit] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (params.id) {
            products.forEach((product) => {
                if (product._id === params.id) {
                    setProduct(product);
                    setImages(product.images);
                    setStartDate(new Date(product.birthday));
                    setOnEdit(true);
                }
            });
        } else {
            setProduct(initialState);
            setImages(false);
            setOnEdit(false);
        }
    }, [params.id, products]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (onEdit) {
                if (!isAdmin) return alert("You're not an admin.");
                if (!images) return alert('Image not found.');
                await axios.put(
                    `/api/products/${product._id}`,
                    { ...product, birthday: startdate, images: images },
                    {
                        headers: { Authorization: token },
                    },
                );
                setCallback(!callback);
                history.push('/');
            } else {
                if (!isAdmin) return alert("You're not an admin.");
                if (!images) return alert('Image not found.');
                await axios.post(
                    '/api/products',
                    { ...product, birthday: startdate, images: images },
                    {
                        headers: { Authorization: token },
                    },
                );
                setCallback(!callback);
                history.push('/');
            }
        } catch (err) {
            alert(err.response.data.msg);
        }
    };
    const onHandleChange = (e) => {
        let targets = e.target;
        let name = targets.name;
        let value = targets.value.toLowerCase();
        setProduct({
            ...product,
            [name]: value,
        });
    };
    const onHandleUpload = async (e) => {
        e.preventDefault();
        try {
            if (!isAdmin) return alert("You're not an admin.");
            const file = e.target.files[0];

            if (!file) return alert('Image not found.');

            if (file.size > 1024 * 1024) {
                // 1mb
                return alert('Size too large.');
            }

            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                // 1mb
                return alert('File format is incorrect.');
            }

            let formDate = new FormData();
            formDate.append('file', file);

            setLoading(true);
            const res = await axios.post('/api/upload', formDate, {
                headers: {
                    'content-type': 'multipart/from-data',
                    Authorization: token,
                },
            });
            setLoading(false);
            setImages(res.data);
        } catch (err) {
            alert(err.response.data.msg);
        }
    };
    const handleDestroyImage = async () => {
        try {
            if (!isAdmin) return alert("You're not an admin.");
            setLoading(true);
            await axios.post(
                '/api/destroy',
                { public_id: images.public_id },
                {
                    headers: { Authorization: token },
                },
            );
            setLoading(false);
            setImages(false);
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    let styleImaheUpload = {
        display: images ? 'block' : 'none',
    };

    return (
        <div className="create-product container">
            <div className="cp-image-upload-box">
                {loading ? (
                    <div className="cp-loading-image">
                        {' '}
                        <img src={loadingimage} alt="loading-img"></img>
                    </div>
                ) : (
                    <>
                        <input
                            type="file"
                            className="cp-file-upload"
                            name="file"
                            id="file_up"
                            onChange={onHandleUpload}
                        ></input>
                        <img
                            className="cp-image-upload"
                            style={styleImaheUpload}
                            alt="img-upload"
                            src={images ? images.url : ''}
                        ></img>
                        {images ? (
                            <Tooltip title="Delete Image" placement="top">
                                <span
                                    className="cp-image-button"
                                    onClick={handleDestroyImage}
                                >
                                    X
                                </span>
                            </Tooltip>
                        ) : (
                            ''
                        )}
                    </>
                )}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="product_id" className="form-label">
                        Product ID
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={onHandleChange}
                        disabled={onEdit ? true : false}
                        value={product.product_id}
                        id="product_id"
                        name="product_id"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={onHandleChange}
                        value={product.name}
                        id="name"
                        name="name"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="japanName" className="form-label">
                        Japan Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={onHandleChange}
                        value={product.japanName}
                        id="japanName"
                        name="japanName"
                        required
                    />
                </div>
                <div style={{ display: 'flex' }}>
                    <div className="mb-3 mr-3">
                        <label htmlFor="bust" className="form-label">
                            Bust
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            onChange={onHandleChange}
                            value={product.bust}
                            id="bust"
                            name="bust"
                            required
                        />
                    </div>
                    <div className="mb-3 mr-3">
                        <label htmlFor="waist" className="form-label">
                            Waist
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            onChange={onHandleChange}
                            value={product.waist}
                            id="waist"
                            name="waist"
                            required
                        />
                    </div>
                    <div className="mb-3 mr-3">
                        <label htmlFor="hip" className="form-label">
                            Hip
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            onChange={onHandleChange}
                            value={product.hip}
                            id="hip"
                            name="hip"
                            required
                        />
                    </div>
                    <div className="mb-3 mr-3">
                        <label htmlFor="height" className="form-label">
                            Height
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            onChange={onHandleChange}
                            value={product.height}
                            id="height"
                            name="height"
                            required
                        />
                    </div>
                </div>
                <span className="d-block">Birthday</span>
                <DatePicker
                    selected={startdate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                />
                <div className="mb-3 mt-3">
                    <label htmlFor="blood_type" className="form-label">
                        Blood Type
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={onHandleChange}
                        value={product.blood_type}
                        id="blood_type"
                        name="blood_type"
                        required
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="hobby" className="form-label">
                        Hobby
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={onHandleChange}
                        value={product.hobby}
                        id="hobby"
                        name="hobby"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                        Price
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        onChange={onHandleChange}
                        value={product.price}
                        id="price"
                        name="price"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="category"
                        className="form-label"
                        style={{ marginRight: '20px' }}
                    >
                        Category:
                    </label>
                    <select
                        name="category"
                        id="category"
                        value={product.category}
                        onChange={onHandleChange}
                        required
                    >
                        <option value="">Please select a category</option>
                        {categories.map((category) => {
                            return (
                                <option
                                    value={category.category}
                                    key={category._id}
                                >
                                    {category.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <button type="submit" className="cp-button">
                    {onEdit ? 'Upadte' : 'Create'}
                </button>
            </form>
        </div>
    );
}

export default CreateProduct;
