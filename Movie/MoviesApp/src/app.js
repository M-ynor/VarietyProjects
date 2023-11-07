let pagina = 1;
let peliculas = '';
let ultimaPelicula;
import axios from "axios";
// Creamos el observador
let observador = new IntersectionObserver((entradas) => {
	console.log(entradas);

	entradas.forEach(entrada => {
		if (entrada.isIntersecting) {
			pagina++;
			cargarPeliculas();
		}
	});
}, {
	rootMargin: '0px 0px 200px 0px',
	threshold: 1.0
});


const cargarPeliculas = async () => {
	try {
		const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
			params: {
				api_key: '192e0b9821564f26f52949758ea3c473',
				language: 'es-MX'
			},
			headers: {
				'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJlMGI5ODIxNTY0ZjI2ZjUyOTQ5NzU4ZWEzYzQ3MyIsInN1YiI6IjYxODQyMWZlOGVkMDNmMDAyZDA4ZjZlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nrCdKCx2dZQ7d0WaJpXJaPO_De2iP2rYg9bPon1O3V0'
			}
		})
		// Si la respuesta es correcta
		if (response.status === 200) {
			response.data.results.forEach(pelicula => {
				peliculas += `
					<div class="pelicula">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h3 class="titulo">${pelicula.title}</h3>
					</div>
				`;
			});
			document.getElementById('contenedor').innerHTML = peliculas;
			if (pagina < 1000) {
				if (ultimaPelicula) {
					observador.unobserve(ultimaPelicula);
				}
				const peliculasEnPantalla = document.querySelectorAll('.contenedor .pelicula');
				ultimaPelicula = peliculasEnPantalla[peliculasEnPantalla.length - 1];
				observador.observe(ultimaPelicula);
			}
		} else if (response.status === 401) {
			console.log('Pusiste la llave mal');
		} else if (response.status === 404) {
			console.log('La pelicula que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}
	} catch (error) {
		console.log(error);
	}

}

cargarPeliculas();