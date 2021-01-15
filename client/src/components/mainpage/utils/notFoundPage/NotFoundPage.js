import React from 'react';
import { Link } from 'react-router-dom';
import NotFound from './not_found.gif';

export default function NotFoundPage() {
    return (
        <div className="notfound">
            <h2>404</h2>
            <img src={NotFound} alt="notfound-img"></img>
            <p>
                Look like you're lost
                <br />
                the page you are looking for not avaible!
            </p>
            <Link to="/">Go to Home</Link>
        </div>
    );
}
