window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.forms[0]
    // const form = document.querySelector("form")
    const email = document.querySelector("#inputEmail")
    const password = document.querySelector("#inputPassword")
    const url = "https://todo-api.ctd.academy/v1"



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

    //    console.log(settings);

       realizarLogin(settings)

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
