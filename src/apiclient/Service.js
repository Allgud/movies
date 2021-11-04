class MovieService {

    BASE_URL = 'https://api.themoviedb.org/3'

    API_KEY = `0091774d5934d970b4f80690b00729e7`

    SEARCH_API = `${this.BASE_URL}/search/movie?api_key=${this.API_KEY}&query=`

    FEATURED_API = `${this.BASE_URL}/discover/movie?api_key=${this.API_KEY}&sort_by=popularity.desc`

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

}

export default MovieService