import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header'
import MainMenu from './components/mainMenu/MainMenu';
import { Navigate } from 'react-router-dom'

import './private-layout.scss'

const PrivateLayout = ({ component: RouteComponent   }) => {
    const userData = JSON.parse(localStorage.getItem('user'))
    const [user, setUser ] = useState(userData)
    const [menuIsOpen, setMenuIsOpen ] = useState(false)
    function toggleMenu(){
        setMenuIsOpen(!menuIsOpen)
    }
    if (user) {
        return (
            <>
                <div className={`main-container ${menuIsOpen ? 'menu-is-open' : ''}`}>
                    <Header toggleMenu={toggleMenu} menuIsOpen={menuIsOpen} />
                    <div className="body-container">
                        <div className="container d-flex mh-100">
                            <RouteComponent />
                        </div>
                    </div>
                    <div className="footer">Footer</div>
                </div>
                <MainMenu menuIsOpen={menuIsOpen} toggleMenu={toggleMenu}/>
            </>
        )
    }
    return <Navigate to="/" />

}
export default PrivateLayout