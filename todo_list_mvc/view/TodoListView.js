class TodoListView {
  static TODO_ITEM_SELECTOR = '.todo-item';
  static DELETE_BTN_SELECTOR = '.delete-btn';
  static COMPLETED = 'completed';

  #$listEl;
  #options;

  constructor(options) {
    this.#$listEl = this.init();
    this.#options = options;
  }

  init() {
    return $('<ul></ul>')
      .on('click', TodoListView.TODO_ITEM_SELECTOR, (e) => this.onTodoListClick(e))
      .on('click', TodoListView.DELETE_BTN_SELECTOR, (e) => this.onDeleteBtnClick(e))
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

  getTodoItemId(el) {
    return el.closest(TodoListView.TODO_ITEM_SELECTOR)?.dataset.id;
  }

  appendTo($el) {
    $el.append(this.#$listEl);
  }

  renderList(list) {
    const html = list.map(todo => this.generateTodoHtml(todo)).join('');

    this.#$listEl.html(html);
  }

  generateTodoHtml(todo) {
    const statusClass = todo.status === TodoListView.COMPLETED ? 'done' : '';

    return `
    <li class="todo-item ${statusClass}" data-id="${todo.id}">
      ${todo.title}
      <span class="delete-btn">[ Delete ]</span>
    </li>
    `
  }

  deleteElement(id) {
    this.#$listEl.find(`[data-id="${id}"]`).remove();
  }

  renderElement(todo) {
    const html = this.generateTodoHtml(todo);

    this.#$listEl.find(`[data-id="${todo.id}"]`).replaceWith(html);
  }
}