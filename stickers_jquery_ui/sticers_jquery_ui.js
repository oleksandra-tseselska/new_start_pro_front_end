const SELECTOR = Object.freeze ({
  TEMPLATE: '#stickerTemplate',
  LIST_STICKERS: '#list',
  ITEM_STICKER: '.sticker',
  DELETE_STICKER: '.delete-sticker',
  EDIT_TEXTAREA: '.textarea-sticker',
  ADD_STICKER_BTN: '#addStickerBtn',
  MODAL : "#stickerModal",
  EDIT: ".edit-sticker",
});

const EMPTY_STICKER = {description: ''};
let stickersList = [];

const stickerTemplate = $(SELECTOR.TEMPLATE).html();
const $stickerListEl = $(SELECTOR.LIST_STICKERS)
  .on('click', SELECTOR.DELETE_STICKER, onDeleteClick)
  .on('focusout', SELECTOR.EDIT_TEXTAREA, onDescFocusout)
  .on('click', SELECTOR.EDIT, onEditBtnClick);

$(SELECTOR.ADD_STICKER_BTN).on('click', onAddStickerBtnClick);

const $form = $(`${SELECTOR.MODAL} form`)[0];
const $modal = $(SELECTOR.MODAL).dialog({
  autoOpen: false,
  height: 200,
  width: 350,
  modal: true,
  buttons: {
    Save: () => {
      const sticker = getModalSticker()

      if(sticker.id) {
        updateSticker(sticker.id, sticker);
      } else {
        createSticker(sticker);
      }

      // renderList();
      closeModal();
    },
    Cancel: closeModal,
  },
  close: closeModal,
});

init();

function onAddStickerBtnClick() {
  openModal(EMPTY_STICKER);
}

function onDeleteClick(e) {
  const $element = $(this).parent();

  deleteSticker(getElementIndex($element));
}

function onEditBtnClick(e) {
  const $input = $(this);
  const id = getElementIndex($input);
  const sticker = stickersList.find((item) => +item.id === id)

  openModal(sticker);
}
function onDescFocusout(e) {
  const $input = $(this);

  updateSticker(getElementIndex($input), {
    description: $input.val(),
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
  return (stickersList = data);
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
  const $sticker = getStickerElementByChild($el);
  return $sticker && $sticker.data('stickerId');
}

function getStickerElementByChild($child) {
  return $child.closest(SELECTOR.ITEM_STICKER);
}

function openModal(sticker) {
  setModalSticker(sticker);
  $modal.dialog("open");
}

function closeModal() {
  $modal.dialog("close");
  $form.reset();
}

function setModalSticker(sticker) {
  $form.id.value = sticker.id;
  $form.description.value = sticker.description;
}

function getModalSticker() {
  return {
    // ...EMPTY_STICKER,
    id: $form.id.value,
    description: $form.description.value,
  }
}