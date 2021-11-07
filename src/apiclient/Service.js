class MovieService {

    BASE_URL = 'https://api.themoviedb.org/3'

    API_KEY = `0091774d5934d970b4f80690b00729e7`

    SEARCH_API = `${this.BASE_URL}/search/movie?api_key=${this.API_KEY}&query=`

    FEATURED_API = `${this.BASE_URL}/discover/movie?api_key=${this.API_KEY}&sort_by=popularity.desc`

    GENRES_API = `${this.BASE_URL}/genre/movie/list?api_key=${this.API_KEY}`

    async getResource(api) {  
        const response = await fetch(api)

        if(response.status === 422){
            throw new Error(`Please insert film title`)
        }
        if(!response.ok && response.status !== 422){
            throw new Error(`Received status ${response.status}`)
        }
        const res = await response.json()
    
        return res
    }
    
    getMovies(){
       return this.getResource(this.FEATURED_API)
    }

    getSearchMovies(str) {
        return this.getResource(this.SEARCH_API + str)
    }

    getMoviesGenres(){
        return this.getResource(this.GENRES_API)
    }

    newGuestSession(){
        return this.getResource(`${this.BASE_URL}/authentication/guest_session/new?api_key=${this.API_KEY}`)
    }

    getRatedMovies(){
        return this.getResource(`${this.BASE_URL}/guest_session/${localStorage.getItem('id')}/rated/movies?api_key=${this.API_KEY}&language=en-US&sort_by=created_at.asc`)
    }

    async postRating(num, movieId){
        const url = `${this.BASE_URL}/movie/${movieId}/rating?api_key=${this.API_KEY}&guest_session_id=${localStorage.getItem('id')}`
        const body = {value: num}
        
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const data = await response.json()
            return data   
    } 
}

export default MovieService