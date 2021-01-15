import React, { useContext } from 'react';
import { GlobleState } from '../../../GlobleState';

function LoadMore() {
    const state = useContext(GlobleState);
    const [page, setPage] = state.productsApi.page;
    const result = state.productsApi.result[0];
    if (result < page * 9) {
        return null;
    } else {
        return (
            <div className="load-more" onClick={() => setPage(page + 1)}>
                Load More
                <i className="fas fa-sort-down"></i>
            </div>
        );
    }
}

export default LoadMore;
