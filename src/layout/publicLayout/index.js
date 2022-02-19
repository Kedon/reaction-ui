import React from 'react';
import './style.scss'

const PublicLayout = ({ children }) => {
    return (
        <div className="component-public">
            <h1>Public</h1>
            {children}
        </div>
    )
}

export default PublicLayout