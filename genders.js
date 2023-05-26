const getGendres = async() => {
	
	try {

		const options = {
			method: 'GET',
			headers: {
			  accept: 'application/json',
			  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZmVkMGI2ZWI3OWY2OTNhOTAxOTUwMzllYWNhMzU2MSIsInN1YiI6IjY0NjQ0YmQ5MDI4NDIwMDEzNjM4NDZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AGwsxHZb0RkPY1-zoIuUsZktNIbYm5lw-_ug9Jr0IHE'
			}
		  };
		  
		const respuesta = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=es', options)
			
		console.log(respuesta);

		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();
			
			let generos = '';
			datos.genres.forEach(genero => {
				generos += `						
						<h6 class="textos">${genero.id} | ${genero.name}</h6>
				`;
			});

			document.getElementById('generos').innerHTML = generos;

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
getGendres();