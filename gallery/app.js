class GalleryAPI {
  static URL = 'https://jsonplaceholder.typicode.com';;
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

  static getAlbumsList() {
    return this.request(`/albums`, `GET`)
      .then((res) => {
        if(res.ok) {
          return res.json();
        }

      throw new Error('Can not fetch albums from API');
      })
      .then((data) => data);
  }

  static getPhotosList(albumId) {
    return this.request(`/photos?albumId=${albumId}`, `GET`)
      .then((res) => {
        if(res.ok) {
          return res.json();
        }

      throw new Error('Can not fetch albums from API');
      })
      .then((data) => data);
  }
}