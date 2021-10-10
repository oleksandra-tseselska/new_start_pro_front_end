const SELECTOR = Object.freeze({
  PUBLIC_TABLE: '#publication-table',
  PUBLIC_LIST: '#publication-list',
  TEMPLATE: '#publicationsTableTemplate',
  INPUTS: '#publications-input',
});

const CLASS = Object.freeze({
  PUBLIC_ROW: 'publication-row',
  BTN_BIN: 'btn-bin',
  BTN_ADD: 'btn-add',
})

const PLACEHOLDER = Object.freeze({
  ID: '{{id}}',
  TITLE: '{{title}}',
  BODY: '{{body}}',
  DATA_ID: '{{dataId}}',
});

const HELPERS = Object.freeze({
  EMPTY_STRING: '',
  POINT: '.',
});

const tablePublic = document.querySelector(SELECTOR.PUBLIC_TABLE);
const template = document.querySelector(SELECTOR.TEMPLATE).innerHTML;
const tableBody = document.querySelector(SELECTOR.PUBLIC_LIST);
const btnAdd = document.querySelector(SELECTOR.BTN_ADD);
const inputs = document.querySelectorAll(SELECTOR.INPUTS);

tablePublic.addEventListener('click', onPublicTableClick);

init();

function init() {

  PublicAPI.getList()
    .then(addPublicList)
}

function onPublicTableClick(e) {
  const classList = e.target.classList;
  const publicRow = getPublicElement(e.target);

  const public = getPublics()
  console.log(public)

  if(classList.contains(CLASS.BTN_BIN)) {
    return removePublic(publicRow);
  };
  if(classList.contains(CLASS.BTN_ADD)) {
    console.log(public)
    addPublic(public)
  }
}

function getPublics() {
const publics = {};

  for(let input of inputs) {
    publics[input.name] = input.value;
  };

  return publics;
}

function addPublicList(publicList) {
  const html = publicList.map(public => getHtml(public)).join(HELPERS.EMPTY_STRING);

  tableBody.innerHTML = html;
}

function getHtml(public) {
  return template
    .replace(PLACEHOLDER.ID, public.id)
    .replace(PLACEHOLDER.TITLE, public.title)
    .replace(PLACEHOLDER.BODY, public.body)
    .replace(PLACEHOLDER.DATA_ID, public.id)
}

function removePublic(el) {

  return PublicAPI.delete(+el.dataset.id)
    .then(() => PublicAPI.getList())
    .then(addPublicList)
}

function addPublic(public) {

  PublicAPI.create(public)
    .then(() => PublicAPI.getList())
    .then(addPublicList)
}

function getPublicElement(target) {
  return target.closest(HELPERS.POINT + CLASS.PUBLIC_ROW);
}