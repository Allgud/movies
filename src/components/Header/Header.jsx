import React from "react";
import PropTypes from 'prop-types'

import './header.css'

const Header = (props) => {

    const { page, pageListener } = props
    
    return(
        
        <ul 
            className="header"
            onClick={ evt => pageListener(evt) }
            onKeyPress={() => {}}
            role="presentation"
            page={page}
        > 
            <li className='page-title' aria-label="search">
                <input 
                    type="radio" 
                    name="page"
                    id="search"
                />
                <label htmlFor="search">Search</label>
            </li>
            <li className='page-title' aria-label="rated">
                <input 
                    type="radio" 
                    name="page"
                    id="rated"
                />
                <label htmlFor="rated">Rated</label>
                
            </li>
        </ul>
    )
}

Header.propTypes = {
    page: PropTypes.string.isRequired,
    pageListener: PropTypes.func.isRequired
} 
    

export default Header

