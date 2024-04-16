import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div>
            <h1>404</h1>
            <h5>It seems this page no longer exists.</h5>
            <Link to="/">Go back to home page</Link>            
        </div>
    );
};

export default Error;