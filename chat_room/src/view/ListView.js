import $ from 'jquery';

class ListView {
  static MESSAGE_LIST_SELECTOR = '#message-list';

  constructor(options) {
    this.options = options;
    this.$rootEl = this.initView();
    this.$list = this.$rootEl.find(ListView.MESSAGE_LIST_SELECTOR);
  }

  initView() {
    return $(`
      <table>
        <tr>
          <th>Name</th>
          <th>Message</th>
        </tr>
        <tbody id="message-list"></tbody>
      </table>
    `)
  }

  appendTo($container) {
    $container.append(this.$rootEl);
  }

  addElement(message) {
    const messageHtml = this.generateStudentHTML(message);

    this.$list.append(messageHtml);
  }

  generateStudentHTML(message) {
    return `
    <tr>
      <td>${message.username}:</td>
      <td>${message.message}</td>
    </tr>
    `;
  }
}

export default ListView;