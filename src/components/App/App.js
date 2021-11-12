import React, { Component } from 'react'

import { debounce } from 'lodash'

import { Provider } from '../context'

import Header from '../Header'
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
    }, 
    active: 'main',
    genres: null
  }
 
  componentDidMount(){
    this.genresList()
    this.moviesList()
    this.newGuestSession() 
  }

  componentDidUpdate(){
    const { active } = this.state
    if( active === 'rated' ){
      this.ratedMovies()
    }
  }

  componentWillUnmount(){
    localStorage.removeItem('id')
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

  newGuestSession = () => this.movieService
      .newGuestSession()
      .then(data => {
        localStorage.setItem('id', data.guest_session_id)
      }).catch( this.onError )
      
  moviesList = () => this.movieService
      .getMovies()
      .then(data => {
        this.setState({
           data: data.results,
           loading: false,
           search: {
             current: 1,
             total: 1
           }
        })
      }).catch( this.onError )
  
  genresList = () => this.movieService
      .getMoviesGenres()
      .then(data => {
        this.setState({
          genres: data.genres
        })
      }).catch( this.onError )
     
  ratedMovies = () => this.movieService
      .getRatedMovies()
      .then(data => {
        this.setState({
          data: data.results,
          search: {
            current: data.page,
            total: data.total_results
          },
        })
      }).catch( this.onError )
      
  onSearchInputChange = (evt) => {
      this.setState({
        inputValue: evt.target.value.trim()
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

  toggleTabs = (str) => {
      this.setState({
        active: str,    
     })
   }

  escapeToMain = (evt) => {
    if(evt.target.value !== 'search' && evt.target.value !== 'rated'){
      this.setState({
        active: 'main',
        inputValue: '', 
      })
      this.moviesList()
    }   
  } 

  render(){

     const { data, loading, alert, error, 
             inputValue, search: { total, current }, 
             active, genres} = this.state
     
     const movies = data.map(movie => {
      const { id, ...otherProps } = movie
      return (
        <Card 
          key={ id }
          id={ id }
          { ...otherProps }
          service = { this.movieService } 
        />
      )
    }) 

    return (
      <Provider  value={{ genres }}>
       <div className="container">
          <div className="wrapper">
            <Header
              escape={ this.escapeToMain } 
              toggleTabs={ this.toggleTabs }
              active={ active }
            />
            {(active === 'search') ? 
              <SearchInput 
                value={ inputValue }
                onHandleSubmit = { this.onHandleSubmit }
              /> 
              : null
            }   
            <div className="alert">
             { alert ? 
                <AlertMessage 
                  error={ error }
                  onClose = { this.onCloseAlert }
                /> 
              : null }
            </div>
             { loading ? <Spinner /> : movies }
             { !loading ? <Paginator
                  onChangePage = { this.onChangePage }
                  total = { total }
                  current = { current }
               /> : null }
           </div>
        </div>
      </Provider>
    );
  }
}

