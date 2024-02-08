/* -------------------------------------------------------------------------- */
/*                                  FUNCION 2                                 */
/* -------------------------------------------------------------------------- */
// 👇 Esta funcion nos devuelve 1, 2 o 3 según la elección del usuario.
// Hasta que el usuario ingrese un dato válido le seguimos pidiendo que elija.

function pedirJugada() {
  // Inicializamos con la varialbe eleccion en 0
  let eleccion = 0


  do {
    // Pedir que elija una opcion valida
    // convertir el texto que nos llega a un entero
    // reemplazar el valor guardado en la variable
    eleccion = parseInt(prompt("Ingrese para jugar 1(🗿 Piedra) 2(🧻 Papel) o 3(✂️Tijera)"))
    
    } while (isNaN(eleccion) || eleccion < 1 || eleccion > 3);

    // para mostrar por consola
    console.log("-----------------");
    console.log("La elección del jugador es:");
    console.log(eleccion);
    console.log("-----------------");

    return eleccion
}
// let jugadaUsuario = pedirJugada() // Probamos la jugada
// console.log(jugadaUsuario);
/* -------------------------------------------------------------------------- */
/*                                  FUNCION 3                                 */
/* -------------------------------------------------------------------------- */
function jugadaRandom() {
    // Math.random()👉🏻 https://www.w3schools.com/js/js_random.asp
    min = 1
    max = 4
    let numero = parseInt(Math.random() * (max - min) + min)
    // let numero = Math.floor(Math.random() * (max - min) + min)
    
    // let numero = Math.round(Math.random() * (max - min) + min)
    // let numero = Math.ceil(Math.random() * (max - min) + min)

    // para mostrar por consola
    console.log("-----------------");
    console.log("La elección la COMPUTADORA es:");
    console.log(numero);
    console.log("-----------------");

    // RETORNO EL NUERO DE LA ELECCION ALEATORIA
    return numero
}

// let jugadaPC = jugadaRandom() // Probamos la jugada


/* -------------------------------------------------------------------------- */
/*                                  FUNCION 4                                 */
/* -------------------------------------------------------------------------- */
// 👇 Esta funcion nos devuelve el resultado de la partida según las elecciones.
// Comparamos la eleccion de cada uno para saber quien pierde y quien gana.

function compararJugadas() {
    const RESULTADOS_POSIBLES = ['¡Genial, ganaste!', 'Esto fue un empate.', 'Una lástima, perdiste.'];
    const OPCIONES = ['piedra', 'papel', 'tijera'];

    const ELECCION_JUGADOR = pedirJugada()
    const JUGADA_PC = jugadaRandom()

    // EL VALOR POR DEFECTO DE LA JUGADA ES GANASTE!
    let resultadoRonda = RESULTADOS_POSIBLES[0]
    
    // Cambiar el resultado de la ronda ... dependiendo si empata o pierde
    if (ELECCION_JUGADOR  == JUGADA_PC) { // Caso de empate 
        resultadoRonda = RESULTADOS_POSIBLES[1]
    } else if ( // Caso de perder la partida
        (ELECCION_JUGADOR == 1 && JUGADA_PC == 2) || // Si yo saco piedra y la pc papel pierdo
        (ELECCION_JUGADOR == 2 && JUGADA_PC == 3) || // Si yo saco papel y la pc tijera pierdo
        (ELECCION_JUGADOR == 3 && JUGADA_PC == 1) // Si yo saco tijera y la pc piedra pierdo
    ) {
        resultadoRonda = RESULTADOS_POSIBLES[2]
    }

    return `La computadora eligió: ${OPCIONES[JUGADA_PC - 1]} \nElección Jugador: ${OPCIONES[ELECCION_JUGADOR - 1]} \n ${resultadoRonda}`
}
// const resultadoDePartida = compararJugadas()
// console.log(resultadoDePartida);
