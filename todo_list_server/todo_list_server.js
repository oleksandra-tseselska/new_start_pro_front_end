const SELECTOR = Object.freeze({
  TODO_LIST: '#todo-list',
  TEMPLATE: '#toDoListTemplate',
  BTN_ADD: '#button-add',
  LOADING: '#loading',
  ERROR: '#error',
});

const CLASS = Object.freeze({
  BTN_DONE: 'btn-done',
  BTN_BIN:'btn-bin',
  TO_DO_ITEM: 'todo-item',
  DONE: 'done',
  HIDE: 'hide',
});

const PLACEHOLDER = Object.freeze({
  TEXT: '{{text}}',
  TODO_ID: '{{todo-id}}',
  CLASS_DONE: '{{class-done}}',
  STATUS: '{{status}}',
});

const STATUS = Object.freeze({
  COMPLETED: 'completed',
  PENDING: 'pending',
})

const HELPERS = Object.freeze({
  EMPTY_STRING: '',
  POINT: '.',
})

const ul = document.querySelector(SELECTOR.TODO_LIST);
const template = document.querySelector(SELECTOR.TEMPLATE).innerHTML;
const btnAdd = document.querySelector(SELECTOR.BTN_ADD);
const loading = document.querySelector(SELECTOR.LOADING);
const error = document.querySelector(SELECTOR.ERROR);

btnAdd.addEventListener('click', onButtonClick);
ul.addEventListener('click', onTodoItemClick);

init();

function init() {
  toggleLoading();

  TodoAPI.getList()
    .then(addTodoList)
    .catch(handleError)
    .finally(toggleLoading);
}

function onButtonClick() {
  const todo = getTodo();

  if (isEmpty(input.value)) {
    alert('Add text, please');
    return;
  }; 

  if (isValidTodo(todo)) {
    addTodo(todo);
  } else {
    alert('The text must be more than 3 characters');
  }

  resetInput();
};

function onTodoItemClick(e) {
  const classList = e.target.classList;
  const todoEl = getTodoElement(e.target);
  
  if (classList.contains(CLASS.BTN_DONE)){
    return toggleDone(todoEl);
  };
  if (classList.contains(CLASS.BTN_BIN)){
    return removeTodo(todoEl);
  };
}

function addTodoList(todoList) {
  const html = todoList.map(todo => getHtml(todo)).join(HELPERS.EMPTY_STRING);

  ul.innerHTML = html;
}

function getHtml(todo) {
  return template
    .replace(PLACEHOLDER.CLASS_DONE, addClassDone(todo))
    .replace(PLACEHOLDER.TEXT, todo.title)
    .replace(PLACEHOLDER.TODO_ID, todo.id)
    .replace(PLACEHOLDER.STATUS, todo.status)
}

function getTodo() {
  return {
    title: input.value,
    status: STATUS.PENDING,
  }
}

function addTodo(todo) {
  toggleLoading();

  TodoAPI.create(todo)
    .then(() => TodoAPI.getList())
    .then(addTodoList)
    .catch(handleError)
    .finally(toggleLoading);
}

function toggleDone(todoEl) {
  toggleLoading();

  const status = checkStatus(todoEl);
  
  return TodoAPI.update(+todoEl.dataset.id, { status })
    .then(() => TodoAPI.getList())
    .then(addTodoList)
    .catch(handleError)
    .finally(toggleLoading); 
}

function removeTodo(el) {
  toggleLoading();
  
  return TodoAPI.delete(+el.dataset.id)
    .then(() => TodoAPI.getList())
    .then(addTodoList)
    .catch(handleError)
    .finally(toggleLoading); 
}

function getTodoElement(target) {
  return target.closest(HELPERS.POINT + CLASS.TO_DO_ITEM);
}

function checkStatus(todoEl) {
  if(todoEl.dataset.status === STATUS.COMPLETED) {
    return STATUS.PENDING;
  }
  if(todoEl.dataset.status !== STATUS.COMPLETED) {
    return STATUS.COMPLETED;
  }
}

function addClassDone(todo) {
  if(todo.status === STATUS.COMPLETED) {
    return CLASS.DONE;
  }
  if(todo.status !== STATUS.COMPLETED) {
    return HELPERS.EMPTY_STRING;
  }
}

function isEmpty(value) {
  return value === HELPERS.EMPTY_STRING;
}

function isValidTodo(todo) {
  return todo && todo.title && todo.title.length >= 3;
}

function resetInput() {
  input.value = HELPERS.EMPTY_STRING;
}

function handleError(e) {
  error.textContent = e.message;

  setTimeout(() => error.textContent = HELPERS.EMPTY_STRING, 5000);
}

function toggleLoading() {
  loading.classList.toggle(CLASS.HIDE);
}