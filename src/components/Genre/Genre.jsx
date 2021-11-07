import React from "react"
import PropTypes from 'prop-types'

import './genre.css'

const Genre = (props) => {

    const { genres , genreIds } = props
    
    const genreList = genreIds.map(num => genres.filter(el => el.id === num)[0])
        .map(item => {
        const { name, id } = item
        return (
            <li
                key={ id }
            >
                <span> {name} </span>
            </li>
        )
    })

    return (
        <ul>
            { genreList }
        </ul>
    )    
}

Genre.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    genres: PropTypes.array.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    genreIds: PropTypes.array.isRequired,
    
}

export default Genre