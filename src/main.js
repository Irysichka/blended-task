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

let tasks = loadTasks();
applySavedTheme();
renderTasks();

// Завантаження задач
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    taskList.insertAdjacentHTML("beforeend", createTaskMarkup(task))
  });
}
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




form.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
  e.preventDefault();
 const title = inputName.value.trim();
const text = inputDesc.value.trim();

  if (!title || !text) {
    return;
  }

  const newTask = {
    id: Date.now().toString(),
    title,
    text
  };

  tasks.push(newTask);
  saveTasks(tasks);


taskList.insertAdjacentHTML("beforeend", createTaskMarkup(newTask))
    form.reset()
}

function createTaskMarkup({id, title, text }) {
  return `<li class="task-list-item" data-id="${id}">
      <button class="task-list-item-btn">Delete</button>
      <h3>${title}</h3>
      <p>${text}</p>
    </li>`;
}


taskList.addEventListener("click", handleDelete);


function handleDelete(e) {
  if (!e.target.classList.contains("task-list-item-btn")) return;
  const taskItem = e.target.closest(".task-list-item")
  const taskId = taskItem.dataset.id;

  tasks = tasks.filter(task => task.id !== taskId);
  saveTasks(tasks);
  taskItem.remove();
}

changeTheme.addEventListener("click", handleClick);

function handleClick() {
    if (body.classList.contains("theme-dark")) { 
        body.classList.remove("theme-dark");
        body.classList.add("theme-light");
        localStorage.setItem(STORAGE_KEY_THEME, "theme-light");
    } else {
        body.classList.remove("theme-light");
        body.classList.add("theme-dark");
        localStorage.setItem(STORAGE_KEY_THEME, "theme-dark");
    }
   
}

function applySavedTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
  if (savedTheme) {
    body.classList.add(savedTheme);
  } else {
    body.classList.add("theme-light")
  }
}



