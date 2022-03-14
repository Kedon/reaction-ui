
import React from "react"
import { Form  } from "reactstrap"
import { Search, X } from "react-feather"
import Input from "../forms/input/Input"
import "./searchbar.scss"

const status = [
  { value: null, label: "Selecione uma opção" },
  { value: false, label: "Desativar" },
  { value: true, label: "Ativar" }
]

class SearchBar extends React.Component {
    typingTimer = null;
    state = {
        value: '',
        searchArea: false
      }
    formSubmit = e => {
        e.preventDefault();
        const { value } = this.state;
        this.props.handleTermFilter(value)
        // send to server with e.g. `window.fetch`
      
      }

      handleChange = (e) => {
        const searchTerm = e.target.value
        this.setState({
            value: searchTerm
        }, () => {
          const val = searchTerm;
          clearTimeout(this.typingTimer);
          this.typingTimer = setTimeout(() => {
            if (searchTerm.trim().length > 0 || searchTerm === '') {
                this.props.handleTermFilter(searchTerm)
            }
          }, 500);
        })
        /**/

        //this.setState({value: e.target.value}, () => this.props.handleTermFilter(this.state.value))
      }
      handleClearInput = () => {
          this.setState({
              value: ''
          }, () => this.props.handleTermFilter(''))
      }

    render() {
        return (
            <Form className={`search-bar-form ${this.props.className}`} onSubmit={this.formSubmit}>
                <Input 
                    id="login" 
                    //className={`mb-1 ${username.trim().length === 0 && errors.find( f => f.field === 'login') ? 'is-invalid' : ''}`} 
                    autoComplete="off"
                    name="search" 
                    placeholder={this.props.placeholder ? this.props.placeholder : ''}
                    value={this.state.value}
                    //errorMessage={username.trim().length === 0 && errors.find( f => f.field === 'login') ? errors.find( f => f.field === 'login').message : null}
                    //fieldDescription={null}]
                    handleClearInput={this.handleClearInput}
                    placeholderStyle='hide'
                    fieldIcon={{
                        icon: <Search size={15} />,
                        position: 'left'
                    }}
                    clear
                    onChange={e => {
                        if(this.props.dynamic){
                            this.handleChange(e)
                        } else {
                            this.setState({value: e.target.value})
                            if(e.target.value.length === 0){
                                this.setState({value: ''}, () => this.handleChange(e))
                            }         
                        }
                    }} />
            </Form>
        )
    }

}

export default SearchBar