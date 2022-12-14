const crudForm = document.querySelector('.crud-form')

const firstNameInput = crudForm.querySelector('.first-name-input')
const lastNameInput = crudForm.querySelector('.last-name-input')
const salaryInput = crudForm.querySelector('.salary-input')
const cityInput = crudForm.querySelector('.city-input')

const crudTable = document.querySelector('.crud-table')
const crudTableBody = crudTable.querySelector('tbody')

let formState = []

function clearCRUDForm() {
  firstNameInput.value = ''
  lastNameInput.value = ''
  salaryInput.value = '0'
  cityInput.value = ''
}

let formUpdatingRecordId = null

function updateTableRecord(id) {
  const targetedRecord = formState.find(function (item) {
    return item.id === id
  })

  const targetedRow = crudTableBody.querySelector(`.tr-${id}`)
  const firstNameElement = targetedRow.querySelector('.first-name')
  const lastNameElement = targetedRow.querySelector('.last-name')
  const salaryElement = targetedRow.querySelector('.salary')
  const cityElement = targetedRow.querySelector('.city')
  const updatedAtElement = targetedRow.querySelector('.updated-at')

  const data = {
    ...targetedRecord,
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    salary: salaryInput.valueAsNumber,
    city: cityInput.value,
    updatedAt: new Date(),
  }

  firstNameElement.innerText = data.firstName
  lastNameElement.innerText = data.lastName
  salaryElement.innerText = data.salary
  cityElement.innerText = data.city
  updatedAtElement.innerText = data.updatedAt.toLocaleString()

  formUpdatingRecordId = null
  clearCRUDForm()

  formState = formState.map((item) => (item.id === id ? data : item))
}

function createTableRecord() {
  const data = {
    id: Math.random().toString(16).slice(2),
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    salary: salaryInput.valueAsNumber,
    city: cityInput.value,
    createdAt: new Date(),
    updatedAt: null,
  }

  formState.push(data)

  const tr = document.createElement('tr')

  tr.classList.add(`tr-${data.id}`)

  tr.innerHTML = `<td>${data.id}</td>
	<td class='first-name'>${data.firstName}</td>
	<td class='last-name'>${data.lastName}</td>
	<td class='salary'>${data.salary}</td>
	<td class='city'>${data.city}</td>
	<td class='created-at'>${data.createdAt.toLocaleString()}</td>
	<td class='updated-at'></td>
	<td><button class='update-button'>update</button><button class='delete-button'>delete</button></td>`

  const recordUpdateButton = tr.querySelector('.update-button')
  const recordDeleteButton = tr.querySelector('.delete-button')

  recordUpdateButton.addEventListener('click', function (event) {
    firstNameInput.value = data.firstName
    lastNameInput.value = data.lastName
    salaryInput.value = data.salary
    cityInput.value = data.city

    formUpdatingRecordId = data.id
  })

  recordDeleteButton.addEventListener('click', function () {
    const targetedRow = crudTableBody.querySelector(`.tr-${data.id}`)

    targetedRow.parentElement.removeChild(targetedRow)
  })

  crudTableBody.appendChild(tr)
  clearCRUDForm()
}

crudForm.addEventListener('submit', function (event) {
  event.preventDefault()

  if (formUpdatingRecordId) return updateTableRecord(formUpdatingRecordId)

  createTableRecord()
})
