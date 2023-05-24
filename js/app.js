let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');
const filter = document.getElementById('filter-opt');
const button = document.querySelector('.button')
const nav = document.querySelector('.nav')

button.addEventListener('click',()=>{
    nav.classList.toggle('activo')
})

filter.addEventListener("change", function() {
	pagina = 1;
	cargarPeliculas(filter.value);
});

btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargarPeliculas(filter.value);
	}
});

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarPeliculas(filter.value);
	}
});

close.addEventListener('click', () => {
  modal_container.classList.remove('show');
});

function btnClose () {
	modal_container.classList.remove('show');
}

const getMovie = async(id) => {  
	try {
	  	const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=3fed0b6eb79f693a90195039eaca3561&language=es-MX`)
	  	if(response.status === 200){
			const movie = await response.json();
			
			let movieDetails = '';
			movieDetails = `
			<div class="modal">
				<img class="thumb" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
				<h6 class="textos">Título original: ${movie.original_title}</h6>
				<h6 class="textos">Género: ${movie.genres[0].name}</h6>
				<h6 class="textos">Valoración media: ${movie.vote_average.toFixed(2)} / 10.00</h6>
				<h6 class="textos">Fecha estreno (Año-Mes-Día): ${movie.release_date}<br><br></h6>
				<h6 class="textos">Sinopsis: ${movie.overview}</h6>				
				<button onclick="btnClose()">Cerrar</button>
			</div>
		`;
		modal_container.classList.add('show');
		document.getElementById('modal_container').innerHTML = movieDetails;

		} else {
			console.log('Ha ocurrido un error');
		}
	} catch(error){
		console.log(error);
	}
}

const cargarPeliculas = async(filter) => {
	let optSelected = filter;
	try {
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${optSelected}?api_key=3fed0b6eb79f693a90195039eaca3561&language=es-MX&page=${pagina}`);
	
		console.log(respuesta);

		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();
			
			let peliculas = '';
			datos.results.forEach(pelicula => {
				peliculas += `
					<div class="pelicula">
						<img class="card" onclick="getMovie(${pelicula.id})" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h6 class="textos">${pelicula.title}</h6>
					</div>
				`;
			});

			document.getElementById('contenedor').innerHTML = peliculas;

		} else if(respuesta.status === 401){
			console.log('Pusiste la llave mal');
		} else if(respuesta.status === 404){
			console.log('La pelicula que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}

	} catch(error){
		console.log(error);
	}

}

cargarPeliculas(filter.value);

