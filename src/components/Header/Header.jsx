import React from "react";
import PropTypes from 'prop-types'

import './header.css'

const Header = (props) => {

    const { toggleTabs, active, escape } = props

    const styleActive = {
        color: '#1890ff',
        borderBottom: '3px solid #1890ff'
    }

    return(        
        <ul 
            className="header"
            onKeyPress={ () => {}}
            onClick={ (evt) => escape(evt) }
            role="radiogroup"
            
        > 
            <li 
                className='page-title'
                style={(active === 'search') ? styleActive : null}
            >
                <input 
                    type="radio" 
                    name="page"
                    id="search"
                    value="search"
                    checked={ active === 'search'}
                    onClick={(evt) => toggleTabs(evt.target.value)}
                    onChange={() => {}}
                />
                <label 
                    htmlFor="search"
                >
                    Search
                </label>
            </li>
            <li 
                className='page-title'
                style={(active === 'rated') ? styleActive : null}
             >
                <input 
                    type="radio" 
                    name="page"
                    id="rated"
                    value="rated"
                    checked={ active === 'rated' }
                    onClick={(evt) => toggleTabs(evt.target.value)}
                    onChange={() => {}}
                />
                <label 
                    htmlFor="rated"
                >
                    Rated
                </label>
                
            </li>
        </ul>
    )
}

Header.defaultProps = {
    active: "main"
}

Header.propTypes = {
    toggleTabs: PropTypes.func.isRequired,
    active: PropTypes.string,
    escape: PropTypes.func.isRequired
}

export default Header

