import React from 'react';

const Error = ({ message }) => {
    return <div className='error'><h1>Whoooops!</h1><h1>Something went wrong</h1><h3>Error: {message}</h3></div>
}

export default Error;