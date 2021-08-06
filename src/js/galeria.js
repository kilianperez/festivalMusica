document.addEventListener('DOMContentLoaded', () => {
	crearGaleria();
});
function crearGaleria() {
	const galeria = document.querySelector('.galeria-imagenes');

	// la galeria tiene 12 imagenes y van desde el nombre 1 al 12
	for (let i = 1; i <= 12; i++) {
		const imagen = document.createElement('IMG');
		imagen.src = `./build/img/thumb/${i}.webp`;

		// añadir atributos personalizados
		imagen.dataset.imagenId = i;

		// Funcion para mostrar imganes en lightbox
		imagen.onclick = mostrarImagen;

		// Crear lista de imagenes
		const lista = document.createElement('LI');
		lista.appendChild(imagen);

		galeria.appendChild(lista);
	}
}

// lightbox
function mostrarImagen(e) {
	// el elemneto que nos da es un string
	// console.log(typeof e.target.dataset.imagenId);
	// lo transformamos en un numero
	const id = parseInt(e.target.dataset.imagenId);
	const imagen = document.createElement('IMG');
	imagen.src = `./build/img/grande/${id}.webp`;
	console.log(imagen);

	const lightbox = document.createElement('DIV');
	lightbox.appendChild(imagen);
	lightbox.classList.add('lightbox');

	// Boton para cerrar imagen
	const cerrarImagen = document.createElement('P');
	cerrarImagen.textContent = 'X';
	cerrarImagen.classList.add('btn-cerrar');

	// Cerrar Imagen al hacer click en boton

	cerrarImagen.onclick = () => {
		lightbox.remove();
		body.classList.remove('fijar-body');
	};
	// Cerrar Imagen al hacer click en boton

	lightbox.onclick = () => {
		lightbox.remove();
		body.classList.remove('fijar-body');
	};

	lightbox.appendChild(cerrarImagen);

	// Mostrar en el html

	const body = document.querySelector('body');
	body.appendChild(lightbox);

	// fijar body, quitar scroll
	body.classList.add('fijar-body');
}
