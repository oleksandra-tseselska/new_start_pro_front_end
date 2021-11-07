const SELECTOR = Object.freeze({
  TEMPLATE_ALBUMS: '#galleryListTemplate',
  TEMPLATE_PHOTOS: '#photosListTemplate',
  GALLERY_LIST: '#gallery-list',
  ALBUM_PHOTO: '#album-photo',
});

const URL = Object.freeze({
  PHOTOS: 'https://jsonplaceholder.typicode.com/photos?albumId'
})

const CLASS = Object.freeze({
  ALBUM: 'album',
  ACTIVE: 'active',
  ALBUM_ID: 'data-id',
})

const templateAlbums = document.querySelector(SELECTOR.TEMPLATE_ALBUMS).innerHTML;
const templatePhotos = document.querySelector(SELECTOR.TEMPLATE_PHOTOS).innerHTML;
const galleryList = document.querySelector(SELECTOR.GALLERY_LIST);
const albumPhoto = document.querySelector(SELECTOR.ALBUM_PHOTO);
galleryList.addEventListener('click', onGalleryListClick);

init();

function init() {
  GalleryAPI
    .getAlbumsList()
    .then((gallery) => {
      addAlbumsList(gallery);

      const firstAlbum = getFirstAlbum();
      const id =  getAlbumId(firstAlbum);

      setAlbumActive(firstAlbum);

      if(id) {
        renderPhotoListByAlbumId(id);
      }
    })
    .catch((e) => alert(e.message))
}

function onGalleryListClick(e) {
  const album = getAlbum(e.target);
  const albumId = getAlbumId(album);
  const activeEl = findActiveItem();

  removeAlbumActive(activeEl)
  setAlbumActive(album);
  renderPhotoListByAlbumId(albumId);
}

function addAlbumsList(gallery) {
  const htmlAlbums = gallery.map(album => getHtmlAlbum(album)).join('');

  galleryList.innerHTML = htmlAlbums;
}

function getHtmlAlbum(album) {
  return templateAlbums
    .replace('{{title}}', album.title)
    .replace('{{album-id}}', album.id)
}

function renderPhotoListByAlbumId(albumId) {
  GalleryAPI
    .getPhotosList(albumId)
    .then(addPhotoList)
}

function removeAlbumActive(activeEl) {
  activeEl.classList.remove(CLASS.ACTIVE);
}

function setAlbumActive(album) {
  album.classList.add(CLASS.ACTIVE);
}

function addPhotoList(photos) {
  const htmlPhotos = photos.map(photo => getHtmlPhoto(photo)).join('');

  albumPhoto.innerHTML = htmlPhotos;
}

function getHtmlPhoto(photo) {
  return templatePhotos
    .replace('{{photo-url}}', photo.thumbnailUrl)
    .replace('{{photo-id}}', photo.id)
    .replace('{{photo-alt}}', photo.title)
}

function getFirstAlbum() {
  return galleryList.firstElementChild;
}

function getAlbum(target) {
  return target.closest('.' + CLASS.ALBUM);
}

function getAlbumId(album) {
  return album.getAttribute(CLASS.ALBUM_ID);
}

function findActiveItem() {
  return galleryList.querySelector('.' + CLASS.ACTIVE);
}