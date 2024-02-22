/* -------------------------------------------------------------------------- */
/*                        [4] FUNCION: marcar favorito                        */
/* -------------------------------------------------------------------------- */
// - buscar el album por id en el array 
// - cambiar el estado del like
// - volver a renderizar
function marcarFavorito() {
    // Seleccionar todos los botones de like <i>
    const botonesDeLike = document.querySelectorAll(".fa-heart")
    // console.log(botonesDeLike);

    botonesDeLike.forEach( boton => {
        boton.addEventListener("click", function(evento) {
            console.log(evento);
            console.log(evento.target);
            console.log(evento.target.id);
            let albumId = evento.target.id

            albumesFamosos.forEach( album => {
                if (album.id == albumId) {
                    console.log(`Coincide ${albumId} con ${album.id}`);
                    console.log(album.like);
                    if (album.like == false) {
                        album.like = true 
                    } else {
                         album.like = false
                    }
                    // album.like = !album.like // esto resume el condicional de arriba 
                    console.log(album.like);
                }
            })
            // Renderizar (pintar) nuevamente las tarjetas para que se pinte los like de los álbumes
            renderizarAlbumes(albumesFamosos)
            mostrarDatosEnPerfil(albumesFamosos)

            // Recursividad: para agreagar nuevamente el listener para seguir escuchado el eveto de los botones
            marcarFavorito()
        })
    })
}

marcarFavorito()



/* ----------------------------- MESA DE TRABAJO ---------------------------- */
/* -------------------------------------------------------------------------- */
/*                         [5] FUNCION: Eliminar album                        */
/* -------------------------------------------------------------------------- */
// Debemos desarrollar la funcion de eliminar un album. Para esto le vamos a 
// preguntar al usuario cual quiere eliminar.
// Vamos a seguir las indicaciones que nos permiten lograrlo utilizando eventos.
// 1- Hay que escuchar el evento de 'keydown' para detectar cuando el usuario
// presiona la tecla f
// 2- Una vez que detectamos la tecla, debemos mostrarle un prompt al usuario
// para que ingrese el nombre del album que desea eliminar
// 3- Podemos buscar la posicion del almbum buscado en el array con la funcion .findIndex()
// 4- Si la busqueda nos da un resultado válido, procedemos a borrar el objeto del array
// 5- Acto seguido debemos llamar a las funciones de renderizar y marcar favorito para que sean nuevamente aplicadas.


function eliminarAlbum() {
    // desarrollar la función 👇

}
eliminarAlbum();