class Controller {
  #$container;

  constructor($container) {
    this.#$container = $container;

    this.todoCollection = new Collection();
    this.todoListView = new TodoListView({
      onToggle: id => this.todoCollection.toggle(id).then(() => this.renderElement(id)),
      onDelete: id => this.todoCollection.delete(id).then(() => this.deleteElement(id)),
    }); 
    
    this.todoListView.appendTo(this.#$container);
    this.todoCollection
      .fetch()
      .then(list => this.renderList());
  }

  renderList() {
    this.todoListView.renderList(this.todoCollection.getList());
  }

  renderElement(id) {
    this.todoListView.renderElement(this.todoCollection.getItem(id));
  }

  deleteElement(id) {
    this.todoListView.deleteElement(id);
  }
}