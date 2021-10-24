const SELECTOR = Object.freeze ({
  TEMPLATE: '#stickerTemplate',
  LIST_STICKERS: '#list',
  ITEM_STICKER: '.sticker',
  DELETE_STICKER: '.delete-sticker',
  EDIT_STICKER: '.edit-sticker',
  ADD_STICKER_BTN: '#addStickerBtn',
});

const EMPTY_STICKER = {description: ''};
let stickersList = [];

const stickerTemplate = $(SELECTOR.TEMPLATE).html();
const $stickerListEl = $(SELECTOR.LIST_STICKERS)
  .on('click', SELECTOR.DELETE_STICKER, onDeleteClick)
  .on('focusout', SELECTOR.EDIT_STICKER, onDescFocusout);

$(SELECTOR.ADD_STICKER_BTN).on('click', onAddNoteBtnClick);

init();

function onAddNoteBtnClick() {
  createSticker(EMPTY_STICKER);
}

function onDeleteClick(e) {
  const $element = $(this).parent();

  deleteSticker(getElementIndex($element));
}

function onDescFocusout(e) {
  const $element = $(this);

  updateSticker(getElementIndex($element), {
    description: $element.val(),
  });
}

function init() {
  getList();
}

function getList() {
  StickerAPI.getList()
  .then(setData)
  .then(renderList);
}

function setData(data) {
  return stickersList = data;
}

function getStickerElementById(id) {
  return $stickerListEl.find(`[data-sticker-id="${id}"]`);
}

function createSticker(sticker) {
  StickerAPI.create(sticker)
    .then((sticker) => {
      stickersList.push(sticker);
      renderSticker(sticker);
    })
}

function updateSticker(id, changes) {
  const sticker = stickersList.find((el) => el.id == id);

  Object.keys(changes).forEach((key) => (sticker[key] = changes[key]));
  StickerAPI.update(id, sticker);
}

function deleteSticker(id) {
  stickersList = stickersList.filter((el) => el.id != id);

  deleteStickerElement(id);
  StickerAPI.delete(id);
}

function deleteStickerElement(id) {
  const $element = getStickerElementById(id);

  $element && $element.remove();
}

function renderList(stickersList) {
  stickersList.forEach(renderSticker);
}

function renderSticker(sticker) {
  const $stickerElement = $(getStickerHtml(sticker));

  $stickerListEl.append($stickerElement);
}

function getStickerHtml(sticker) {
  return stickerTemplate
  .replace('{{sticker-id}}', sticker.id)
  .replace('{{description}}', sticker.description);
}

function getElementIndex($el) {
  const $note = getStickerElementByChild($el);
  return $note && $note.data('stickerId');
}

function getStickerElementByChild($child) {
  return $child.closest(SELECTOR.ITEM_STICKER);
}