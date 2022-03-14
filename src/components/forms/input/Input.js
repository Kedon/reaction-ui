import React from 'react'
import "./input.scss"
const { forwardRef, useRef, useState, useImperativeHandle } = React;

const Input = forwardRef(({id, type, className, autoComplete, name, placeholder, placeholderTop, value, onChange, errorMessage, warningMessage, fieldDescription, fieldIcon, placeholderStyle, clear, handleClearInput, hint, maxLength, minValue, maxValue}, ref) => {
  
  const [state, setState] = useState(0);
  const inputRef = useRef();

  const setFocus = () => {
    inputRef.current.focus();
    setState(state => state + 1)
  };

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  useImperativeHandle(ref, () => ({
    setFocus,
  }));

  /*
  Caso seja um campo númérico e o desenvolvedor tenha informado os limitadores de mínimo e máximo,
  a função abaixo irá impedir que o campo aceite valores abaixo ou acima do mínimo e do máximo permitido,
  respectivammente
  */
  function changeValue(e){
    let ev = e
    if(type === 'number' && minValue >= 0 &&  Number(e.target.value) <= Number(minValue) ){
      ev.target.value = minValue.toString()
    } else if(type === 'number' && maxValue >= 0 && Number(e.target.value) > Number(maxValue)){
      ev.target.value = maxValue.toString()
    } else {
      ev.target.value = e.target.value
    }
    console.log(ev.target.value)
    onChange(ev)
  }

  return (
    <div className={`input-form-group ${className ? className : ''} ${errorMessage ? 'is-invalid' : ''} ${warningMessage ? 'user-field-warning' : ''}`}>
      <div className={`input-form ${fieldIcon ? `has-icon ${fieldIcon.position}` : ''}`}>
        <input maxLength={maxLength ? maxLength : null} ref={inputRef} type={type ? type : 'text'} id={id} autoComplete={autoComplete} name={name} placeholder=" " value={value} onChange={ e => changeValue(e)} />
        {fieldIcon && <div className={`input-field-icon ${fieldIcon.position}`}>{fieldIcon.icon}</div>}
        <label className={`${placeholderStyle === 'hide' ? 'hide' : 'animated '} ${placeholderTop ? 'placeholder-top' : ''} truncate`} htmlFor={id}>{placeholder}</label>
      </div>
      {/*(maxLength && maxLength > 0) || errorMessage || fieldDescription &&*/
            <div className="fields-legends">
            <div className="fields-legends-descriptions">
              {errorMessage ? <small className="danger">{errorMessage}</small>: warningMessage ? <small className="warning">{warningMessage}</small> : fieldDescription ? <small>{fieldDescription}</small>: null }
            </div>
            {maxLength && maxLength > 0 &&
            <div className="fields-legends-counter">
              {value.length}/{maxLength}
            </div>
            }
            
          
          </div>
      }
      {clear && value && value.trim().length > 0 &&   <div className={`input-form-clear ${hint ? 'has-hint' : ''}`} onClick={handleClearInput}>+</div>}
      {hint && <span className="input-form-hint">
          <div className="input-hint-icon">i</div>
          <div className="input-hint-text">{hint}</div>
        </span>}
    </div>
  )
})

export default Input