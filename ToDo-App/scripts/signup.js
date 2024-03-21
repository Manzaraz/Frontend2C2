window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.forms[0];
    const nombre = document.querySelector('#inputNombre');
    const apellido = document.querySelector('#inputApellido');
    const email = document.querySelector('#inputEmail');
    const password = document.querySelector('#inputPassword');
    const url = "https://todo-api.ctd.academy/v1"

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        //creamos el cuerpo de la request
        const payload = {
            firstName: nombre.value,
            lastName: apellido.value, 
            email: email.value,
            password: password.value
        };
        //configuramos la request del Fetch
        const settings = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        //lanzamos la consulta de login a la API
        realizarRegister(settings);

        //limpio los campos del formulario
        form.reset();
    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {
        console.log("Lanzando la consulta a la API");
        fetch(`${url}/users`, settings)
            .then(response => {
                console.log(response);

                if (response.ok != true) {
                    alert("Alguno de los datos es incorrecto.")
                    return Promise.reject(response)
                }

                return response.json();

            })
            .then(data => {
                console.log("Promesa cumplida:");
                console.log(data);

                if (data.jwt) {
                    //guardo en LocalStorage el objeto con el token
                    localStorage.setItem('jwt', JSON.stringify(data.jwt));

                    //redireccionamos a la página
                    location.replace('./mis-tareas.html');
                }
                
            })
            .catch(err => {
                console.error(err);
                console.error(err.status);
                if (err.status == 400) {
                    console.warn("El usuario ya se encuentra registrado / Alguno de los datos requeridos está incompleto")
                    alert("El usuario ya se encuentra registrado / Alguno de los datos requeridos está incompleto")
                } else {
                    console.error("Error del servidor | url no existe")                   
                }
            })
    };


});