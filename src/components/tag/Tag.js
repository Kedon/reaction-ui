import React from 'react'
import "./tag.scss"

function Toggle({ label, className, color }) {
return (
      <span className={`ui-tag ${color ? color : ''} ${className ? className : ''}`}>
          <span>{label}</span>
      </span>
  )
}
export default Toggle
