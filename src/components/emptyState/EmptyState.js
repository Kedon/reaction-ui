import React from "react"
import "./empty-state.scss"

class EmptyStates extends React.Component {
  render() {
      const { loading, title, description, type, spinnerColor } = this.props
    return (
        <div className="empty-container">
            <div className={`noting-state ${this.props.className ? this.props.className : ''}`}>
              {this.props.illustration ? 
                this.props.illustration :
                <img src={require(`../../assets/images/nothing_here${typeof type !== 'undefined' ? `_${type}` : ''}.svg`)} alt={title ? title : description} />
              }
                {title && <h3>{title}</h3>}
                <p className="mb-0" dangerouslySetInnerHTML={{ 
                  __html: description
              }}/>
            </div>
        </div>
    )
  }
}

export default (EmptyStates)