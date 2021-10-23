import React, { Component } from 'react'

import Card from '../Card'
import Spinner from '../Spinner/spinner'
import AlertMessage from '../Alert/Alert'

import MovieService from '../../apiclient/Service'

import './App.css'

export default class App extends Component {

  movieService = new MovieService()

   state = {
    data: [], 
    loading: true,
    alert: false,
    error: null
  }

   constructor(){
    super()
    this.moviesList()
  } 
  
   moviesList = () => this.movieService
      .getMovies()
      .then(data => {
        this.setState({
           data: data.results,
           loading: false
        })
      }).catch(this.onError)
    

   onError = (err) => {
     console.log(err);
     this.setState({
       alert: true, 
       loading: false,
       error: err
     })
   }
  
  render(){

     const { data, loading, alert, error } = this.state

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
           <div className="alert">
             { alert ? <AlertMessage 
               error={ error } 
             /> : null}
           </div>
             { loading ? <Spinner /> : movies }
           </div>
      </div>
    );
  }
}

