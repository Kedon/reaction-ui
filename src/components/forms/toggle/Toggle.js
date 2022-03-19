import React from 'react'
import "./toggle.scss"

function Toggle({ label, value, onChange, name, id, className, color }) {

function changeToggle(){
    onChange({
        target:{
            name: name,
            value: !value
        }
    })
}

return (
      <div className={`rc-toggle-ui ${className ? className : ''}`} onClick={changeToggle}>
          <div className={`rc-toggle-ui-button ${value ? 'on' : 'off'} ${color ? color : ''}`}>
            <div className='rc-toggle-ui-bullet'></div>
          </div>
          <span>{label}</span>
      </div>
  )
}
export default Toggle
