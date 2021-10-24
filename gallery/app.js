class GalleryAPI {
  static URL_ALBUMS = 'https://jsonplaceholder.typicode.com/albums';
  static URL_PHOTOS = 'https://jsonplaceholder.typicode.com/photos';
  static USER_ID = 1;
  static HEADERS = {
    'Content-type': 'application/json; charset=UTF-8',
  };

  static requestAlbums(uri, method, data) {
    return fetch(`${this.URL_ALBUMS}${uri}`, {
      method,
      headers: this.HEADERS,
      body: data ? JSON.stringify(data) : undefined,
    });
  }  

  static getAlbumsList() {
    return this.requestAlbums(`?userId=${this.USER_ID}`, `GET`)
      .then((res) => {
        if(res.ok) {
          return res.json();
        }

      throw new Error('Can not fetch albums from API');
      })
      .then((data) => data);
  }

  static requestPhotos(uri, method, data) {
    return fetch(`${this.URL_PHOTOS}${uri}`, {
      method,
      headers: this.HEADERS,
      body: data ? JSON.stringify(data) : undefined,
    });
  }  

  static getPhotosList() {
    return this.requestPhotos(`?albumId=${this.USER_ID}`, `GET`)
      .then((res) => {
        if(res.ok) {
          return res.json();
        }

      throw new Error('Can not fetch albums from API');
      })
      .then((data) => data);
  }
}