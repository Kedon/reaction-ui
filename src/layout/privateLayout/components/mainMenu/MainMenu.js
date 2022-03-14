import React from 'react';
import './main-menu.scss'

const MainMenu = ({menuIsOpen, toggleMenu}) => {

    return (
        <div className={`main-menu-element ${menuIsOpen ? 'show' : 'false'}`} onClick={toggleMenu}>
            
        </div>
    )
}

export default MainMenu