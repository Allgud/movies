class MovieService {

    BASE_URL = 'https://api.themoviedb.org/3'

    API_KEY = '0091774d5934d970b4f80690b00729e7'

    async getResource(url) {  
        const response = await fetch(`${this.BASE_URL}${url}`)

        if(!response.ok){
            throw new Error(`Couldn't fetch ${url}. Recived status ${response.status}`)
        }
        const res = await response.json()
        return res
    }
    
    getMovies(){
       return this.getResource(`/search/movie?api_key=${this.API_KEY}&language=en-US&query=result&page=1&include_adult=false`)
    }

}

export default MovieService