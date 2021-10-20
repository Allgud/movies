import React from 'react'

import './card.css'

const Card = () => (
    
        <div className="card">
        <img className="card__image" src="#" alt="#" />
        <div className="card__description">
            <div className="description__content">
                <h5 className="description__title">The Way Back</h5>
                <div className="released">
                    <span className="released--date">5 March, 2020</span>
                </div>
                <div className="description__genre">
                <ul>
                    <li><span>Action</span></li>
                    <li><span>Drama</span></li>
                </ul>
                </div>
                <div className="description__text">
                    <p>
                        A former basketball all-star, who has lost his wife and family
                        foundation in a struggle with addiction attempts to regain his
                        soul and salvation by becoming the coach of a disparate
                        ethnically mixed high ...
                    </p>
                     </div>
                </div>
            </div>
        </div>
    
   )

export default Card