const submitButton = document.getElementById('add-task');
const todoListContainer = document.getElementById('todo-list-container');
const addTodoField = document.getElementById('input-value');

const deleteCompletedButton = document.getElementById('delete-completed-button');

submitButton.addEventListener('click', () => {
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-container');
    todoContainer.setAttribute('id', 'todo-container');
    todoListContainer.appendChild(todoContainer);

    const todoComplete = document.createElement('input');
    todoComplete.setAttribute('type', 'checkbox');
    todoComplete.setAttribute('name', 'check');
    todoComplete.setAttribute('id', 'complete-task');
    todoComplete.setAttribute('data-visible', 'true');

    const checkboxImage = document.createElement('img');
    checkboxImage.classList.add('checkbox__image');
    checkboxImage.setAttribute('id', 'checkbox__image');
    checkboxImage.setAttribute('src', './images/icon-check.svg');

    const todoText = document.createElement('input');
    todoText.setAttribute('id', 'input-task');
    todoText.setAttribute('type', 'text');
    todoText.setAttribute('value', `${addTodoField.value}`);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('cross-icon');

    todoContainer.appendChild(todoComplete);
    todoContainer.appendChild(checkboxImage);
    todoContainer.appendChild(todoText);
    todoContainer.appendChild(deleteButton);

    todoComplete.addEventListener('click', () => {
        const visibility = todoComplete.getAttribute('data-visible');
        if (visibility === 'true') {
            todoText.classList.add('line-through');
            todoComplete.setAttribute('data-visible', 'false');
        } else {
            todoText.classList.remove('line-through');
            todoComplete.setAttribute('data-visible', 'true');
        }
    })

    deleteButton.addEventListener('click', () => {
        todoListContainer.removeChild(todoContainer);
    })

    //-----------------------------------------------
    deleteCompletedButton.addEventListener('click', () => {
        const completedTasks = todoContainer.querySelector('.line-through')
        const mainContainer = todoContainer.parentNode;
        if (todoContainer.contains(completedTasks)) {
            mainContainer.removeChild(todoContainer)
        }
    })
})

