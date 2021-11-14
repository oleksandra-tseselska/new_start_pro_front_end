class FormView {
  #options;
  #$form;
  #$inputs;

  constructor(options) {
    this.#options = options;
    this.#$form = this.initView();
    this.#$inputs = this.#$form.find('input, textarea');
  }

  initView() {
    return $(`
      <form name="studentForm">
        <input name="id" type="hidden">
        <input name="name" type="text">
        <button>Save</button>
      </form>
    `).on('submit', this.onFormSubmit.bind(this));
  }

  appendTo($el) {
    $el.append(this.#$form);
  }

  onFormSubmit(e) {
    e.preventDefault();

    const student = this.getFormData();

    this.#options.onSubmit(student);
  }

  getFormData() {
    const student = {};

    for (const input of this.#$inputs) {
      student[input.name] = input.value;
    }

    return student;
  }

  resetForm() {
    this.#$inputs.val('');
  }
} 