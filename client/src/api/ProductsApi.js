import { useState, useEffect } from 'react';
import axios from 'axios';

function ProductsApi() {
    const [products, setProducts] = useState([]);
    const [callback, setCallback] = useState(false);
    const [loadingAPI, setLoadingAPI] = useState(false);
    const [category, setCategory] = useState('');
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('');
    const [query, setQuery] = useState('');
    const [result, setResult] = useState(0);
    useEffect(() => {
        const getProducts = async () => {
            setLoadingAPI(true);
            const res = await axios.get(
                `/api/products?limit=${page * 9}&${sort}&${category}&name[regex]=${query}`,
            );
            setLoadingAPI(false);
            setProducts(res.data.products);
            setResult(res.data.results);
        };
        getProducts();
    }, [callback, category, sort, query]);

    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get(
                `/api/products?limit=${page * 9}&${sort}&${category}&name[regex]=${query}`,
            );
            setProducts(res.data.products);
            setResult(res.data.results);
        };
        getProducts();
    }, [page]);

    return {
        products: [products, setProducts],
        callback: [callback, setCallback],
        category: [category, setCategory],
        page: [page, setPage],
        sort: [sort, setSort],
        query: [query, setQuery],
        result: [result, setResult],
        loadingAPI: [loadingAPI, setLoadingAPI],
    };
}

export default ProductsApi;
