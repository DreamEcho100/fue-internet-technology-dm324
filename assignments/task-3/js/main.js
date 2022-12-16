const crudForm = document.querySelector('.crud-form')

const nameInput = crudForm.querySelector('.name-input')
const emailInput = crudForm.querySelector('.email-input')
const salaryInput = crudForm.querySelector('.salary-input')
const cityInput = crudForm.querySelector('.city-input')

const crudTable = document.querySelector('.crud-table')
const crudTableBody = crudTable.querySelector('tbody')

let formState = []

function clearCRUDForm() {
  nameInput.value = ''
  emailInput.value = ''
  salaryInput.value = '0'
  cityInput.value = ''
}

let formUpdatingRecordId = null

function updateTableRecord(id) {
  const targetedRecord = formState.find(function (item) {
    return item.id === id
  })

  const targetedRow = crudTableBody.querySelector(`.tr-${id}`)
  const nameElement = targetedRow.querySelector('.name')
  const emailElement = targetedRow.querySelector('.email')
  const salaryElement = targetedRow.querySelector('.salary')
  const cityElement = targetedRow.querySelector('.city')
  // const updatedAtElement = targetedRow.querySelector('.updated-at')

  const data = {
    ...targetedRecord,
    name: nameInput.value,
    email: emailInput.value,
    salary: salaryInput.valueAsNumber,
    city: cityInput.value,
    updatedAt: new Date(),
  }

  nameElement.innerText = data.name
  emailElement.innerText = data.email
  salaryElement.innerText = data.salary
  cityElement.innerText = data.city
  // updatedAtElement.innerText = data.updatedAt.toLocaleString()

  formUpdatingRecordId = null
  clearCRUDForm()

  formState = formState.map((item) => (item.id === id ? data : item))
}

function createTableRecord() {
  const data = {
    id: Math.random().toString(16).slice(2),
    name: nameInput.value,
    email: emailInput.value,
    salary: salaryInput.valueAsNumber,
    city: cityInput.value,
    createdAt: new Date(),
    updatedAt: null,
  }

  formState.push(data)

  const tr = document.createElement('tr')

  tr.classList.add(`tr-${data.id}`)

  tr.innerHTML = `<!-- <th scope='row'>${data.id}</th> -->
	<td class='name'>${data.name}</td>
	<td class='email'>${data.email}</td>
	<td class='salary'>${data.salary}</td>
	<td class='city'>${data.city}</td>
	<!-- <td class='created-at'>${data.createdAt.toLocaleString()}</td>
	<td class='updated-at'></td> -->
	<td class="actions-buttons-cell">
		<button class="update-button" title="update record">
			<i class="fa fa-edit"></i></button
		><button class="delete-button" title="delete record">
			<i class="fa fa-trash"></i>
		</button>
	</td>`

  const recordUpdateButton = tr.querySelector('.update-button')
  console.log('recordUpdateButton', recordUpdateButton)
  const recordDeleteButton = tr.querySelector('.delete-button')
  console.log('recordDeleteButton', recordDeleteButton)

  recordUpdateButton.addEventListener('click', function (event) {
    nameInput.value = data.name
    emailInput.value = data.email
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
