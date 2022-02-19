import React from 'react';
import './style.scss'

const PrivateLayout = ({ children }) => {
    return (
        <div className="component-private">
            <h1>Private</h1>
            {children}
        </div>
    )
}

export default PrivateLayout