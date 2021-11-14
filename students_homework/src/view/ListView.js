class ListView {
  static DELETE_BTN_SELECTOR = '.delete-btn';
  static STUDENT_LIST_SELECTOR = '#student-list';
  static STUDENT_ITEM_SELECTOR = '.student-item';
  static MARK_ITEM_SELECTOR = '.mark-input';

  constructor(options) {
    this.options = options;
    this.$rootEl = this.initView();
    this.$list = this.$rootEl.find(ListView.STUDENT_LIST_SELECTOR);
  }

  initView() {
    return $(`
      <table>
        <tr>
          <th>Name</th>
          <th colspan="10">Marks</th>
          <th>Action</th>
        </tr>
        <tbody id="student-list"></tbody>
      </table>
    `)
    .on('focusout', ListView.MARK_ITEM_SELECTOR, this.onMarkInputFocusOut.bind(this))
    .on('click', ListView.DELETE_BTN_SELECTOR, this.onDeleteBtnClick.bind(this))
  }

  appendTo($container) {
    $container.append(this.$rootEl);
  }

  onMarkInputFocusOut(e) {
    e.stopPropagation();

    const id = this.getElementId(e.target);
    const marks = this.getAllMarksById(id);

    this.options.onMarksEdit(id, marks);
  }

  onDeleteBtnClick(e) {
    e.stopPropagation();

    const id = this.getElementId(e.target);

    this.options.onDelete(id);
  }

  getElementId(el) {
    const id = el.closest(ListView.STUDENT_ITEM_SELECTOR)?.dataset.id;

    return id ? +id : NaN;
  }

  renderList(list) {
    const html = list.map(student => this.generateStudentHTML(student)).join('');

    this.$list.html(html);
  }

  generateStudentHTML(student) {
    return `
    <tr data-id="${student.id}" class="student-item">
      <td>${student.name}</td>
      ${student.marks.map(mark =>`
        <td>
          <input class="mark-input" type="text" value="${mark}">
        </td>
      `).join('')}
      <td><button class="delete-btn">Delete</button></td>
    </tr>
    `;
  }

  addElement(student) {
    const studentHtml = this.generateStudentHTML(student);

    this.$list.append(studentHtml);
  }

  removeElement(id) {
    this.getElById(id).remove();
  }

  updateElement(student, isNew = false) {
    const id = isNew ? '' : student.id;
    const studentHtml = this.generateStudentHTML(student);

    this.getElById(id).replaceWith(studentHtml);
  }

  getAllMarksById(id) {
    return Array
      .from(this.getElById(id).find(ListView.MARK_ITEM_SELECTOR))
      .map(el => +el.value);
  }

  getElById(id) {
    return this.$list.find(`[data-id="${id}"]`);
  }
}