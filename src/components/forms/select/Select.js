import React, {useEffect,useState,useRef} from 'react'
import Input from '../input/Input'


function Select({id, type, className, autoComplete, name, placeholder, value, onChange, errorMessage, fieldDescription, fieldIcon, placeholderStyle, clear, handleClearInput, options, totalRows, showing}) {
    const [ showList, setShowList ] = useState(false)
    const [ selectedOption, setSelectedOption ] = useState(null)
    const [ search, setSearch ] = useState('')
    const inputFunc = useRef()

    function clickOutsideModal(evt){
        const search = document.getElementById("select-input-field");
        const chevron = document.getElementById("input-field-chevron");
        const selected = document.getElementById("selected-item");


        let targetElement = evt.target; // clicked element
        console.log(targetElement)
        if(targetElement && targetElement.className === 'input-form-clear') return
        if(evt.target.name === 'input-field-chevron' && !showList){
            console.log(`Show: ${evt.target.name}`)
            setShowList(true)
            return
        } else if(evt.target.name === 'select-input-field' && this.state.showList){
            console.log(`Remove: ${evt.target.name}`)

            setShowList(false)
            return
        } else if(evt.target.className === 'title truncate' || evt.target.className === 'span-label'/* || */){
            setShowList(false)
            return
        }

        do {
            if (targetElement == search) {
                // This is a click inside. Do nothing, just return.
                console.log(`Show: ${evt.target.name}`)
                if(typeof evt.target.name === 'undefined') return
                if(targetElement == selected){ search.focus() }
                setShowList(true)
                return
            } else if(targetElement === chevron){
                if(!showList) inputFunc.current.setFocus()
                setShowList(!showList)
                return
            }
            // Go up the DOM
            targetElement = targetElement.parentNode;
        } while (targetElement);
    
        // This is a click outside.
        if(showList){
            setShowList(false)
    
        }

    }

    function handleSelectedOption(option){
        console.log({name, option})
        setShowList(false)
        onChange({name, option})
        setSearch('')
    }

    function toggleShowList(){
        setShowList(!showList)
        inputFunc.current.setFocus()
    }

    useEffect(() => {
        window.addEventListener("click", clickOutsideModal);
        return () => {
            window.removeEventListener("click", clickOutsideModal);
        };
    }, [clickOutsideModal]);

    function handleRemoveOption(){
        onChange({name, options: null})
        setShowList(true)
        inputFunc.current.setFocus()
    }

    function handleClearInput(){
        setSearch('')
        setShowList(true)
        inputFunc.current.setFocus()
    }

    const selectOptions = options && options.length > 0 ? options.filter( f => {
        if(search.trim().length > 0){
            return f.option.toLowerCase().includes( search.toLocaleLowerCase())
        } else {
            return f
        }

    }) : []

  return (
    <div className={`select-box-list-container ${className ? className : ''}`}>
        <div className="select-box">
            <Input
                id="select-input-field"
                placeholder={placeholder}
                placeholderTop={value && value.option}
                value={search}
                onChange={ e => setSearch(e.target.value)}
                ref={inputFunc}
                clear
                handleClearInput={handleClearInput}
                errorMessage={errorMessage}
                fieldDescription={fieldDescription}
                fieldIcon={fieldIcon}
            />
            {value && search.trim().length === 0 && 
            <React.Fragment>
                <div className="selected-item" id="selected-item">
                    <div className="selected-item-info">
                        <div className="selected-item-name truncate" onClick={toggleShowList}>
                            {value && value.label}
                        </div>
                    </div>
                </div>
                <div className="remove-selected">
                    <div className="input-form-clear danger" onClick={handleRemoveOption}>+</div>
                </div>
            </React.Fragment>
            }
            
            <div className="input-field-chevron" id="input-field-chevron">
                &#8964;
            </div>
        </div>
        

        <div className={`select-box-list-body ${showList ? 'show' : ''}`} id="user-list-modal">
            <ul>
                {selectOptions && selectOptions.length > 0  ? 
                    selectOptions.map( (option, i) => {
                        return (
                            <li key={`li_${i}`}  className={`${value && value.value === option.value ? 'selected' : ''}`} onClick={() => handleSelectedOption(option)}>{option.label}</li>
                        )
                    })
            : null}
            </ul>
        </div>
    </div>
  )
}

export default Select