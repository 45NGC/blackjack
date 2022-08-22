// Vamos a crear la baraja de cartas :
/**
 * 2C = dos de treboles
 * 2D = dos de diamantes
 * 2H = dos de corazones
 * 2S = dos de espadas
 */

let baraja = [];

let palos = 			['C','D','H','S']; // CLUBS, DIAMONDS, HEARTS, SPADES
let tiposNoNumericos = 	['J','Q','K','A']; // JACK (11), QUEEN (12), KING (13), ASE (1)

const crearBaraja = () => {

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

	//console.log(`Baraja barajada : ${ baraja }`);

	return baraja;
}

crearBaraja();