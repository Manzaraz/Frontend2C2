window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.forms[0]
    // const form = document.querySelector("form")
    const email = document.querySelector("#inputEmail")
    const password = document.querySelector("#inputPassword")
    const url = "https://todo-api.ctd.academy/v1"

    // Aqui en este punto yo me encargo de mandar un a llamar la las funcion normalizar Texto y las validaciones
    // Cuando modifico el contenido del input se desencadena el evento el cual lo capturará la función que se encarga de validar
    email.addEventListener("input", e => validarEmail(e))
    password.addEventListener("input", validarContrasenia)

    // el evento blur desencadenar el evento una vez que abandono el input, por eso si está vacio, le indico que lo obligue a cargarlo
    email.addEventListener("blur", e => isEmpty(`⚠️Se requiere que ingrese su ${email.name}`, e))
    password.addEventListener("blur", e => isEmpty(`⚠️Se requiere que ingrese su ${password.name}`, e))


    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
       event.preventDefault()

        //Creamos el cuerpo de la request (petición al servidor)
       const payload = {
        email: normalizarEmail(email.value),
        password: password.value
      }
    
        // vemos el objeto que recibimos del formulario
    //   console.log(payload);

        //configuramos la request del Fetch
        const settings = {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            }
        }

        // Lanzamos la consulta del login a la API
        if (email.value.length > 0 && password.value.length > 0) {
            console.log("Si está todo ok mando a hacer el fetch");

            realizarLogin(settings)
        }
    });
    
    
    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(settings) {
        console.log(settings);
        console.log("🏄🏻‍♂️Lanzando la consulta a la API....");
        
        fetch(`${url}/users/login`, settings)
        .then( response => {
            console.log(response);
            // manejar el error de la request, si todo va bien, esta respuesta la capturaremos en el siguiente .then
            if (response.ok) return response.json()
            
            // Si hay un error, fuerzo el error para capturarlo en el .catch
            return Promise.reject(response)
            
            // return response.json().then(errorData => {
                //     throw new Error(errorData);
                // })
                
            })
            .then(data =>{
                console.log(data);
                console.log(data.jwt);
                
                if (data.jwt) {
                    // Guardamos el dato JWT en LocalStorage (ese token de autenticacion)
                    localStorage.setItem("jwt", JSON.stringify(data.jwt))
                    
                    form.reset() // para limpiar los campos de los inputs del formulario
                    // redireccionamos a nuestro dashboard de todo
                    location.replace("./mis-tareas.html")
                }
            })
            .catch( err => {
                console.error(err);
                console.error(err.status);
            if (err.status == 400) {
                console.warn("Contraseña incorrecta")
                alert("Contraseña incorrecta. Por favor vuelve a ingresarlo")
            } else if (err.status == 404) {
                console.warn("El usuario no existe")
                alert("El usuario no existe, revise el email")
            } else {
                console.error("Error del servidor | url no existe")
                alert("Error del servidor o url no existe, comúniquese con el proveedor")
            }
        })        
    };
});

// "email": "juana@dearco.com",
// "password": "123456"
