import React from 'react'
import PropTypes from 'prop-types'

import './card.css'

const Card = (props) => {

        const IMAGE_API = 'https://image.tmdb.org/t/p/w1280'

        const fakePoster = 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80'

        const { title, releaseDate, overview, poster_path : posterPath } = props  

        const overviewCutter = (text) => {
            if(!text){
                return <span className="nodescription">No description</span>
            }
            if(text.split(' ').length > 20){
                return text.split(' ').slice(0, 20).concat(["..."]).join(' ')
            }
            return text 
        }


    return(
        <div className="card">
            <img className="card__image" src={!posterPath ? fakePoster : IMAGE_API + posterPath} alt="#" />
            <div className="card__description">
                <div className="description__content">
                    <h5 className="description__title">{ title }</h5>
                    <div className="released">
                        <span className="released--date">{ releaseDate }</span>
                    </div>
                        <div className="description__genre">
                            <ul>
                                <li><span>Action</span></li>
                                <li><span>Drama</span></li>
                            </ul>
                        </div>
                    <div className="description__text">
                        <p>
                        { overviewCutter(overview) }
                    </p>
                     </div>
                </div>
            </div>
        </div>
      )
}

    Card.propTypes = {
        title: PropTypes.string.isRequired,
        releaseDate: PropTypes.string.isRequired,
        overview: PropTypes.string.isRequired,
        poster_path: PropTypes.string.isRequired
    }

    


export default Card