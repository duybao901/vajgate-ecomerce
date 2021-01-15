import React, { useState, useContext, useEffect } from 'react';
import { GlobleState } from '../../../GlobleState';
import axios from 'axios';
function Categories() {
    const state = useContext(GlobleState);
    const [categories] = state.categoriesApi.categories;
    const [callback, setCallback] = state.categoriesApi.callback;
    const [token] = state.token;

    const [category, setCategory] = useState('');
    const [id, setId] = useState('');
    const [onEdit, setOnEdit] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const onHanldeSubmit = async (e) => {
        e.preventDefault();
        try {
            if (onEdit) {
                await axios.put(
                    `/api/category/${id}`,
                    { name: category },
                    {
                        headers: { Authorization: token },
                    },
                );
                setOnEdit(false);
            } else {
                await axios.post(
                    '/api/category',
                    { name: category },
                    {
                        headers: { Authorization: token },
                    },
                );
                alert(`Add ${category} successfully`);
            }
            setCategory('');
            setCallback(!callback);
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    const editCategory = (id, name) => {
        setOnEdit(true);
        setId(id);
        setCategory(name);
    };
    const deleteCategory = async (id, name) => {
        if (window.confirm('You want delete this category')) {
            try {
                await axios.delete(`/api/category/${id}`, {
                    headers: { Authorization: token },
                });
                setCallback(!callback);
            } catch (err) {
                alert(err.response.data.msg);
            }
        }
    };

    return (
        <div className="categories">
            <div className="container">
                <div className="categories-body">
                    <div className="categories-form">
                        <form onSubmit={onHanldeSubmit}>
                            <label
                                htmlFor="category"
                                className="categories-label"
                            >
                                Category
                            </label>
                            <input
                                type="text"
                                name="category"
                                id="category"
                                className="categories-input"
                                value={category}
                                required
                                onChange={(e) => setCategory(e.target.value)}
                            ></input>
                            <button
                                type="submit"
                                className="categories-button"
                                style={{ width: '80px' }}
                            >
                                {onEdit ? 'Update' : 'Save'}
                            </button>
                        </form>
                    </div>
                    <div className="categories-list">
                        {categories.map((category) => {
                            return (
                                <div
                                    key={category._id}
                                    className="categories-item"
                                >
                                    <div className="categories-item-name">
                                        {category.name}
                                    </div>
                                    <div>
                                        <button
                                            className="categories-button"
                                            style={{ marginRight: '10px' }}
                                            onClick={() =>
                                                editCategory(
                                                    category._id,
                                                    category.name,
                                                )
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="categories-button"
                                            onClick={() =>
                                                deleteCategory(
                                                    category._id,
                                                    category.name,
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Categories;
