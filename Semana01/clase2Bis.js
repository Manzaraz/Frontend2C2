// Tenemos varias funciones a disposicion en nuestro programa.
// Debemos reutilizarlas y acomodar nuestro juego para que el mismo sea al mejor de 3 partidas.
// Esto significa que el primero que gane 2 partidas va ser el ganador. Con lo cual pueden repetirse varias rondas hasta que esto suceda.

// Listemos las funciones para recordarlo mejor
// FUNCION 1: iniciarJuego()
// -> Es la que se encarga de recopilar el nombre del jugador y saludarlo.
const nombreDelJugador = iniciarJuego()

// FUNCION 2: pedirJugada()
// -> Esta se encarga de pedirle una eleccion al usuario hasta que ingrese un número válido.
// FUNCION 3: jugadaRandom()
// -> Utiliza el objeto Math para generar un numero aleatorio entre 1 y 3
// FUNCION 4: compararJugadas()
// -> Se encarga de comparar ambas elecciones y definir cómo le fue al usuario

/* ------------------------------ 👇Comenzamos ------------------------------ */
// Primero debemos limpiar los scripts anteriores y dejar solo las funciones, quitamos las variables y las empezamos a declarar solo en este script

let marcador = {
    usuario: 0,
    computadora: 0
}

// mientras ninguno haya llegado a sumar 2 puntos seguimos jugado
while (marcador.usuario < 2 && marcador.computadora < 2) {
    const RESULTADO_PARTIDA = compararJugadas()
    alert(RESULTADO_PARTIDA)
    console.log(RESULTADO_PARTIDA)
    
    // verificar el mensaje de resultado partida me indica que gané!
    if (RESULTADO_PARTIDA.includes("ganaste")) {
        marcador.usuario++
    } else if (RESULTADO_PARTIDA.includes("perdiste")) {
        marcador.computadora++
    }

    console.log(marcador);
}




/* -------------------------------------------------------------------------- */
/*                          CONSIGNA MESA DE TRABAJO                          */
/* -------------------------------------------------------------------------- */
// 1- Modificar el objeto puntajes para poder contabilizar los empates tambien.
// 2- Modificar el bucle para poder sumar tambien la cantidad de empates.
// 3- Mostrar en cada partida el resultado al usuario.
// 4- Mostrar finalmente la cantidad de partidas jugadas y que sepa cuantas ganó, perdió o empató durante el juego.