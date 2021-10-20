import React, { Component } from 'react'

import Card from '../Card'

import MovieService from '../../apiclient'

import './App.css'

export default class App extends Component {

  movieService = new MovieService()

  state = {
    data: []
  }

  constructor(){
    super()
    this.moviesList()
  }
  
  moviesList = () => this.movieService
      .getMovies()
      .then(data => {
        this.setState({
          data: data.results
        })
      })
  
  render(){

    const { data } = this.state

    const movies = data.map(movie => {
      const { id, title, release_date : releaseDate, overview, ...otherProps } = movie
      
      return (
        <Card 
          key={ id }
          title={ title }
          releaseDate = { releaseDate }
          overview = { overview }
          { ...otherProps }
        />
      )
    })

    return (
      <div className="container">
         <div className="wrapper">
           { movies }
         </div>
      </div>
    );
  }
}

