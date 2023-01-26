const submitButton = document.getElementById('add-task')
const todoListContainer = document.getElementById('todo-list-container')

const inputText = document.getElementById('input-task')
const checkbox = document.getElementById('complete-task')
const checkboxImage = document.getElementById('checkbox__image')

const inputValue = inputText.value

submitButton.addEventListener('click', () => {
    const todoContainer = document.createElement('div')
    todoContainer.classList.add('todo-container')
    todoListContainer.appendChild(todoContainer)

    todoContainer.appendChild(inputText)
    todoContainer.appendChild(checkbox)
    todoContainer.appendChild(checkboxImage)

    inputText.innerText = inputValue
})