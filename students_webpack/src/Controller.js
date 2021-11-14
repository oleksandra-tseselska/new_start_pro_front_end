import Collection from "./Collection";
import ListView from "./view/ListView";
import FormView from "./view/FormView";

class Controller {
  #rootEl;

  constructor($rootEl) {
    this.#rootEl = $rootEl;

    this.studentsC = new Collection();
    this.listView = new ListView({
      onDelete: id => this.deleteStudent(id),
      onMarksEdit: (id, marks) => this.studentsC.update(id, { marks }),
    });
    this.formView = new FormView({
      onSubmit: student => this.createStudent(student),
    });

    this.listView.appendTo(this.#rootEl);
    this.formView.appendTo(this.#rootEl);

    this.studentsC.fetch().then(list => this.listView.renderList(list));
  }

  createStudent(student) {
    if(student.id) {
      this.studentsC.update(student.id, student)
        .then((res) => {
            this.listView.updateElement(student);
            this.formView.resetForm();
        });
    } else {
      this.studentsC.create(student)
        .then((res) => {
            this.listView.addElement(res.item);
            this.formView.resetForm();
            res.loading.then(() => this.listView.updateElement(res.item, true));
        });
    }
  }

  deleteStudent(id) {
    this.studentsC.delete(id).then(() => this.listView.removeElement(id));
  }
}

export default Controller;