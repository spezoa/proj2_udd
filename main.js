let botonAgregar = document.getElementById('agregar')
botonAgregar.addEventListener('click', (evento) => agregarTarea(evento))

let botonActualizar = document.getElementById('actualizar')
botonActualizar.addEventListener('click', (evento) => actualizarTarea(evento))

let nombre = document.getElementById('nombre-tarea')
let responsable = document.getElementById('responsable')
let descripcion = document.getElementById('descripcion')

let contenedor = document.getElementById('tareas')

let tareas = []

function agregarTarea(e) {
  e.preventDefault()

  const tarea = {
    nombre: nombre.value, //este elemento es único
    responsable: responsable.value,
    descripcion: descripcion.value
  }

  // if (tarea que estoy creando ya existe en el array o algun input está vacío) {
  //     mostrar un error
  // }else {
  tareas.push(tarea)
  guardarEnLS()
  mostrarTareas()
  limpiarInput()
  // }
}

function limpiarInput() {
  nombre.value = ''
  responsable.value = ''
  descripcion.value = ''
}

function editarTarea(button, nombreTarea) {
  botonAgregar.style.display = 'none'
  botonActualizar.style.display = 'block'

  let tareaEnEdicion = tareas.find((tarea) => tarea.nombre === nombreTarea)

  nombre.value = tareaEnEdicion.nombre
  responsable.value = tareaEnEdicion.responsable
  descripcion.value = tareaEnEdicion.descripcion
  nombre.setAttribute('enabled', true)
}

function eliminarTarea(boton, nombre) {
  boton.parentElement.parentElement.remove()
  tareas = tareas.filter((tarea) => tarea.nombre !== nombre)
  guardarEnLS()
}

function leerTareas() {
  let tareasEnLS = window.localStorage.getItem('tareas')

  //   if (tareasEnLS === null) {
  //     tareas = []
  //   } else {
  //     tareas = JSON.parse(tareasEnLS)
  //     }

  tareas = JSON.parse(tareasEnLS) || []
  mostrarTareas()
}

function mostrarTareas() {
  contenedor.innerHTML = ''
  tareas.forEach((tarea) => {
    contenedor.innerHTML += `
            <article>
                <div>
                    <p>${tarea.nombre}</p>
                    <p>${tarea.responsable}</p>
                    <p>${tarea.descripcion}</p>
                </div>
                <div>
                    <button onclick="editarTarea(this, '${tarea.nombre}' )">Editar</button>
                    <button onclick="eliminarTarea(this, '${tarea.nombre}' )">Borrar</button>
                </div>
            </article>
      `
  })
}

function guardarEnLS() {
  let arrayConvertidoAString = JSON.stringify(tareas)
  window.localStorage.setItem('tareas', arrayConvertidoAString)
}

function actualizarTarea(evento) {
  evento.preventDefault()
  // leer los datos del input
  let nombreTarea = nombre.value
  let nuevoResponsable = responsable.value
  let nuevaDescripcion = descripcion.value

  // editar el obtejo dentro del array que tenga el identificar
  tareas = tareas.map((tarea) => {
    if (tarea.nombre === nombreTarea) {
      return {
        nombre: nombreTarea,
        responsable: nuevoResponsable,
        descripcion: nuevaDescripcion
      }
    } else {
      return tarea
    }
  })

  // limpiar los input
  limpiarInput()

  // vuelve a aparecer boton agregar
  botonAgregar.style.display = 'block'
  // vuelva a desaparecer el boton actualizar
  botonActualizar.style.display = 'none'
  // vuelve a quedar activo el input
  nombre.removeAttribute('disabled')
  // actualizo el LS
  guardarEnLS()
  // actualizar la tabla
  mostrarTareas()
}

leerTareas()

// ctrl + alt + }x2