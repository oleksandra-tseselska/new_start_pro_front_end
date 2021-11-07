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
  GalleryAPI.getAlbumsList()
    .then(addAlbumsList)
    .then((gallery) => {
      setFirstAlbum(gallery);

      const id =  getFirstAlbumId();

      if(id) {
        renderPhotoListByAlbumId(id);
      }
    })
    .catch((e) => alert(e.message))
}

function onGalleryListClick(e) {
  const albumId = getAlbumId(e.target);
  setAlbumActive(e.target);

  renderPhotoListByAlbumId(albumId);
}

function setFirstAlbum() {
  const firstAlbum = getFirstAlbum();

  firstAlbum.classList.add(CLASS.ACTIVE);
}

function renderPhotoListByAlbumId(albumId) {
  GalleryAPI.getPhotosList(albumId)
      .then(addPhotoList)
}
function addAlbumsList(gallery) {
  const htmlAlbums = gallery.map(album => getHtmlAlbum(album)).join('');

  galleryList.innerHTML = htmlAlbums;
}

function getFirstAlbumId() {
  const firstAlbum = getFirstAlbum();

  return firstAlbum.getAttribute(CLASS.ALBUM_ID);;
}

function getHtmlAlbum(album) {
  return templateAlbums
    .replace('{{title}}', album.title)
    .replace('{{album-id}}', album.id)
}

function setAlbumActive(target) {
  const album = getAlbum(target);
  const activeEl = findActiveItem();

  activeEl.classList.remove(CLASS.ACTIVE);
  album.classList.add(CLASS.ACTIVE);
}

function getAlbum(target) {
  return target.closest('.' + CLASS.ALBUM);
}

function findActiveItem() {
  return galleryList.querySelector('.' + CLASS.ACTIVE);
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

function getAlbumId(target) {
  const album = getAlbum(target);

  return album.getAttribute(CLASS.ALBUM_ID);
}