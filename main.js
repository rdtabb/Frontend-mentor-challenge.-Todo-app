const submitButton = document.getElementById('add-task');
const todoListContainer = document.getElementById('todo-list-container');
const addTodoField = document.getElementById('input-value');

const deleteCompletedButton = document.getElementById('delete-completed-button');
const showAll = document.getElementById('show-all-b')
const showActive = document.getElementById('show-active-b')
const showCompleted = document.getElementById('show-completed-b')
const counter = document.getElementById('counter')

submitButton.addEventListener('click', () => {
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-container');
    todoContainer.setAttribute('id', 'todo-container-active');
    todoListContainer.appendChild(todoContainer);

    const numb = todoListContainer.childElementCount;

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

    //-----------------------------------------------
    todoComplete.addEventListener('click', () => {
        const visibility = todoComplete.getAttribute('data-visible');
        if (visibility === 'true') {
            todoText.classList.add('line-through');
            todoComplete.setAttribute('data-visible', 'false');
            todoContainer.setAttribute('id', 'todo-container-completed');
        } else {
            todoText.classList.remove('line-through');
            todoComplete.setAttribute('data-visible', 'true');
            todoContainer.setAttribute('id', 'todo-container-active');
        }
    })

    //-----------------------------------------------
    deleteButton.addEventListener('click', () => {
        todoListContainer.removeChild(todoContainer);
        const todoListContainerNumber = todoListContainer.childElementCount;
        counter.innerText = `${todoListContainerNumber}`
    })

    //-----------------------------------------------
    deleteCompletedButton.addEventListener('click', () => {
        const completedTasks = todoContainer.querySelector('.line-through')
        const mainContainer = todoContainer.parentNode;
        if (todoContainer.contains(completedTasks)) {
            mainContainer.removeChild(todoContainer)
            const mainContainerNumb = mainContainer.childElementCount;
            //counter.innerText = `${mainContainerNumb}`
            counter.innerText = `0`
            // that is indeed the problem
        }
    })

    counter.innerText = `${numb}`

    //-----------------------------------------------
    showActive.addEventListener('click', () => {
        const completedTodo = document.querySelectorAll('#todo-container-completed')
        const activeTodo = document.querySelectorAll('#todo-container-active')
        completedTodo.forEach((todo) => todo.classList.add('removed'))
        activeTodo.forEach((nodo) => nodo.classList.remove('removed'))

        showAll.setAttribute('data-active', 'false')
        showCompleted.setAttribute('data-active', 'false')
        showActive.setAttribute('data-active', 'true')

        const number = activeTodo.length
        counter.innerText = `${number}`
    })

    showCompleted.addEventListener('click', () => {
        const completedTodo = document.querySelectorAll('#todo-container-completed')
        const activeTodo = document.querySelectorAll('#todo-container-active')
        completedTodo.forEach((todo) => todo.classList.remove('removed'))
        activeTodo.forEach((nodo) => nodo.classList.add('removed'))

        showAll.setAttribute('data-active', 'false')
        showCompleted.setAttribute('data-active', 'true')
        showActive.setAttribute('data-active', 'false')

        const number = completedTodo.length
        counter.innerText = `${number}`
    })

    showAll.addEventListener('click', () => {
        const completedTodo = document.querySelectorAll('#todo-container-completed')
        const activeTodo = document.querySelectorAll('#todo-container-active')
        completedTodo.forEach((todo) => todo.classList.remove('removed'))
        activeTodo.forEach((nodo) => nodo.classList.remove('removed'))

        showAll.setAttribute('data-active', 'true')
        showCompleted.setAttribute('data-active', 'false')
        showActive.setAttribute('data-active', 'false')

        const mainContainer = todoContainer.parentNode;
        const mainContainerNumb = mainContainer.childElementCount; 
        counter.innerText = `${mainContainerNumb}`
    })
})
