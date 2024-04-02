/* --------------------------------- spinner -------------------------------- */
// necesitamos clickear el boton y que desaparezca el texto y se vea el gif unos segundos
const btn = document.querySelector('button');
const btnImg = document.querySelector('button img');
const btnTexto = document.querySelector('button span');

btn.addEventListener("click", () => { 
    console.log("Click");

    //Invertir las clases del span y img para mostrar u ocultar el spinner
    invertirClases()
    btn.setAttribute("disabled","")

    // despues de 3 segundos invertimos esta situación... o cuando recibimos la respusta del fetch
    setTimeout(() => {
        invertirClases()
        btn.removeAttribute("disabled")
    }, 3000);

})

function invertirClases() {
    btnImg.classList.toggle("oculto")
    btnTexto.classList.toggle("oculto")
}


/* ----------------------------- barra progreso ----------------------------- */
const barra = document.querySelector('#barra');
const relleno = document.querySelector('#relleno')

let porcentaje = 0

// mostramos la resultado del porcentaje en la barra
relleno.style.width = `${porcentaje}%`

// creamos un bucle para incremetar el porcentaje
const intervalo = setInterval(() => {
    if (porcentaje < 97) {
        porcentaje++
        relleno.style.width = `${porcentaje}%`        
    } else {
        // frenamos el intervalo
        clearInterval(intervalo)
    }
}, 15);


// en alguna parte del fetch, cuando haya recibido la respuesta 
// relleno.style.width = `100%`        




/* -------------------------------- skeleton -------------------------------- */

const apiUrl = 'https://pokeapi.co/api/v2/pokemon/pikachu';
const pokemon = document.querySelector('#pokemon')
const skeleton = document.querySelector('.skeleton');

fetch(apiUrl)
    .then( response => response.json())
    .then( data => {
        console.log(data);
        console.log(data.name);
        console.log(data.sprites.front_default);
        console.log(data.types[0].type.name);
        const nombre = data.name
        const imagen = data.sprites.front_default
        const tipo = data.types[0].type.name

        // usar setTimeout para demorar la carga del fetch ... esto es opcional
        setTimeout(() => {
            // removemos el article #skeleton
            skeleton.remove()

            // inserto la nueva tarjeta obtenida de los datos del fetch.
            pokemon.innerHTML = componenteTarjeta(nombre, imagen, tipo)

        }, 3000);
    })

const componenteTarjeta = (name, img, type) => {
    return  `
        <article  >
            <h2>${name}</h2>
            <img src="${img}" alt="pokemon">
            <h6>Tipo: ${type}</h6>
        </article>     
    `
}
/* 
*/