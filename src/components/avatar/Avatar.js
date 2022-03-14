import React, { useState, useEffect } from 'react';
import './avatar.scss'

const Avatar = ({ name  }) => {
    const fullname = name.split(' ')
    const userInitials = fullname.length === 1 ? fullname.substring(2) : fullname.shift().charAt(0) + fullname.pop().charAt(0);
   
    return <div className="avatar-ui">{userInitials}</div>

}
export default Avatar