import {Component} from 'react'

export default class AutocompletePlace extends Component {
    
    render(){
        const {placeholder} = this.props
        return (
                <input type="text" className="form-control" id="autocomplete" ref={this.autocompleteInput}
                    placeholder={placeholder}/>
          );
    }
}