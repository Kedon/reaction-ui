import React, { useState, useEffect, useCallback } from "react"
import { XCircle, AlertCircle, CheckCircle, X } from 'react-feather'
import "./card.scss"


const icons = {
  success: <CheckCircle />,
  warning: <AlertCircle />,
  danger: <XCircle />,

}

function Card({title, children, footer, message, onPressEnter}){
  const handleUserKeyPress = useCallback(event => {
    const { key, keyCode } = event;
    if(keyCode === 13){
      console.log('enter')
      onPressEnter && onPressEnter()
    }
}, []);

useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
        window.removeEventListener("keydown", handleUserKeyPress);
    };
}, [handleUserKeyPress]);
  
    const [bodyMessage, setBodyMessage ] = useState(null)
    useEffect(() => {
      if(message){
        let timer1, timer2, timer3
        setBodyMessage({...message, show: false})
        timer1 = setTimeout(() => {
          setBodyMessage({...message, show: true})
        }, 140)

        timer2 = setTimeout(() => {
          setBodyMessage({...message, show: false})
          timer3 = setTimeout(() => {
           setBodyMessage(null)
          }, 500)
        }, 5000)
        return () => {
          clearTimeout(timer1)
          clearTimeout(timer2)
          clearTimeout(timer3)

        }
      }
    }, [message])
     
    return (
        <div className={`body-card-container ${bodyMessage && bodyMessage.show ? bodyMessage.type : ''}`}>
          {bodyMessage && bodyMessage.message &&
            <div className={`body-card-message ${bodyMessage && bodyMessage.show ? 'show' : ''} ${bodyMessage.type ? bodyMessage.type : 'default'}`}>
              <div className="d-flex w-100">
                <div className="flex-grow-1">
                  {bodyMessage.type && icons[bodyMessage.type]} {bodyMessage.message}
                </div>
                <div className="body-card-close-button"onClick={() => setBodyMessage(false)}><X sixe={12} /></div>
              </div>
            </div>
          }
            <div className="body-card-header text-center">
              <h2>{title}</h2>
            </div>
            <div className="body-card-content">
              {children}
            </div>
            <div className="body-card-footer">
              {footer}
            </div>
        </div>
    )
}

export default Card
