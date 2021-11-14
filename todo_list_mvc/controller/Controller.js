class Controller {
  #container = null;

  constructor($container) {
    this.#container = $container;

    this.todoCollection = new Collection();
    this.todoFormView = new TodoFormView({
      onSubmit: (todo) => this.saveTodo(todo),
    })
    this.listView = new TodoListView({
      onToggle: id => this.todoCollection.toggle(id).then(() => this.renderElement(id)),
      onDelete: id => this.todoCollection.delete(id).then(() => this.deleteElement(id)),
      onEdit: (id) => {
        this.todoFormView.setFormData(this.todoCollection.get(id));
      },
    }); 
    
    this.listView.appendTo(this.#container);
    this.todoFormView.appendTo(this.#container);
    this.todoCollection.fetch().then(() => this.renderList());
  }

  saveTodo(todo) {
    if (todo.id) {
      this.todoCollection.update(todo.id, todo)
        .then((res) => {
          this.listView.updateElement(todo);
          this.todoFormView.resetForm();
        })
    } else {
      this.todoCollection.create(todo).then((res) => {
        this.listView.addElement(res.item);
        this.todoFormView.resetForm();
        res.loading.then(() => this.listView.updateElement(res.item, true));
      });
    }
  }

  renderList() {
    this.listView.renderList(this.todoCollection.getList());
  }

  renderElement(id) {
    this.listView.updateElement(this.todoCollection.get(id));
  }

  deleteElement(id) {
    this.listView.removeElement(id);
  }
}