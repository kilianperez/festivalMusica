document.addEventListener('DOMContentLoaded', () => {
	console.log('DOM leido');
	scrollSmooth();
	navegacionFija();
});

function scrollSmooth() {
	// Scroll smooth para Safari
	const enlances = document.querySelectorAll('.navegacion-principal a');
	enlances.forEach((enlace) => {
		enlace.addEventListener('click', (e) => {
			e.preventDefault();
			const seccion = document.querySelector(e.target.attributes.href.value);
			seccion.scrollIntoView({
				behavior: 'smooth',
			});
		});
	});
}
function navegacionFija() {
	const barra = document.querySelector('.header');
	// Registar el Intersection del Observer
	const observer = new IntersectionObserver(function (entries) {
		console.log(entries[0]);
		if (entries[0].isIntersecting) {
			// esta visible
			barra.classList.remove('fijo');
		} else {
			// no esta visible
			barra.classList.add('fijo');
		}
	});
	// Elemento a aplicar el observar
	observer.observe(document.querySelector('.sobre-festival'));
}
