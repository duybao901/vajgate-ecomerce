import React, { useState, useContext } from 'react';
import { GlobleState } from '../../../GlobleState';
function Filter() {
    const state = useContext(GlobleState);
    const [queryInput, setQueryInput] = useState('');

    const [categories] = state.categoriesApi.categories;
    const setCategory = state.productsApi.category[1];
    const setQuery = state.productsApi.query[1];
    const setSort = state.productsApi.sort[1];
    const setPage = state.productsApi.page[1];
    const [result, setResult] = state.productsApi.result;

    const handleCategory = (e) => {
        const targets = document.querySelectorAll('li.filter-category');

        for (let i = 0; i < targets.length; i++) {
            if (
                targets[i].getAttribute('value') ===
                e.target.getAttribute('value')
            ) {
                targets[i].classList.add('active');
            } else {
                targets[i].classList.remove('active');
            }
        }

        if (e.target.getAttribute('value')) {
            setCategory('category=' + e.target.getAttribute('value'));
            setPage(1);
            setResult(result);
        } else {
            setCategory('');
        }
        setQuery('');
        setQueryInput('');
    };

    const handleQuery = (e) => {
        setQueryInput(e.target.value);
        setTimeout(() => {
            if (e.target.value === '') {
                setQuery('');
            } else {
                setQuery(e.target.value.toLowerCase());
            }
        }, 1000);
    };

    const handleSort = (e) => {
        const targets = document.querySelectorAll('li.filter-sort-item');

        for (let i = 0; i < targets.length; i++) {
            if (
                targets[i].getAttribute('value') ===
                e.target.getAttribute('value')
            ) {
                targets[i].classList.add('active');
            } else {
                targets[i].classList.remove('active');
            }
        }

        setSort(e.target.getAttribute('value'));
        setQuery('');
        setQueryInput('');
    };

    return (
        <div className="filter">
            <div className="filter-left">
                <ul>
                    <li
                        value=""
                        className="filter-category active"
                        onClick={handleCategory}
                    >
                        All
                    </li>
                    {categories.map((category) => {
                        return (
                            <li
                                className="filter-category"
                                key={category._id}
                                value={category.name}
                                onClick={handleCategory}
                            >
                                {category.name}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="filter-right">
                <div>
                    <input
                        className="filter-input"
                        onChange={handleQuery}
                        value={queryInput}
                        placeholder="Search Name..."
                    ></input>
                </div>
                <div className="filter-lable">
                    Filter
                    <i className="fas fa-sort-down"></i>
                    <div className="filter-sort">
                        <h3>SORT BY</h3>
                        <ul>
                            <li
                                className="filter-sort-item active"
                                onClick={handleSort}
                            >
                                Default
                            </li>
                            <li
                                className="filter-sort-item"
                                value="sort=-rented"
                                onClick={handleSort}
                            >
                                Popularity
                            </li>
                            <li
                                className="filter-sort-item"
                                value="sort=-createdAt"
                                onClick={handleSort}
                            >
                                Newness
                            </li>
                            <li
                                className="filter-sort-item"
                                value="sort=price"
                                onClick={handleSort}
                            >
                                Price: Low to High
                            </li>
                            <li
                                className="filter-sort-item"
                                value="sort=-price"
                                onClick={handleSort}
                            >
                                Price: High to Low
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filter;
