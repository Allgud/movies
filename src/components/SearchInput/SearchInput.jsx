import React from "react";
import PropTypes from 'prop-types'

import './searchInput.css'

const SearchInput = (props) => {

    const { onInputChange, onHandleSubmit } = props

    return(
        <form 
            onSubmit={ evt => onHandleSubmit(evt) }
        >
            <input 
                className="search__input"
                type="text"
                placeholder="What needs to find?..."
                onChange={evt => onInputChange(evt)}
            />
        </form>
    )
}

SearchInput.propTypes = {
    onInputChange: PropTypes.func.isRequired,
    onHandleSubmit: PropTypes.func.isRequired
} 
    


export default SearchInput