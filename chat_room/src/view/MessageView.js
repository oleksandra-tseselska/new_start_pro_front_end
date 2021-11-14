import $ from 'jquery';

class MessageView {
  #options;
  #$form;
  #$inputs;

  constructor(options) {
    this.#options = options;
    this.#$form= this.initView();
    this.#$inputs = this.#$form.find('input, textarea');
  }

  initView() {
    return $(`
    <form name="studentForm">
      <input name="username" type="text">
      <input name="message" type="text">
      <button>Send</button>
    </form>
  `).on('submit', this.onFormSubmit.bind(this));
  }

  onFormSubmit(e) {
    e.preventDefault();

    const message = this.getFormData();

    if (!this.isValidMessage(message)) {
      return alert('Name and text required')
    }

    this.#options.onSubmit(message);
  }

  getFormData() {
    const message = {};

    for (const input of this.#$inputs) {
      message[input.name] = input.value;
    }

    return message;
  }

  appendTo($el) {
    $el.append(this.#$form);
  }

  resetForm() {
    this.#$inputs.val('');
  }

  isValidMessage(message) {
    return !this.isEmpty(message.username) && !this.isEmpty(message.message);
  }

  isEmpty(text) {
    if(text === '') {
      return true;
    }
  }
}

export default MessageView;