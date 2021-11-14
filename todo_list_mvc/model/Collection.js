class Collection {
  static COMPLETED = 'completed';
  static PENDING = 'pending';

  #list = [];

  fetch() {
    return TodoAPI
      .getList()
      .then((list) => {
        this.setList(list);

        return this.getList();
    });
  }

  create(data) {
    const item = {
      status: Collection.PENDING,
      ...data,
    };

    this.#list.push(item);

    const loading = TodoAPI.create(item).then((res) => {
      item.id = res.data.id;

      return item;
    });

    return Promise.resolve({item, loading});
  }

  update(id, data) {
    const item = this.get(id);

    Object.keys(data).forEach(key => item[key] = data[key]);

    const loading = TodoAPI.update(id, item);

    return Promise.resolve({item, loading});
  }

  toggle(id) {
    const item = this.get(id);

    if (item.status === Collection.COMPLETED) {
      item.status = Collection.PENDING;
    } else {
      item.status = Collection.COMPLETED
    }

    return this.update(id, item);
  }

  delete(id) {
    TodoAPI.delete(id);

    return Promise.resolve(this.getList());
  }

  // getItem(id) {
  //   return this.#list.find(item => item.id === +id);
  // }

  setList(list) {
    this.#list = list;
  }

  getList() {
    return this.#list;
  }

  get(id) {
    return this.#list.find(item => item.id === +id);
  }
}