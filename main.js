let addButton = document.getElementById('addBtn')
addButton.addEventListener('click', (event) => assignFunction(event))

let updateButton = document.getElementById('updateBtn')
updateButton.addEventListener('click', (event) => updateAssignment(event))

let functionName = document.getElementById('functionName')
let accountable = document.getElementById('accountableName')
let assignDescription = document.getElementById('assignDescription')

let assignedFunctionContainer = document.getElementById('assignedFunction')

let assignedFunction = []

function assignFunction(assignment) {
  assignment.preventDefault()

  const tarea = {
    name: functionName.value,
    accountable: accountable.value,
    description: assignDescription.value
  }

  assignedFunction.push(tarea)
  guardarEnLS()
  mostrarTareas()
  limpiarInput()
}

function limpiarInput() {
  functionName.value = ''
  accountable.value = ''
  assignDescription.value = ''
}

function editarTarea(button, nombreTarea) {
  addButton.style.display = 'none'
  updateButton.style.display = 'block'

  let tareaEnEdicion = assignedFunction.find((tarea) => tarea.name === nombreTarea)

  functionName.value = tareaEnEdicion.name
  accountable.value = tareaEnEdicion.accountable
  assignDescription.value = tareaEnEdicion.description
  functionName.setAttribute('disabled', true)
}

function eliminarTarea(boton, functionName) {
  boton.parentElement.parentElement.remove()
  assignedFunction = assignedFunction.filter((tarea) => tarea.name !== functionName)
  guardarEnLS()
}

function leerTareas() {
  let tareasEnLS = window.localStorage.getItem('assignedFunction')

  assignedFunction = JSON.parse(tareasEnLS) || []

  mostrarTareas()
}

function mostrarTareas() {
  assignedFunctionContainer.innerHTML = ''
  assignedFunction.forEach((tarea) => {
    assignedFunctionContainer.innerHTML += `
            <article>
                <div>
                    <p>${tarea.name}</p>
                    <p>${tarea.accountable}</p>
                    <p>${tarea.description}</p>
                </div>
                <div>
                    <button onclick="editarTarea(this, '${tarea.name}' )">Editar</button>
                    <button onclick="eliminarTarea(this, '${tarea.name}' )">Borrar</button>
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
  let nombreTarea = functionName.value
  let nuevoResponsable = accountable.value
  let nuevaDescripcion = assignDescription.value

  assignedFunction = assignedFunction.map((tarea) => {
    if (tarea.name === nombreTarea) {
      return {
        name: nombreTarea,
        accountable: nuevoResponsable,
        description: nuevaDescripcion
      }
    } else {
      return tarea
    }
  })

  limpiarInput()

  addButton.style.display = 'block'
  updateButton.style.display = 'none'
  functionName.removeAttribute('disabled')
  guardarEnLS()
  mostrarTareas()
}

leerTareas()