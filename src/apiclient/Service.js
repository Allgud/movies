class MovieService {

    BASE_URL = 'https://api.themoviedb.org/3'

    SEARCH_API = `${this.BASE_URL}/search/movie?api_key=0091774d5934d970b4f80690b00729e7&query=`

    FEATURED_API = `${this.BASE_URL}/movie/popular?api_key=0091774d5934d970b4f80690b00729e7&language=en-US&page=1`

    async getResource(api) {  
        const response = await fetch(api)

        if(!response.ok){
            throw new Error(`Couldn't fetch ${api}. Recived status ${response.status}`)
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

}

export default MovieService