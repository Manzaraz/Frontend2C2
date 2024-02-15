// 🚩 Antes de empezar, vinculemos el HTML solo con el script de clase 4.

const listadoNoticias = [{
        titulo: "La emoción de Lisandro Martínez",
        epigrafe: "La increíble ovación de los hinchas de Manchester United al defensor argentino: 'Quise llorar'.",
        foto: "./img/futbol.webp"
    },
    {
        titulo: "La renuncia de Liz Truss",
        epigrafe: "Boris Johnson interrumpió sus vacaciones y vuelve a sonar fuerte entre los posibles sucesores.",
        foto: "./img/boris.webp"
    },
    {
        titulo: "Los motivos",
        epigrafe: "Una escuela argentina fue elegida entre las diez mejores del mundo.",
        foto: "./img/escuela.webp"
    }
]

// Vamos a trabajar con nodos de manera dinámica, sobre todo crearlos desde JS en vez de que estén estáticos en el HTML
// Para eso vamos a valernos de array listadoNoticias que tenemos más arriba
// ¿Cual es la idea? utilizar la información que nos llega del listado para presentarla en pantalla.



/* -------------------------- PRACTICANDO ATRIBUTOS ------------------------- */
// Completemos correctamente el 'alt' de cada imagen con la frase "miniatura de noticia"
const imagenes = document.querySelectorAll(".noticias article img")
console.log(imagenes);
// rellenamos el atributo👇
imagenes[0].setAttribute("alt","miniatura ilustrativa de la noticia")
// Hagamoslo más dinámico y recorramos todas las imagenes👇


/* ---------------------- PRACTICANDO CREACION DE NODOS --------------------- */
// 1- Ahora vamos a ir al HTML y eliminar los 3 Article que se encuentran en el main.
// 2- Comentamos la parte de este código de "Practicando atributos"
// 3- Vamos a crear de a uno e insertarlos en el HTML usando un bucle👇
const main = document.querySelector(".noticias")
main.innerHTML = ""

// Tecnica de insercion de nodos
listadoNoticias.forEach(noticia => {
    // Crear elementos nuevos que no existen el dom
    const article = document.createElement("article")
    const h2 = document.createElement("h2")
    const img = document.createElement("img")
    const p = document.createElement("p")

    // agregamos los textos y los atributos de cada etiqueta creada
    h2.innerText = noticia.titulo
    img.setAttribute("src", noticia.foto)
    img.setAttribute("alt", noticia.titulo)
    p.textContent = noticia.epigrafe

    // agrego h2, img p a la etiqueta padre "article"
    article.appendChild(h2)
    article.appendChild(img)
    article.appendChild(p)

    // agrego el article creado al elemento padre que que seria el contendor de la noticia
    main.appendChild(article)
})

const ultimaHora = {
    titulo: "'¡Gracias... totales!', la frase que inmortalizó Gustavo Cerati en el concierto de Soda Stereo",
    epigrafe: "Hace 25 años, el 20 de septiembre de 1997, Gustavo Cerati inmortalizó la frase “¡Gracias... totales!” en el concierto de despedida de Soda Stereo realizado en Argentina.",
    foto: "https://peru21.pe/resizer/wpsSRS3uiZnI1zgnPqOGp82pEAg=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/H6SGFZX6ORBTJDIIN4VIOXYDA4.jpg"
}

// Tecnica de template literals
main.innerHTML += `
    <article>
        <h2>${ultimaHora.titulo}</h2>
        <img src="${ultimaHora.foto}" alt="El mas grande del rock latino">
        <p>${ultimaHora.epigrafe}.</p>
    </article>
`

/* -------------------------------------------------------------------------- */
/*                          CONSIGNA MESA DE TRABAJO                          */
/* -------------------------------------------------------------------------- */
// Antes de comenzar vamos a comentar la parte de PRACTICANDO ATRIBUTOS y PRACTICANDO CREACION DE NODOS.
// Una vez que solo tenemos el código comentado podemos empezar la practica.
// 1- Debemos reutilizar el "listadoNoticias" para lograr el mismo resultado de crear los nodos dinamicamente.
// 2- La diferencia ahora radica en utilizar un bucle y dentro del mismo utilizar la notación de Plantillas Literales (con comillas invertidas -> ``)
// 3- El resultado debe ser el mismo que en el caso anterior pero vamos a implementar el método innerHTML para insertar la plantilla creada.
// Ejemplo: si quiero insertar un titulo en el body, haría los siguiente:
// document.querySelector('body').innerHTML += `<h1>Nuevo Título</h1>`;

function renderizandoElementos() {
// desarrollar la consigna aquí


}
renderizandoElementos();