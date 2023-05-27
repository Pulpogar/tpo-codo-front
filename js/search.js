const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a9c63244d8bcd22aea2ba23273760f77&page=1&language=es-ES"

const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280"

const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?&api_key=a9c63244d8bcd22aea2ba23273760f77&language=es-ES&query="'



const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

/* 
    Obtenemos las peliculas ordenadas por las mas populares
    al momento de cargar la pagina de busqueda (search.html)
*/

getMovies(API_URL)

async function getMovies(url){
    const res = await fetch(url)
    const data = await res.json()
    displayMovies(data.results)
    console.log(data.results) // Para pruebas
}

// Funcion que carga las peliculas en el DOM

function displayMovies(movies) {
    main.innerHTML=''
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie
        const moviesElement = document.createElement('div')
        moviesElement.classList.add('movie')
        moviesElement.innerHTML = `
        
            <img src="${IMAGE_PATH + poster_path}" alt="${title}" />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassesByRating(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Descripcion</h3>
                ${overview}
            </div>
        
        `
        main.appendChild(moviesElement)

    });
}


// Cambiamos el color del rating dependiendo de como estan rankeadas las peliculas
// (se puede mejorar el codigo haciendolo con un array)
function getClassesByRating(rating) {
    if(rating >=8 ){
        return 'green'
    }else if (rating >=5){
        return 'orange'
    }else{
        return 'red'
    }
}


// Comienza la busqueda al presionar ENTER
form.addEventListener('submit',(e) => {
    e.preventDefault()    
    let searchValue = search.value 
    console.log(SEARCH_URL + searchValue) //pruebas api search
    if(searchValue && searchValue !=='') {
        getMovies(SEARCH_URL + searchValue)
        searchValue=''
    } else {
        window.location.reload()
    }
})