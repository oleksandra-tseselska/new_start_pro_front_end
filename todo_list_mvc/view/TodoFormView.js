class TodoFormView {
  #options;
  #$form;
  #$inputs;

  constructor(options) {
    this.#options = options;
    this.#$form = this.init();
    this.#$inputs = this.#$form.find('input, textarea');
  }

  init() {
    return $(`
      <form name="todoForm">
        <input type="hidden" name="id">
        <textarea name="title"></textarea>
        <button>Save</button>
      </form>
    `).on('submit', this.onFormSubmit.bind(this));
  }

  onFormSubmit(e) {
    e.preventDefault();

    const todo = this.getFormData();

    this.#options.onSubmit(todo);
  }

  appendTo($el) {
    $el.append(this.#$form);
  }

  setFormData(todo) {
    for (const input of this.#$inputs) {
      if(input.name in todo) {
        input.value = todo[input.name]
      }
    }
  }

  getFormData() {
    const todo = {};

    for (const input of this.#$inputs) {
      todo[input.name] = input.value;
    }

    return todo;
  }

  resetForm() {
    this.#$inputs.val('');
  }
}