class GalleryAPI {
  static URL = 'https://jsonplaceholder.typicode.com/albums';
  static USER_ID = 1;
  static HEADERS = {
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
    return this.request(`?userId=${this.USER_ID}`, `GET`)
      .then((res) => {
        if(res.ok) {
          return res.json();
        }

      throw new Error('Can not fetch albums from API');
      })
      .then((data) => data);
  }
}