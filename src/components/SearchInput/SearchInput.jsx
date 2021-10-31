import React from "react";
// import PropTypes from 'prop-types'

import './searchInput.css'

// eslint-disable-next-line arrow-body-style
const SearchInput = () => {

    // const { onInputChange } = props

    return(
        <form 
            onSubmit={ (evt) => evt.preventDefault() }
        >
            <input 
                className="search__input"
                type="text"
                placeholder="What needs to find?..."
                onChange={() => {}}
            />
        </form>
    )
}

/* SearchInput.propTypes = {
    onInputChange: PropTypes.func.isRequired
} */
    


export default SearchInput