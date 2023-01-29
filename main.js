/* ----------------------------- */
/* Elements                      */
/* ----------------------------- */
const submitButton = document.getElementById("add-task");
const todoListContainer = document.getElementById("todo-list-container");
const addTodoField = document.getElementById("input-value");
const deleteCompletedButton = document.getElementById(
  "delete-completed-button"
);
const showAll = document.getElementById("show-all-b");
const showActive = document.getElementById("show-active-b");
const showCompleted = document.getElementById("show-completed-b");
const counter = document.getElementById("counter");

/* ----------------------------- */
/* Submit button                 */
/* ----------------------------- */
submitButton.addEventListener("click", () => {
  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todo-container");
  todoContainer.classList.add("draggable");
  todoContainer.setAttribute("id", "todo-container-active");
  todoContainer.setAttribute("draggable", "true");
  todoListContainer.appendChild(todoContainer);

  const numb = todoListContainer.childElementCount;

  const todoComplete = document.createElement("input");
  todoComplete.setAttribute("type", "checkbox");
  todoComplete.setAttribute("name", "check");
  todoComplete.setAttribute("id", "complete-task");
  todoComplete.setAttribute("data-visible", "true");

  const checkboxImage = document.createElement("img");
  checkboxImage.classList.add("checkbox__image");
  checkboxImage.setAttribute("id", "checkbox__image");
  checkboxImage.setAttribute("src", "./images/icon-check.svg");

  const todoText = document.createElement("input");
  todoText.setAttribute("id", "input-task");
  todoText.setAttribute("type", "text");
  todoText.setAttribute("value", `${addTodoField.value}`);

  addTodoField.value = "";

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("cross-icon");

  todoContainer.appendChild(todoComplete);
  todoContainer.appendChild(checkboxImage);
  todoContainer.appendChild(todoText);
  todoContainer.appendChild(deleteButton);

  /* ----------------------------- */
  /* Functions                     */
  /* ----------------------------- */
  const setAsCompleted = () => {
    todoText.classList.add("line-through");
    todoComplete.setAttribute("data-visible", "false");
    todoContainer.setAttribute("id", "todo-container-completed");
  };

  const setAsNonCompleted = () => {
    todoText.classList.remove("line-through");
    todoComplete.setAttribute("data-visible", "true");
    todoContainer.setAttribute("id", "todo-container-active");
  };

  const pressedDeleteButton = () => {
    todoListContainer.removeChild(todoContainer);
    const todoListContainerNumber = todoListContainer.childElementCount;
    counter.innerText = `${todoListContainerNumber}`;
  };

  const pressedDeleteCompleted = () => {
    const completedTasks = todoContainer.querySelector(".line-through");
    const mainContainer = todoContainer.parentNode;
    if (todoContainer.contains(completedTasks)) {
      mainContainer.removeChild(todoContainer);
      const mainContainerNumb = mainContainer.childElementCount;
      counter.innerText = `${mainContainerNumb}`;
    }
  };

  const showActiveFilter = () => {
    const completedTodo = document.querySelectorAll(
      "#todo-container-completed"
    );
    const activeTodo = document.querySelectorAll("#todo-container-active");
    completedTodo.forEach((todo) => todo.classList.add("removed"));
    activeTodo.forEach((nodo) => nodo.classList.remove("removed"));

    showAll.setAttribute("data-active", "false");
    showCompleted.setAttribute("data-active", "false");
    showActive.setAttribute("data-active", "true");

    const number = activeTodo.length;
    counter.innerText = `${number}`;
  };

  const showCompletedFilter = () => {
    const completedTodo = document.querySelectorAll(
      "#todo-container-completed"
    );
    const activeTodo = document.querySelectorAll("#todo-container-active");
    completedTodo.forEach((todo) => todo.classList.remove("removed"));
    activeTodo.forEach((nodo) => nodo.classList.add("removed"));

    showAll.setAttribute("data-active", "false");
    showCompleted.setAttribute("data-active", "true");
    showActive.setAttribute("data-active", "false");

    const number = completedTodo.length;
    counter.innerText = `${number}`;
  };

  const showAllFilter = () => {
    const completedTodo = document.querySelectorAll(
      "#todo-container-completed"
    );
    const activeTodo = document.querySelectorAll("#todo-container-active");
    completedTodo.forEach((todo) => todo.classList.remove("removed"));
    activeTodo.forEach((nodo) => nodo.classList.remove("removed"));

    showAll.setAttribute("data-active", "true");
    showCompleted.setAttribute("data-active", "false");
    showActive.setAttribute("data-active", "false");

    const mainContainer = todoContainer.parentNode;
    const mainContainerNumb = mainContainer.childElementCount;
    counter.innerText = `${mainContainerNumb}`;
  };

  /* ----------------------------- */
  /* Mark todo as completed        */
  /* ----------------------------- */
  todoComplete.addEventListener("click", () => {
    const visibility = todoComplete.getAttribute("data-visible");
    if (visibility === "true") {
      setAsCompleted();
    } else {
      setAsNonCompleted();
    }
  });

  /* ----------------------------- */
  /* Delete with cross icon        */
  /* ----------------------------- */
  deleteButton.addEventListener("click", () => {
    pressedDeleteButton();
  });

  /* ----------------------------- */
  /* Delete completed              */
  /* ----------------------------- */
  deleteCompletedButton.addEventListener("click", () => {
    pressedDeleteCompleted();
  });

  counter.innerText = `${numb}`;

  /* ----------------------------- */
  /* Show active filter            */
  /* ----------------------------- */
  showActive.addEventListener("click", () => {
    showActiveFilter();
  });

  /* ----------------------------- */
  /* Show completed filter         */
  /* ----------------------------- */
  showCompleted.addEventListener("click", () => {
    showCompletedFilter();
  });

  /* ----------------------------- */
  /* Show all filter               */
  /* ----------------------------- */
  showAll.addEventListener("click", () => {
    showAllFilter();
  });

  /* ----------------------------- */
  /* Drag-n-drop                   */
  /* ----------------------------- */
  const draggables = document.querySelectorAll(".draggable");
  const containers = document.querySelectorAll(".container");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });

    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  });

  containers.forEach((container) => {
    container.addEventListener("dragover", (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(container, e.clientY);
      const draggable = document.querySelector(".dragging");
      if (afterElement == null) {
        container.appendChild(draggable);
      } else {
        container.insertBefore(draggable, afterElement);
      }
    });
  });

  function getDragAfterElement(container, y) {
    const draggableElements = [
      ...container.querySelectorAll(".draggable:not(dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return {
            offset: offset,
            element: child,
          };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
});
