let addButton = document.getElementById('addBtn')
addButton.addEventListener('click', (event) => assignFunction(event))

let updateButton = document.getElementById('updateBtn')
updateButton.addEventListener('click', (event) => updateAssignment(event))

let functionName = document.getElementById('functionName')
let accountable = document.getElementById('accountableName')
let assignDescription = document.getElementById('assignDescription')

let assignedFunctionContainer = document.getElementById('assignedFunction')

let assignedFunction = []

function assignFunction(assignmentFunc) {
  assignmentFunc.preventDefault()

  const assignment = {
    name: functionName.value,
    accountable: accountable.value,
    description: assignDescription.value
  }

  assignedFunction.push(assignment)
  saveAtLocalStorage()
  showAssignments()
  cleanInput()
}

function cleanInput() {
  functionName.value = ''
  accountable.value = ''
  assignDescription.value = ''
}

function editFunction(button, nombreTarea) {
  addButton.style.display = 'none'
  updateButton.style.display = 'block'

  let assignmentInEdition = assignedFunction.find((assignment) => assignment.name === nombreTarea)

  functionName.value = assignmentInEdition.name
  accountable.value = assignmentInEdition.accountable
  assignDescription.value = assignmentInEdition.description
  functionName.setAttribute('disabled', true)
}

function eraseAssignment(boton, functionName) {
  boton.parentElement.parentElement.remove()
  assignedFunction = assignedFunction.filter((assignment) => assignment.name !== functionName)
  saveAtLocalStorage()
}

function readAssignments() {
  let tareasEnLS = window.localStorage.getItem('assignedFunction')

  assignedFunction = JSON.parse(tareasEnLS) || []

  showAssignments()
}

function showAssignments() {
  assignedFunctionContainer.innerHTML = ''
  assignedFunction.forEach((assignment) => {
    assignedFunctionContainer.innerHTML += `
    <article class="my-3">
      <div>
        <p class="formInSection">${assignment.accountable}</p>
        <p class="formInSection">${assignment.name}</p>
        <p class="formInSection">${assignment.description}</p>
      </div>
      <div>
        <button class="mx-3 btn btn-info text-dark"
            onclick="editFunction(this, '${assignment.name}' )">Editar</button>
        <button class="btn btn-danger text-dark"
            onclick="eraseAssignment(this, '${assignment.name}' )">Borrar</button>
      </div>
    </article>
      `
  })
}

function saveAtLocalStorage() {
  let arrayConvertidoAString = JSON.stringify(assignedFunction)
  window.localStorage.setItem('assignedFunction', arrayConvertidoAString)
}

function updateAssignment(evento) {
  evento.preventDefault()
  let nombreTarea = functionName.value
  let nuevoResponsable = accountable.value
  let nuevaDescripcion = assignDescription.value

  assignedFunction = assignedFunction.map((assignment) => {
    if (assignment.name === nombreTarea) {
      return {
        name: nombreTarea,
        accountable: nuevoResponsable,
        description: nuevaDescripcion
      }
    } else {
      return assignment
    }
  })

  cleanInput()

  addButton.style.display = 'block'
  updateButton.style.display = 'none'
  functionName.removeAttribute('disabled')
  saveAtLocalStorage()
  showAssignments()
}

readAssignments()