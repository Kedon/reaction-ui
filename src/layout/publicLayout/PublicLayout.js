import React from 'react';

const PublicLayout = ({ component: RouteComponent   }) => {
    return (<div className="body-container">
                <RouteComponent />
            </div>
    )
}
export default PublicLayout