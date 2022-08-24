// Vamos a crear la baraja de cartas :
/**
 * 2C = dos de treboles
 * 2D = dos de diamantes
 * 2H = dos de corazones
 * 2S = dos de espadas
 */
 
let baraja = 			[],
    palos = 			['C','D','H','S'], // CLUBS, DIAMONDS, HEARTS, SPADES
	tiposNoNumericos = 	['J','Q','K','A'], // JACK (11), QUEEN (12), KING (13), ASE (1)
	puntosJugador = 	0,
	puntosComputadora =	0,
	finalJuego =	 	false;

// Referencias al HTML
const btnNuevo = 			document.querySelector('#btnNuevo');
const btnPedir = 			document.querySelector('#btnPedir');
const btnDetener = 			document.querySelector('#btnDetener');

const cartasJugador = 		document.querySelector('#jugador-cartas');
const cartasComputadora = 	document.querySelector('#computadora-cartas');
const puntuaciones = 		document.querySelectorAll('small');


const crearBaraja = () => {
	// Esta funcion devuelve una baraja (en forma de array) totalmente desordenada

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

	//console.log(`Baraja ordenada : ${ baraja }`);

	// Barajamos nuestra baraja :
	baraja = _.shuffle( baraja );

	//console.log(`Baraja desordenada : ${ baraja }`);

	return baraja;
}

const pedirCarta = () => {
	// Esta funcion nos permite tomar una carta de la baraja
	
	// En caso de que no tengamos cartas dentro de nuestra baraja mostramos un error
	if(baraja.length === 0){
		throw 'NO HAY MAS CARTAS DENTRO DE LA BARAJA';
	}
	const carta = baraja.pop();
	console.log(`Carta tomada : ${ carta }`);
	return carta;
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

	while( finalJuego === false && puntosComputadora <= puntosJugador){
		// Si el jugador se detiene y por lo tanto aun no se sabe si gano o perdio, la computadora 
		// pedira cartas mientras su puntuacion sea inferior a la del jugador

		const carta = pedirCarta();

		const imgCarta = document.createElement('img');
		imgCarta.src = `assets/cartas/${carta}.png`;
		imgCarta.classList.add('carta');
		cartasComputadora.append(imgCarta);

		puntosComputadora += obtenerValorCarta(carta);
		puntuaciones[1].innerText = puntosComputadora;

		if ( puntosJugador < puntosComputadora && puntosComputadora <= 21 ){
			console.warn('HAS PERDIDO');
			finalJuego = true;
		}else if( puntosComputadora > 21 ){
			console.warn('HAS GANADO');
			finalJuego = true;
		}

		// Comprobamos si el juego se ha terminado
		if(finalJuego === false){
			comprobarFinalJuego( false,puntosComputadora );
		}
	}

}

const comprobarFinalJuego = ( jugador,puntuacion ) => {
	
	if (puntuacion > 21){
		jugador = true ? console.warn('HAS PERDIDO') : console.warn('HAS GANADO');
		btnPedir.disabled = true;
		btnDetener.disabled = true;
		finalJuego = true;
	}else if (puntuacion === 21){
		jugador = true ? console.warn('HAS GANADO') : console.warn('HAS PERDIDO');
		btnPedir.disabled = true;
		btnDetener.disabled = true;
		finalJuego = true;
	}

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

	// Comprobamos si el juego se ha terminado
	comprobarFinalJuego( true,puntosJugador );
});

btnDetener.addEventListener('click', () => {
	btnPedir.disabled = true;
	btnDetener.disabled = true;

	turnoComputadora( puntosJugador );
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

crearBaraja();