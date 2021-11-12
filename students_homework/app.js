class StudentsAPI {
  static URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/students';
  static HEADERS = {
    'Accept': 'application/json',
    'Content-type': 'application/json; charset=UTF-8',
  };

  static request(uri, method, data) {
    return fetch(`${this.URL}${uri}`, {
      method,
      headers: this.HEADERS,
      body: data ? JSON.stringify(data) : undefined,
    });
  }  

  static getList() {
    return this.request(``, `GET`)
      .then((res) => {
        if(res.ok) {
          return res.json();
        }

      throw new Error('Can not fetch students from API');
      })
      .then((data) => data);
  }

  static delete(id) {
    return this.request(`/${id}`, `DELETE`)
    .then((res) => {
      if(!res.ok && res.status !== 204) {
        throw new Error('Can not execute delete student request on API');
      }
    });
  }

  static create(student) {
    return this.request(``, `POST`, { ...student})
      .then((res) => {
        if(res.ok) {
          return res.json();
        }

      return res.json().then((data) => {
        throw new Error('Can not execute create student request on API \n' + JSON.stringify(data.data, null, 4));
      })
    });
  }

  // static update(id, data) {
  //   return this.request(``, `PUT`, { ...student, user_id: this.USER_ID })
  //   .then((res) => {
  //     if(res.ok) {
  //       return res.json();
  //     }

  //   throw new Error('Can not execute update student request on API');
  //   })
  // }
} 