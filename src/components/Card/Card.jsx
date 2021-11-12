import React from 'react'
import PropTypes from 'prop-types'

import { Rate } from 'antd'

import { format } from 'date-fns'
import Genre from '../Genre'
import { Consumer } from '../context'

import './card.css'

const Card = ({ id, service, ...otherProps }) => {

        const IMAGE_API = 'https://image.tmdb.org/t/p/w1280'

        const fakePoster = 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80'

        const overviewCutter = (text) => {
            if(!text){
                return <span className="nodescription">No description</span>
            }
            if(text.split(' ').length > 20){
                return text.split(' ').slice(0, 15).concat(["..."]).join(' ')
            }
            return text 
        }

        const { 
                title, 
                poster_path : posterPath, 
                overview, 
                release_date : releaseDate,
                vote_average : rating,
                genre_ids : genreIds,
                rating: userRating,
              } = otherProps
        

        let ratingColor = ''
        if(rating < 3){
            ratingColor += '#E90000'
        }
        if(rating >= 3 && rating < 5){
            ratingColor += '#E97E00'
        }
        if(rating >= 5 && rating < 7){
            ratingColor += '#E9D100'
        }
        if(rating >= 7){
            ratingColor += '#66E900'
        }

        const rateMovie = (val) => {
            const movieId = id
            service.postRating(val, movieId)
        } 

    return(    
        <div className="card">
            <img className="card__image" src={!posterPath ? fakePoster : IMAGE_API + posterPath} alt={ title } />
            <div className="card__description">
                <div className="film__rating" style={{ borderColor: ratingColor }}>
                    <span>{ rating.toFixed(1) }</span>
                </div>
                <div className="description__content">
                    <h5 className="description__title">{ title }</h5>
                    <div className="released">
                        <span className="released--date">
                            { releaseDate ? format(new Date(releaseDate), `MMMM dd, y`) : '...'}
                        </span>
                    </div>
                        <div className="description__genre">
                            <Consumer>
                                {
                                    ({genres}) => (
                                        <Genre
                                            genres = { genres }  
                                            genreIds={ genreIds } 
                                        />  
                                    )
                                }
                            </Consumer>    
                        </div>
                    <div className="description__text">
                        <p>
                            { overviewCutter(overview) }
                        </p>
                    </div>
                </div>
                <div className="card__rating">
                    { !userRating ? 
                        <Rate 
                            count={10}
                            onChange={ rateMovie } 
                            allowHalf
                        /> 
                        :
                        <Rate 
                            count={10} 
                            disabled
                            defaultValue= { userRating }
                        /> 
                    }
                    
                </div>
            </div>
        </div>
    )
}

Card.propTypes = {
    id: PropTypes.number.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    service: PropTypes.object.isRequired
}

export default Card