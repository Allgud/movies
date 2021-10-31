import React, { Component } from 'react'

import { debounce } from 'lodash'

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
    inputValue: '',
    search: {
      current: 1,
      total: 1
    }
  }
   
  componentDidMount(){
    this.moviesList()
  }

  onHandleSubmit = debounce((text) => {
    if(!text){
      this.moviesList()
    }
    this.setState({ loading: true })
    this.movieService.getSearchMovies(text)
    .then(data => {
      this.setState({
        data: data.results,
        loading: false,
        inputValue: text, 
        search: {
          total: data.total_results
        }
      })
    }).catch(this.onError)
  }, 500)

  moviesList = () => this.movieService
      .getMovies()
      .then(data => {
        this.setState({
           data: data.results,
           loading: false
        })
      }).catch( this.onError )   

   
   onSearchInputChange = (evt) => {
      this.setState({
        inputValue: evt.target.value
      })
   }

   onChangePage = (num) => {
     this.setState({loading: true})
     const { inputValue } = this.state
     const page = `&page=${num}`
    this.movieService.getSearchMovies(inputValue + page)
    .then(data => {
      this.setState({
        data: data.results,
        loading: false, 
        search: {
          current: data.page,
          total: data.total_results
        }
      })
    }).catch(this.onError)
   }

   onError = (err) => {
     this.setState({
       alert: true, 
       loading: false,
       error: err
     })
   }

   onCloseAlert = () => {
     this.setState({ alert: false })
     this.moviesList()
   }
  
  render(){

     const { data, loading, alert, error, inputValue, search: { total, current } } = this.state
     
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
             { alert ? 
                <AlertMessage 
                  error={ error }
                  onClose = { this.onCloseAlert }
                /> 
              : <SearchInput 
                  value={ inputValue }
                  onHandleSubmit = { this.onHandleSubmit }
                /> }
           </div>
             { loading ? <Spinner /> : movies }
             { !loading ? <Paginator
                  onChangePage = { this.onChangePage }
                  total = { total }
                  current = { current }
               /> : null }
           </div>
      </div>
    );
  }
}

