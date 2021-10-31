import React from "react";
import PropTypes from 'prop-types'

import './searchInput.css'

const SearchInput = (props) => {

    const { onHandleSubmit } = props

    return(
        
            <input 
                className="search__input"
                type="text"
                placeholder="What needs to find?..."
                onChange={evt => onHandleSubmit(evt.target.value)}
            />
        
    )
}

SearchInput.propTypes = {
    onHandleSubmit: PropTypes.func.isRequired
} 
    


export default SearchInput