import React, { Component } from 'react'

import SearchInput from '../SearchInput'
import Card from '../Card'
import Spinner from '../Spinner'
import AlertMessage from '../Alert'
import Paginator from '../Pagination'

import MovieService from '../../apiclient/Service'

import './App.css'

export default class App extends Component {

  movieService = new MovieService()

   state = {
    data: [], 
    loading: true,
    alert: false,
    error: null,
    inputValue: ''
  }

   constructor(){
    super()
    this.moviesList()
  } 
  
   
   
   onSearchInputChange(evt){
      this.setState({
        inputValue: evt.target.value
      })
   }

   moviesList = () => this.movieService
      .getMovies()
      .then(data => {
        this.setState({
           data: data.results,
           loading: false
        })
      }).catch( this.onError )

   onError = (err) => {
     this.setState({
       alert: true, 
       loading: false,
       error: err
     })
   }
  
  render(){

     const { data, loading, alert, error, inputValue } = this.state
     
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
             { alert ? <AlertMessage error={ error } /> : null}
             { <SearchInput 
                value={inputValue}
                onInputChange={ this.onSearchInputChange }
               /> }
           </div>
             { loading ? <Spinner /> : movies }
             { <Paginator
                  current={1} 
               /> }
           </div>
      </div>
    );
  }
}

