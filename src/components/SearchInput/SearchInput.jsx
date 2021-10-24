import React from "react";
import PropTypes from 'prop-types'

import './searchInput.css'

const SearchInput = (props) => {

    const { onInputChange } = props

    return(
        <input 
        className="search__input"
        type="text"
        placeholder="What needs to find?..."
        onChange={(evt) => onInputChange(evt)}
    />
    )

}

SearchInput.propTypes = {
    onInputChange: PropTypes.func.isRequired
}
    


export default SearchInput