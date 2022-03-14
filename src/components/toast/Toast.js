import React, { useEffect, useRef, useState } from 'react';
import { X, CheckCircle, Info, XCircle } from 'react-feather'

const icon = {
  warning: <Info />,
  danger: <XCircle />,
  success: <CheckCircle />,
}

function Toast({ children, remove, color, autoClose }) {
  const removeRef = useRef();
  removeRef.current = remove;
  useEffect(() => {
    const duration = typeof autoClose && autoClose > 0 ? autoClose : 5000;
    const id = setTimeout(() => removeRef.current(), duration);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className={`custom-toast ${color}`}>
      <div className="custom-toast__text">
       {color && <div className='custom-toast__icon'>{icon[color]}</div>} <span>{ children }</span>
      </div>
      <div>
        <button onClick={remove} className="custom-toast__close-btn"><X size={15} /></button>
      </div>
    </div>
  );
}

export default Toast;