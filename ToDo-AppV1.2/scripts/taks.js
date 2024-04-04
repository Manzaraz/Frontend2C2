// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.
if (!localStorage.jwt) {
  console.log("No estas logeado");
  location.replace("./index.html")
}


/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {
  /* ---------------- Inicializamos la libreria AOS ---------------- */
  AOS.init();
  
  /* ---------------- variables globales y llamado a funciones ---------------- */
  const btnCerrarSesion = document.querySelector("#closeApp")
  const formCrearTarea = document.querySelector(".nueva-tarea")
  const nuevaTarea = document.querySelector("#nuevaTarea")

  // URLS 
  const url = "https://todo-api.ctd.academy/v1"
  const urlTareas = `${url}/tasks`
  const urlUsuario = `${url}/users/getMe`

  // Nuestro token del local storage
  // console.log(localStorage.jwt);
  const token = JSON.parse(localStorage.jwt)  

  obtenerNombreUsuario()
  consultarTareas()

  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {
    // const cerrarSesion = confirm("¿Estás seguro de que deseas cerrar sesión?")

    // if (cerrarSesion) {
    //   // limpiar el LocalStorage y redireccionar al login
    //   localStorage.clear()
    //   location.replace("./index.html")
    // }

    Swal.fire({
      title: "¿Estás seguro de que deseas cerrar sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Si, Confirmo!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Hasta luego!',
          'Te esperamos pronto.',
          'success'
          )
          setTimeout(() => {
            localStorage.clear()
            location.replace("./index.html")
          }, 2000);
      }
    });
  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {
   const settings = {
    method: 'GET',
    headers: {
      authorization: token
    }
   }

   // ahora me encargo de hacer el fetch
   console.log("🚩 Consulto los datos de mi usuario");
   fetch(urlUsuario, settings)
    .then(response =>  response.json())
    .then( data => {
      console.log(`Nombre de usuario: ${data.firstName}`);
      const nombreUsuario = document.querySelector(".user-info p")
      nombreUsuario.textContent = data.firstName
    })
    .catch( err => console.log(err))
  };


  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {
    const settings = {
      method: "GET",
      headers: {
        authorization: token
      }
    }
    console.log("🚩 Consulto las tareas del usuario");
    fetch(urlTareas, settings)
      .then( response => response.json())
      .then( tareas => {
        console.log("Tareas del usuario");
        console.log(tareas);

        renderizarTareas(tareas)
        botonesCambioEstado() 
        botonBorrarTarea()
      })
      .catch( err => console.warn(err))
  };


  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event) {
    event.preventDefault()

    // console.log(nuevaTarea.value.trim());

    const payload = {
      description: nuevaTarea.value.trim(),
      // completed: true
    }
    // console.log(payload);

    const settings = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",      
        authorization: token
      }
    }
    // console.log(settings);

    console.log("🚩Creando una tarea en la base de datos");
    fetch(urlTareas, settings)
      .then( response => response.json())
      .then( tarea => {
        console.log(tarea);
        // Limpiar el formulario
        formCrearTarea.reset()

        // Mando a cargar las tareas en pantalla
        consultarTareas()
      })
      .catch( error => console.warn(error))

  });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {
    // obtengo listados y limpio cualquier contenido interno
    const tareasPendientes = document.querySelector('.tareas-pendientes');
    const tareasTerminadas = document.querySelector('.tareas-terminadas');
    tareasPendientes.innerHTML = ""
    tareasTerminadas.innerHTML = ""

    // Buscamos el contendor donde pondré el contador de tareas
    const totalFinalizadas= document.querySelector("#cantidad-finalizadas")
    let contador = 0
    totalFinalizadas.innerHTML = contador
// 
    // console.log(listado);

    listado.forEach(tarea => {
      // console.log(tarea);
      // Creamos la variable para crear la fecha de creación de la tarea
      let fecha = new Date(tarea.createdAt)
      // console.log(fecha);

      if (tarea.completed) {
        // como completed esta en true sumo uno al contador
        contador++
        console.log(contador);
        
        /// renderizo las tarjeas completadas
        tareasTerminadas.innerHTML += `
          <li class="tarea" data-aos="flip-up" data-aos-duration="1500" >
            <div class="hecha">
              <i class="fa-regular fa-circle-check"></i>
            </div>
            <div class="descripcion">
              <p class="nombre">${tarea.description}</p>
              <div class="cambios-estados">
                <button class="change incompleta" id="${tarea.id}"><i class="fa-solid fa-rotate-left"></i></button>
                <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
              </div>
            </div>
          </li>
        `

      } else {
        // renderizo la tarjetas pendientes
        tareasPendientes.innerHTML += `
          <li class="tarea" data-aos="fade-right" data-aos-duration="2500" >
            <button class="change" id="${tarea.id}"><i class="fa-regular fa-circle"></i></button>
            <div class="descripcion">
              <p class="nombre">${tarea.description}</p>
              <p class="timestamp">${fecha.toLocaleDateString()}</p>
            </div>
          </li>
        `        
      }

      totalFinalizadas.innerHTML = contador      
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {
    const btnsCambioEstado = document.querySelectorAll(".change")
    console.log(btnsCambioEstado);
    
    btnsCambioEstado.forEach( boton => {
      // a cada boton le agrego un evento para cambiar el estado
      boton.addEventListener("click", (e) => { 
        console.log("cambio de estado");
        // console.log(e);
        console.log(e.target);

        const id = e.target.id
        const urlTareaUpdate = `${urlTareas}/${id}`
        const payload = {}

        //segun el tipo de boton que fue clickeado, cambiamos el estado de la tarea
        if (e.target.classList.contains("incompleta")) {
          // tarea completada/ y la paso a pendiente
          payload.completed = false
        } else {
          // sino, está pendiente, la paso a completada
          payload.completed = true
        }
        // console.log(payload);

        const settings = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",      
            authorization: token
          },
          body: JSON.stringify(payload)
        }

        fetch(urlTareaUpdate, settings )
          .then( response => {
            console.log(response);  
            consultarTareas()
          })
       })
    })



  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {
    //obtenemos los botones de borrado
    const btnBorrarTarea = document.querySelectorAll('.borrar');

    btnBorrarTarea.forEach(boton => {
      //a cada boton de borrado le asignamos la funcionalidad
      boton.addEventListener('click', function (event) {
        Swal.fire({
          title: "¿Confirma que desesa eliminar tarea?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "¡Confirmo!"
        }).then((result) => {
          if (result.isConfirmed) {
            const id = event.target.id;
            const url = `${urlTareas}/${id}`
    
            const settingsCambio = {
              method: 'DELETE',
              headers: {
                "Authorization": token,
              }
            }
            fetch(url, settingsCambio)
              .then(response => {
                console.log("Borrando tarea...");
                console.log(response.status);
                //vuelvo a consultar las tareas actualizadas y pintarlas nuevamente en pantalla
                consultarTareas();
              })         

              Swal.fire(
                 "¡Tarea eliminada!"
              );
          }
        });

      })
    });
  }

});