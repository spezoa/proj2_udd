let addButton = document.getElementById('addBtn')
addButton.addEventListener('click', (evento) => agregarTarea(evento))

let botonActualizar = document.getElementById('actualizar')
botonActualizar.addEventListener('click', (evento) => actualizarTarea(evento))

let functionName = document.getElementById('functionName')
let accountable = document.getElementById('accountable')
let descripcion = document.getElementById('descripcion')

let assignedFunctionContainer = document.getElementById('assignedFunction')

let assignedFunction = []

function agregarTarea(e) {
  e.preventDefault()

  const tarea = {
    nombre: functionName.value, //este elemento es único
    responsable: accountable.value,
    descripcion: descripcion.value
  }

  // if (tarea que estoy creando ya existe en el array o algun input está vacío) {
  //     mostrar un error
  // }else {
  assignedFunction.push(tarea)
  guardarEnLS()
  mostrarTareas()
  limpiarInput()
  // }
}

function limpiarInput() {
  functionName.value = ''
  accountable.value = ''
  descripcion.value = ''
}

function editarTarea(button, nombreTarea) {
  addButton.style.display = 'none'
  botonActualizar.style.display = 'block'

  let tareaEnEdicion = assignedFunction.find((tarea) => tarea.nombre === nombreTarea)

  functionName.value = tareaEnEdicion.nombre
  accountable.value = tareaEnEdicion.responsable
  descripcion.value = tareaEnEdicion.descripcion
  functionName.setAttribute('disabled', true)
}

function eliminarTarea(boton, functionName) {
  boton.parentElement.parentElement.remove()
  assignedFunction = assignedFunction.filter((tarea) => tarea.nombre !== functionName)
  guardarEnLS()
}

function leerTareas() {
  let tareasEnLS = window.localStorage.getItem('assignedFunction')

  //   if (tareasEnLS === null) {
  //     tareas = []
  //   } else {
  //     tareas = JSON.parse(tareasEnLS)
  //     }

  assignedFunction = JSON.parse(tareasEnLS) || []
  mostrarTareas()
}

function mostrarTareas() {
  assignedFunctionContainer.innerHTML = ''
  assignedFunction.forEach((tarea) => {
    assignedFunctionContainer.innerHTML += `
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
  let arrayConvertidoAString = JSON.stringify(assignedFunction)
  window.localStorage.setItem('assignedFunction', arrayConvertidoAString)
}

function actualizarTarea(evento) {
  evento.preventDefault()
  // leer los datos del input
  let nombreTarea = functionName.value
  let nuevoResponsable = accountable.value
  let nuevaDescripcion = descripcion.value

  // editar el obtejo dentro del array que tenga el identificar
  assignedFunction = assignedFunction.map((tarea) => {
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
  addButton.style.display = 'block'
  // vuelva a desaparecer el boton actualizar
  botonActualizar.style.display = 'none'
  // vuelve a quedar activo el input
  functionName.removeAttribute('disabled')
  // actualizo el LS
  guardarEnLS()
  // actualizar la tabla
  mostrarTareas()
}

leerTareas()

// ctrl + alt + }x2