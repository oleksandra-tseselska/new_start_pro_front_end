class TodoAPI {
  static TOKEN = '3e275c0d22591b010db7a846b6dd642f9fb9df75a252c9ab3e5497c3b16fab8a';
  static URL = 'https://gorest.co.in/public/v1/todos';
  static USER_ID = 248;
  static HEADERS = {
    'Accept': 'application/json',
    'Content-type': 'application/json; charset=UTF-8',
    'Authorization': `Bearer ${this.TOKEN}`,
  };

  static getList() {
    return fetch(`${this.URL}?user_id=${this.USER_ID}`)
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

  static create(todo) {
    return fetch(`${this.URL}`, {
      method: 'POST',
      headers: this.HEADERS,
      body: JSON.stringify({
        ...todo,
        user_id: this.USER_ID,
      }),
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }

      return res.json().then((data) => {
        throw new Error('Can not execute create todo request on API \n' + JSON.stringify(data.data, null, 4));
      })
    });
  }

  static update(id, data) {
    return fetch(`${this.URL}/${id}`, {
      method: 'PUT',
      headers: this.HEADERS,
      body: JSON.stringify(data)
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }

    throw new Error('Can not execute update todo request on API');
    })
  }
}