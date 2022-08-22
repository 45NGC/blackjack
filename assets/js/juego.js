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

	console.log(`Baraja ordenada : ${ baraja }`);

	// Barajamos nuestra baraja :
	baraja = _.shuffle( baraja );

	console.log(`Baraja desordenada : ${ baraja }`);

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

crearBaraja();

carta = pedirCarta();
valorCarta = obtenerValorCarta(carta);
console.log(`Baraja sin una carta : ${ baraja }`);
console.log(`Valor de la carta ${ carta } : ${ valorCarta }`);