import StudentsApi from "./StudentsApi";

class Collection {
  #list = [];

  fetch() {
    return StudentsApi
      .getList()
      .then((list) => {
        this.setList(list);

        return this.getList();
    });
  }

  create(data) {
    const item = {
      marks: this.getDefaultMarks(),
      ...data,
    };

    this.#list.push(item);

    const loading = StudentsApi.create(item).then((res) => {
      item.id = res.id;

      return item;
    });

    return Promise.resolve({item, loading});
  }

  update(id, data) {
    const item = this.get(id);

    Object.keys(data).forEach(key => item[key] = data[key]);

    const loading = StudentsApi.update(id, item);

    return Promise.resolve({item, loading});
  }

  delete(id) {
    StudentsApi.delete(id);

    return Promise.resolve(this.getList());
  }

  setList(list) {
    this.#list = list;
  }

  getList() {
    return this.#list;
  }

  get(id) {
    return this.#list.find(item => +item.id === +id);
  }

  getDefaultMarks() {
    return (new Array(10)).fill(0);
  }
}

export default Collection;