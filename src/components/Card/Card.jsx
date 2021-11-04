import React from 'react'

import { Rate } from 'antd'

import { format } from 'date-fns'

import './card.css'

const Card = (props) => {

        const IMAGE_API = 'https://image.tmdb.org/t/p/w1280'

        const fakePoster = 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80'

        const overviewCutter = (text) => {
            if(!text){
                return <span className="nodescription">No description</span>
            }
            if(text.split(' ').length > 20){
                return text.split(' ').slice(0, 20).concat(["..."]).join(' ')
            }
            return text 
        }

        const { ...otherProps } = props
        const { 
                title, 
                poster_path : posterPath, 
                overview, 
                release_date : releaseDate,
                vote_average : rating
              } = otherProps

    return(
        <div className="card">
            <img className="card__image" src={!posterPath ? fakePoster : IMAGE_API + posterPath} alt="#" />
            <div className="card__description">
                <div className="film__rating">
                    <span>{ rating.toFixed(1) }</span>
                </div>
                <div className="description__content">
                    <h5 className="description__title">{ title }</h5>
                    <div className="released">
                        <span className="released--date">{ releaseDate ? format(new Date(releaseDate), `MMMM dd, y`) : '...'}</span>
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
                <div className="card__rating">
                   <Rate count={10} />
                </div>
            </div>
        </div>
      )
}

export default Card