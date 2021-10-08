const ID_TODO = Object.freeze({
  LIST: '#todo-list',
  TEMPLATE: '#toDoListTemplate',
  BTN_ADD: '#button-add',
  INPUT: '#input',
});

const CLASS = Object.freeze({
  BTN_DONE: 'btn-done',
  BTN_BIN:'btn-bin',
  TO_DO_ITEM: 'todo-item',
  DONE: 'done',
});

const PLACEHOLDER = Object.freeze({
  TEXT: '{{text}}',
  TODO_ID: '{{todo-id}}',
});

const ul = document.querySelector(ID_TODO.LIST);
const template = document.querySelector(ID_TODO.TEMPLATE).innerHTML;
const btnAdd = document.querySelector(ID_TODO.BTN_ADD);
const input = document.querySelector(ID_TODO.INPUT);

function init() {
  TodoAPI.getList()
    .then((todoList) => addTodoList(todoList))
    .catch((e) => alert(e.message))
}

init();

btnAdd.addEventListener('click', onButtonClick);
ul.addEventListener('click', onTodoItemClick);

function onButtonClick() {
  if (isEmpty(input.value)) {
    alert('Add text, please');
    return;
  }; 
  addItem(input);
  resetInput();
};

function onTodoItemClick(e) {
  const classList = e.target.classList;
  const todoEl = getTodoElement(e.target);
  
  if (classList.contains(CLASS.BTN_DONE)){
    return toggleDone(todoEl);
  };
  if (classList.contains(CLASS.BTN_BIN)){
    // return removeTodo(todoEl);
    removeTodo(todoEl).then(() => {
      TodoAPI.getList()
        .then((todoList) => addTodoList(todoList))
        .catch((e) => alert(e.message));
    })

    return;
  };
}

function addTodoList(todoList) {
  const html = todoList.map(todo => getHtml(todo)).join('');

  ul.innerHTML = html;
}

function getHtml(todo) {
  return template
    .replace(PLACEHOLDER.TEXT, todo.title)
    .replace(PLACEHOLDER.TODO_ID, todo.id)
}

function addItem(input) {
  const addTextList = template.replace(PLACEHOLDER.TEXT, input.value);
  ul.insertAdjacentHTML('beforeend', addTextList);
}

function getTodoElement(target) {
  return target.closest('.' + CLASS.TO_DO_ITEM);
}

function toggleDone(el) {
  el.classList.toggle(CLASS.DONE);
}

function removeTodo(el) {
  // el.remove();
  return TodoAPI.delete(+el.dataset.id)
}

function resetInput() {
  input.value = '';
}

function isEmpty(value) {
  return value === '';
}