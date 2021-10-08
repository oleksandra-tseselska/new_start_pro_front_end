// Взять задачу из 13 урока (todo-list-on-steroids) и расширить ее:
// 1. Залогиниться вот тут https://gorest.co.in/ со своим github аккаунтом
// 2. Скопировать API Access Token в TodoApi (смотри ниже)
// 3. При загрузке страницы показать список todo
// 4. Добавить возможность удаления на сервере, при удалении элемента обновлять список todo на странице

// Если что-то забыли смотрим код с лекции.

// Задание со звездочкой (не обязательное):
// - При изменении статуса сообщения менять его на сервере и отображать это на странице
// - Сделать создание нового элемента на сервере и отображать это на странице



// Create POST    https://gorest.co.in/public/v1/todos
// Read   GET
// - get list     https://gorest.co.in/public/v1/todos
// - get one      https://gorest.co.in/public/v1/todos/1
// Update PUT     https://gorest.co.in/public/v1/todos/1
// Delete DELETE  https://gorest.co.in/public/v1/todos/1


// Файл TodoAPI.js
class TodoAPI {
  static TOKEN = '3e275c0d22591b010db7a846b6dd642f9fb9df75a252c9ab3e5497c3b16fab8a';
  static URL = 'https://gorest.co.in/public/v1/todos';
  static HEADERS = {
    'Accept': 'application/json',
    'Content-type': 'application/json; charset=UTF-8',
    'Authorization': `Bearer ${this.TOKEN}`,
  };

  static getList() {
    return fetch(this.URL)
      .then((res) => {
        if(res.ok) {
          return res.json();
        }

      throw new Error('Can not fetch todo list from API');
      })
      .then((data) => data.data);
  }

  static delete(id) {
    return fetch(`${this.URL}/${id}`, {
      method: 'DELETE',
      headers: this.HEADERS,
    })
    .then((res) => {
      if(!res.ok && res.status !== 204) {
        throw new Error('Can not execute delete todo request on API');
      }
    });
  }

  static create(todoData) {
    // Задача со звездочкой 1:50:43
    return '';
  }

  static update(todoData) {
    // Задача со звездочкой
  }
}