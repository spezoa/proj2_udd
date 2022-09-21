let addButton = document.getElementById('addBtn')
addButton.addEventListener('click', (event) => assignFunction(event))

let updateButton = document.getElementById('updateBtn')
updateButton.addEventListener('click', (event) => updateAssignment(event))

let functionName = document.getElementById('functionName')
let accountable = document.getElementById('accountableName')
let assignDescription = document.getElementById('assignDescription')

let assignedFunctionContainer = document.getElementById('assignedFunction')

let assignedFunction = []

function assignFunction(e) {
  e.preventDefault()

  const tarea = {
    nombre: functionName.value, //este elemento es único
    responsable: accountable.value,
    descripcion: assignDescription.value
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
  assignDescription.value = ''
}

function editarTarea(button, nombreTarea) {
  addButton.style.display = 'none'
  updateButton.style.display = 'block'

  let tareaEnEdicion = assignedFunction.find((tarea) => tarea.nombre === nombreTarea)

  functionName.value = tareaEnEdicion.nombre
  accountable.value = tareaEnEdicion.responsable
  assignDescription.value = tareaEnEdicion.descripcion
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

function updateAssignment(evento) {
  evento.preventDefault()
  // leer los datos del input
  let nombreTarea = functionName.value
  let nuevoResponsable = accountable.value
  let nuevaDescripcion = assignDescription.value

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
  updateButton.style.display = 'none'
  // vuelve a quedar activo el input
  functionName.removeAttribute('disabled')
  // actualizo el LS
  guardarEnLS()
  // actualizar la tabla
  mostrarTareas()
}

leerTareas()