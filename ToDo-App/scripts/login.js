window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.forms[0]
    const email = document.querySelector("#inputEmail")
    const password = document.getElementById("inputPassword")
    const url = "https://todo-api.ctd.academy/v1"
    // console.log(form);

    
    const errors = {
        email: false,        
        password: false
    }
    // Aqui en este punto yo me encargo de mandar un a llamar la las funcion normalizar Texto y las validaciones
    // Cuando modifico el contenido del input se desencadena el evento el cual lo capturará la función que se encarga de validar
    email.addEventListener("input", e => validarEmail(e))
    password.addEventListener("input", validarContrasenia)

    // el evento blur desencadenar el evento una vez que abandono el input, por eso si está vacio, le indico que lo obligue a cargarlo
    email.addEventListener("blur", e => isEmpty(`⚠️ Se requiere que ingrese su ${email.name}`, e))
    password.addEventListener("blur", e => isEmpty(`⚠️ Se requiere que ingrese su ${email.name}`, e))

    
    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault()

        //Creamos el cuerpo de la request (petición al servidor)
        const payload = {
            email: email.value,
            password: password.value
        }
;
        // vemos el objeto que recibimos del formulario
        console.log(payload);

        //configuramos la request del Fetch
        const settings = {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // Lanzamos la consulta del login a la API
        realizarLogin(settings)

        // Limpiamos el formulario
        form.reset()

    });

    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(settings) {
        console.log(settings);
        console.log("Lanzar la consulta a la API...");

        fetch(`${url}/users/login`, settings)
            .then(response => {
                console.log(response);

                // manejar el error de la request.
                if (response.ok) return response.json()

                // En caso de que la propiedad ok de la respuesta en false
                return Promise.reject(response)

            })
            .then(data => {
                console.log("Promesa cumplida💍");
                console.log(data);

                if (data.jwt) {
                    // Guardamos el dato jwt en el local storage (este token de autenticación)
                    localStorage.setItem("jwt", JSON.stringify(data.jwt))

                    // redireccionamos a nuestro dashboard de todo
                    location.replace("./mis-tareas.html")
                }

            })
            .catch(err => {
                console.warn("Promesa rechazada 🙅🏻‍♀️");
                console.log(err);
                if (err.status == 400) {
                    console.warn("Contraseña incorrecta")
                    alert("Contraseña incorrecta")
                } else if (err.status == 404) {
                    console.warn("El usuario no existe")
                    alert("El usuario no existe")
                } else {
                    console.error("Error del servidor | url no existe")
                    alert("Error del servidor | url no existe")
                }
            })
    };

});