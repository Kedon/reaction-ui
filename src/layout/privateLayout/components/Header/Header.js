import React from 'react';
import { ReactComponent as Logo } from '../../../../assets/images/logo.svg';
import Avatar from '../../../../components/avatar/Avatar'
import './header.scss'

const Header = ({toggleMenu}) => {

    return (
        <div className="header-element">
            <div className="header-menu" onClick={toggleMenu}/>
            <Logo width={150} height={20} />
            <div className="header-user-account"><Avatar name="Valdenir Flauzino" /></div>
        </div>
    )
}

export default Header