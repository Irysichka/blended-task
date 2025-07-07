/*
  Створи список справ.
  На сторінці є два інпути які має вводиться назва і текст задачі.
  Після натискання на кнопку "Add" завдання додається до списку #task-list.

  У кожної картки має бути кнопка "Delete", щоб можна було
  прибрати завдання зі списку.
  Список із завданнями має бути доступним після перезавантаження сторінки.

  Розмітка картки задачі
  <li class="task-list-item">
      <button class="task-list-item-btn">Delete</button>
      <h3>Заголовок</h3>
      <p>Текст</p>
  </li>
*/

// Ключи
const STORAGE_KEY_TASKS = 'todo_tasks_v2';
const STORAGE_KEY_THEME = 'todo_theme_v2';

// DOM елементи
const form = document.querySelector(".header-form");
const inputName = document.querySelector('input[name="taskName"]');
const taskList = document.querySelector("#task-list");
const inputDesc = document.querySelector('input[name="taskDescription"]');
const changeTheme = document.querySelector("#themeToggle");
const body = document.body;

// Завантаження задач

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_TASKS)) || []
  }
  catch (_) {
   return []
  }
}


// Збереження задач
function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY_TASKS,JSON.stringify(tasks) )
}

// form.addEventListener("input", handleInput);

const newName = inputName.value.trim();
const newTask = inputDesc.value.trim();


form.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
    e.preventDefault();
    form.reset()
}

function createTaskMarkup({id, title, text }) {
  return 
  `<li class="task-list-item" data-id="${id}">
      <button class="task-list-item-btn">Delete</button>
      <h3>${title}</h3>
      <p>${text}</p>
    </li>`;
}


changeTheme.addEventListener("click", handleClick);

function handleClick() {
    if (body.classList.contains("theme-dark")) { 
        body.classList.remove("theme-dark");
        body.classList.add("theme-light");
        localStorage.setItem("theme", "theme-light");
    } else {
        body.classList.remove("theme-light");
        body.classList.add("theme-dark");
        localStorage.setItem("theme", "theme-dark");
    }
   
}



