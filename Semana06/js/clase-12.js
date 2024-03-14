// 🚩 Primero que nada vamos a enlazar el HTML con este nuevo script y a su vez
// vamos a comentar la linea que lo vincula con el script de la clase 11.
// La idea es desarrollar en este script las nuevas y mejoradas funcionalidades.

/* -------------------------------------------------------------------------- */
/*                       [4] FUNCION: Consulta a la API                       */
/* -------------------------------------------------------------------------- */
// En este caso vamos a consultar a un servidor del cual nos vamos a traer la data.
// Esta API tiene su documentación en: const boton = document.querySelector('button');
// Vamos a implementar el endpoint que nos devuelve comentarios para mostrarlos en pantalla.

function consultaApi(endpoint) {
    // console.log(endpoint);
    // console.log(fetch(endpoint)) // acá nos damos cuenta que el fetch es una promesa... y que ya está preconfigurada para retornarme lo que tenga la API
    fetch(endpoint)
        .then((respuestaJson) => { 
            console.log(respuestaJson);// respuesta un objeto json
            if (!respuestaJson.ok) {
                /// error en la solicitud 
                console.log(respuestaJson.statusText );
                return Promise.reject(respuestaJson)
            }
            // en vez de utilizar JSON.parse()
            // las promesas tienen un metodo especifico para buscar un objeto literal con el cual pueda iterar

            return respuestaJson.json()
         })
        .then((dataJS) => { 
            // console.log(dataJS);
            renderizarElementos(dataJS)

        })
        .catch(err => console.log(err))

}

/* -------------------------------------------------------------------------- */
/*                      [5] FUNCION: Escuchamos el click                      */
/* -------------------------------------------------------------------------- */
// Vamos a reimplementar la escucha del click lanzar las nuevas funciones.
const boton = document.querySelector("button")
const endpoint = 'https://jsonplaceholder.typicode.com/comments';

boton.addEventListener("click", () => { 
    console.log("🚩Click para ver comentarios");  

    consultaApi(endpoint)


    console.log("🚩Fin de la carga de comentarios");  
 })

/* -------------------------------------------------------------------------- */
/*                      [6] FUNCION: renderizar elementos                     */
/* -------------------------------------------------------------------------- */
// Acá vamos a reutilizar la función de renderizar renderizarElementos, implementando
// el .map() y .join() para obtener el resultado esperado.
function renderizarElementos(listado) {
    // console.log(listado);
    const comentarios = document.querySelector(".comentarios")
    // <div class="comentario">
    //     <h4>mail@mail.com</h4>
    //     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ducimus aut provident saepe blanditiis ab quia dolorum perferendis laudantium hic!</p>
    // </div>

   /* Renderizado con  con foreach 
    comentarios.innerHTML = ""
    listado.forEach(comentario => {
        comentarios.innerHTML += `
            <div class="comentario" data-id="${comentario.id}">
                <h4>${comentario.email}</h4>
                <p>${comentario.body}</p>
            </div>
        `
    });
    
*/

    const comentariosRenderizados = listado.map((comentario) => {
        return `
        <div class="comentario">
            <h4>${comentario.email}</h4>
            <p>${comentario.body}</p>
        </div>`
    })
    comentarios.innerHTML = comentariosRenderizados.join("")

    // console.log(comentariosRenderizados);
    // console.log(listado);
}



/* ----------------------------- Mesa de trabajo ---------------------------- */
/* -------------------------------------------------------------------------- */
/*                              Mejoras de código                             */
/* -------------------------------------------------------------------------- */
// En este caso no debemos desarrollar una nueva funcionalidad necesariamente. Aunque
// siempre que lo creas necesario va a estar bien modularizar en funciones el código.
// Queda a criterio del grupo generar o no nuevas funciones.
// En este caso deberan cumplir con nuevos requerimientos que necesita la aplicación.
// 1- En el caso de la consulta a la API, si la misma no es satisfactoria, deberá arrojar
// un error que se le muestre al usuario.
// 2- Para lograr ver el error podemos forzarlo modificando el endpoint incorrectamente,
// para detectar y arrojar el error deben implementar el bloque try().catch()
// 3- Si los comentarios llegan y se cargan correctamente, el botón de "Ver comentarios"
// debe desaparecer de la interfaz. Así evitamos que se vuelva a llamar a la API.
// 4- Solo deben cargarse los primeros 10 comentarios que nos llegan.
