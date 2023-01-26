const submitButton = document.getElementById('add-task')
const todoListContainer = document.getElementById('todo-list-container')
const addTodoField = document.getElementById('input-value')
const inputValue = addTodoField.value

submitButton.addEventListener('click', () => {
    const todoContainer = document.createElement('div')
    todoContainer.classList.add('todo-container')
    todoListContainer.appendChild(todoContainer)

    const todoComplete = document.createElement('input')
    todoComplete.setAttribute('type', 'checkbox')
    todoComplete.setAttribute('name', 'check')
    todoComplete.setAttribute('id', 'complete-task')

    const checkboxImage = document.createElement('img')
    checkboxImage.classList.add('checkbox__image')
    checkboxImage.setAttribute('id', 'checkbox__image')
    checkboxImage.setAttribute('src', './images/icon-check.svg')

    const todoText = document.createElement('input')
    todoText.setAttribute('id', 'input-task')
    todoText.setAttribute('type', 'text')
    todoText.innerText = inputValue //why doesn't it work??? will solve later

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('cross-icon')

    todoContainer.appendChild(todoComplete)
    todoContainer.appendChild(checkboxImage)
    todoContainer.appendChild(todoText)
    todoContainer.appendChild(deleteButton)
})