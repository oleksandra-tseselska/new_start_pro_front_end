class TodoListView {
  static TODO_ITEM_SELECTOR = '.todo-item';
  static EDIT_BTN_SELECTOR = '.edit-btn'
  static DELETE_BTN_SELECTOR = '.delete-btn';
  static COMPLETED = 'completed';
  static CLASS_DONE = 'done';

  #$list = null;
  #options = {};

  constructor(options) {
    this.#$list = this.init();
    this.#options = options;
  }

  init() {
    return $('<ul></ul>')
      .on('click', TodoListView.TODO_ITEM_SELECTOR, (e) => this.onTodoListClick(e))
      .on('click', TodoListView.DELETE_BTN_SELECTOR, (e) => this.onDeleteBtnClick(e))
      .on('click', TodoListView.EDIT_BTN_SELECTOR, (e) => this.onEditBtnClick(e))
  }

  onTodoListClick(e) {
    const id = this.getTodoItemId(e.target);

    this.#options.onToggle(id);
  }

  onDeleteBtnClick(e) {
    e.stopPropagation();

    const id = this.getTodoItemId(e.target);

    this.#options.onDelete(id);
  }

  onEditBtnClick(e) {
    e.stopPropagation();

    const id = this.getTodoItemId(e.target);

    this.#options.onEdit(id);
  }

  getTodoItemId(el) {
    const id = el.closest(TodoListView.TODO_ITEM_SELECTOR)?.dataset.id;

    return id ? +id : NaN;
  }

  renderList(list) {
    const html = list.map(todo => this.generateTodoHtml(todo)).join('');

    this.#$list.html(html);
  }

  appendTo($el) {
    $el.append(this.#$list);
  }

  generateTodoHtml(todo) {
    const statusClass = todo.status === TodoListView.COMPLETED ? TodoListView.CLASS_DONE : '';

    return `
    <li class="todo-item ${statusClass}" data-id="${todo.id}">
      ${todo.title}
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </li>
    `;
  }

  addElement(todo) {
    const todoHtml = this.generateTodoHtml(todo);

    this.#$list.append(todoHtml);
  }

  removeElement(id) {
    this.#$list.find(`[data-id="${id}"]`).remove();
  }

  // renderElement(todo) {
  //   const html = this.generateTodoHtml(todo);

  //   this.#$listEl.find(`[data-id="${todo.id}"]`).replaceWith(html);
  // }

  updateElement(todo, isNew = false) {
    const id = isNew ? '' : todo.id;
    const todoHtml = this.generateTodoHtml(todo);

    this.#$list.find(`[data-id="${id}"]`).replaceWith(todoHtml);
  }
}