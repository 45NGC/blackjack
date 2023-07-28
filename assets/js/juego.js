// Creamos una funcion anonima autoinvocada con el objetivo de que el usuario no 
// pueda acceder a las variables de nuestro codigo desde la consola del navegador, 
// esta practica nos da como resultado un codigo mas seguro 
(() => {
	'use strict'


	// Vamos a crear la baraja de cartas :
	/**
	 * 2C = dos de treboles
	 * 2D = dos de diamantes
	 * 2H = dos de corazones
	 * 2S = dos de espadas
	 */
	const palos = 			['C','D','H','S'], // CLUBS, DIAMONDS, HEARTS, SPADES
	tiposNoNumericos = 		['J','Q','K','A']; // JACK (11), QUEEN (12), KING (13), ASE (1)

	let baraja = 			[],
	puntosJugador = 		0,
	puntosComputadora =		0,
	finalJuego =	 		false;

	// Referencias al HTML

	const btnNuevo = 			document.querySelector('#btnNuevo'),
	btnPedir = 					document.querySelector('#btnPedir'),
	btnDetener = 				document.querySelector('#btnDetener');

	const cartasJugador = 		document.querySelector('#jugador-cartas'),
	cartasComputadora = 		document.querySelector('#computadora-cartas'),
	puntuaciones = 				document.querySelectorAll('small');



	const iniciarPartida = () => {
		// Limpiamos los logs de la consola
		console.clear();
		// Habilitamos los botones de pedir y detener
		btnDetener.disabled = 		false;
		btnPedir.disabled = 		false;
		// Reseteamos los puntos de ambas partes a 0
		puntosJugador = 			0;
		puntosComputadora = 		0;
		puntuaciones[0].innerText = puntosJugador;
		puntuaciones[1].innerText = puntosComputadora;
		// Reseteamos las cartas de ambas partes
		cartasJugador.innerHTML = '';
		cartasComputadora.innerHTML = '';

		finalJuego = false;

		// Reseteamos la baraja
		baraja = crearBaraja();
	}

	const crearBaraja = () => {
		// Esta funcion devuelve una baraja (en forma de array) totalmente desordenada
		baraja = [];

		// Añadimos las cartas numericas de la baraja (del 2 al 10)
		for(let i = 2 ; i <= 10; i++) {
			for(let palo of palos) {
				baraja.push(i + palo);
			}
		}

		// Añadimos la cartas no numericas de la baraja (del 11 al 1)
		for(let tipoNoNumerico of tiposNoNumericos){
			for(let palo of palos){
				baraja.push(tipoNoNumerico + palo);
			}
		}

		// Devolvemos la baraja mezclada :
		return _.shuffle( baraja );
	}

	const pedirCarta = () => {
		// Esta funcion nos permite tomar una carta de la baraja

		// En caso de que no tengamos cartas dentro de nuestra baraja mostramos un error
		if(baraja.length === 0){
			throw 'NO HAY MAS CARTAS DENTRO DE LA BARAJA';
		}
		
		return baraja.pop();
	}

	const obtenerValorCarta = ( carta ) => {
		// Funcion que nos devuelve el valor de la carta que le pasemos como parametro
		// Las cartas numericas valen todas lo mismo que su numero, las no numericas valen todas 10 excepto el as que vale 11

		// La razon por la cual seleccionamos el substring en lugar de pillar siempre el primer caracter del string
		// es porque en caso de que la carta sea un 10 se quedaria con el valor de 1 en lugar de 10
		const valor = carta.substring(0, carta.length - 1);

		// Se puede hacer asi :

		// if(isNaN( valor )){
		// 	// No es un numero
		// 	valor = (valor === 'A') ? 11 : 10;
		// }else{
		// 	// Es un numero
		// 	valor = valor * 1;
		// }

		// Pero es mas recomendable hacerlo de la siguiente forma con un operador ternario:
		return (isNaN( valor )) ? (valor === 'A') ? 11 : 10 : valor * 1;
	}

	// Computadora

	const turnoComputadora = ( puntosJugador ) => {

		while( finalJuego === false && puntosComputadora < puntosJugador){
			// Si el jugador se detiene y por lo tanto aun no se sabe si gano o perdio, la computadora 
			// pedira cartas siempre que se cumplan las siguientes condiciones :
			// - Mientras su puntuacion sea inferior a la del jugador.
			// - Mientras su puntuacion sea inferior o igual a 17, por ejemplo si el jugador tiene 18 puntos y la 
			//   computadora obtiene 18 puntos esta se detendra y optara por el empate, ya que seguir pidiendo cartas
			//   resultaria en una derrota por lo general.

			const carta = pedirCarta();

			const imgCarta = document.createElement('img');
			imgCarta.src = `assets/cartas/${carta}.png`;
			imgCarta.classList.add('carta');
			cartasComputadora.append(imgCarta);

			puntosComputadora += obtenerValorCarta(carta);
			puntuaciones[1].innerText = puntosComputadora;

			if(puntosJugador != 21){
				if ( puntosJugador < puntosComputadora && puntosComputadora <= 21 ){
					console.warn('HAS PERDIDO');
					finalJuego = true;
				}else if( puntosComputadora > 21 ){
					console.warn('HAS GANADO');
					finalJuego = true;
				}else if( puntosComputadora === puntosJugador && puntosComputadora >= 17){
					console.warn('EMPATE');
					finalJuego = true;
				}
			}else if(puntosComputadora > 21){
				console.warn('HAS GANADO');
				finalJuego = true;
			}else if(puntosComputadora === 21){
				console.warn('EMPATE');
				finalJuego = true;
			}
		}

	}

	const desactivarBotones = () => {
		btnPedir.disabled = true;
		btnDetener.disabled = true;
	}
	// Eventos

	btnPedir.addEventListener('click', () => {
		// Pedimos una carta
		const carta = pedirCarta();

		// Mostramos la carta que acabamos de sacar y se la mostramos al jugador
		const imgCarta = document.createElement('img');
		imgCarta.src = `assets/cartas/${carta}.png`;
		imgCarta.classList.add('carta');
		cartasJugador.append(imgCarta);

		// Añadimos los puntos de dicha carta a la puntuacion del jugador
		puntosJugador += obtenerValorCarta(carta);
		puntuaciones[0].innerText = puntosJugador;

		// Comprobamos si hemos perdido
		if( puntosJugador > 21 ){
			console.warn('HAS PERDIDO');
			desactivarBotones();
		}else if( puntosJugador === 21 ){
			desactivarBotones();
			turnoComputadora( puntosJugador );
		}
	});

	btnDetener.addEventListener('click', () => {
		desactivarBotones();
		turnoComputadora( puntosJugador );
	});

	btnNuevo.addEventListener('click', () => {
		//Iniciamos una nueva partida
		iniciarPartida();
	});

	// Hacemos una llamada a 'iniciarPartida' para que no se pidan cartas antes de que se cree la baraja
	iniciarPartida();
})();