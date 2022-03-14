import React from "react"
import { X } from "react-feather"
import classnames from "classnames"
import Card from "../card/Card"
import "./modal.scss"


class ModalWindow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show
        }
     }

    handleOpenModal = () => {
          this.props.toggle()
    }

    componentDidMount = () => {
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.pressedKeyboardKey)
    }

    componentDidUpdate = (prevProps) => {
        const prevShow = prevProps.show
        const currShow = this.props.show
        if(prevShow !== currShow){
            if(currShow) window.addEventListener('keydown',  this.pressedKeyboardKey)       
            else window.removeEventListener('keydown', this.pressedKeyboardKey)
        }
    }

    pressedKeyboardKey = (key) => {
        console.log(key)
        if(key.code.toLowerCase() === 'escape' || key.keyCode === 27){
            this.props.toggle()
        }

        if(key.code.toLowerCase() === 'enter' || key.keyCode === 13){
            this.props.onPressEnter()
        }
    }
    
    render() {
        const { show, position, title, size, illustration, className, style, color } = this.props
        return (
                <div className={`modal-window-container ${show ? 'show' : ''}  ${position}`} style={style ? style : {}}>
                    <div className={`modal-window-overlay ${show ? 'show' : ''}`} onClick={this.handleOpenModal} />
                    <div
                    className={classnames(
                        `modal-window ${color} ${show ? 'show' : ''} ${className ? className : ''}`,
                        {
                          "top": position === "top",
                          "center": position === "center",
                          "bottom": position === "bottom",
                        },
                        {
                          "window-mn": size === "mn",
                          "window-xs": size === "xs",
                          "window-sm": size === "sm",
                          "window-md": size === "md",
                          "window-lg": size === "lg",
                          "window-xl": size === "xl",
                          "window-mx": size === "mx",
                        }
                      )}
                      >
                          <Card
                            title={title}
                            footer={this.props.footer}
                        >
                            {this.props.children}
                        </Card>
                        <div className="ct-close" onClick={this.handleOpenModal}>
                            <X />
                        </div>
                    </div>
                </div>
        )
    }
}

export default ModalWindow