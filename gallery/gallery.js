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

init();

function init() {
  GalleryAPI.getAlbumsList()
    .then(addAlbumsList)
    .catch((e) => alert(e.message))
}

function addAlbumsList(gallery) {
  const htmlAlbums = gallery.map(album => getHtmlAlbum(album)).join('');

  galleryList.innerHTML = htmlAlbums;

  const firstAlbum = getFirstAlbum();

  firstAlbum.classList.add(CLASS.ACTIVE);
  addAlbumPhotos(firstAlbum);
}

function getHtmlAlbum(album) {
  return templateAlbums
    .replace('{{title}}', album.title)
    .replace('{{album-id}}', album.id)
}

galleryList.addEventListener('click', onGalleryListClick);

function onGalleryListClick(e) {
  addActiveAlbum(e);
}

function addActiveAlbum(e) {
  const album = getAlbum(e.target);
  const activeEl = findActiveItem();

  activeEl.classList.remove(CLASS.ACTIVE);
  album.classList.add(CLASS.ACTIVE);
  addAlbumPhotos(album);
}

function getAlbum(target) {
  return target.closest('.' + CLASS.ALBUM);
}

function findActiveItem() {
  return galleryList.querySelector('.' + CLASS.ACTIVE);
}

function addAlbumPhotos(album) {
  const albumId = album.getAttribute(CLASS.ALBUM_ID);

  fetch(`${URL.PHOTOS}=${albumId}`)
  .then((response) => response.json())
  .then((photos) => photos)
  .then(addAlbumList)
}

function addAlbumList(photos) {
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