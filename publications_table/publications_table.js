const SELECTOR = Object.freeze({
  PUBLIC_TABLE: '#publication-table',
  PUBLIC_LIST: '#publication-list',
  TEMPLATE: '#publicationsTableTemplate',
  INPUTS: '#publications-input',
  LOADING: '#loading',
  ERROR: '#error',
});

const CLASS = Object.freeze({
  PUBLIC_ROW: 'publication-row',
  BTN_BIN: 'btn-bin',
  BTN_ADD: 'btn-add',
  BTN_RESET: 'btn-reset',
  HIDE: 'hide',
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
const inputs = document.querySelectorAll(SELECTOR.INPUTS);
const loading = document.querySelector(SELECTOR.LOADING);
const error = document.querySelector(SELECTOR.ERROR);

tablePublic.addEventListener('click', onPublicTableClick);

init();

function init() {
  toggleLoading();

  PublicAPI.getList()
    .then(addPublicList)
    .catch(handleError)
    .finally(toggleLoading);
}

function onPublicTableClick(e) {
  const classList = e.target.classList;
  const publicRow = getPublicElement(e.target);

  const public = getPublics()

  if(classList.contains(CLASS.BTN_BIN)) {
    return removePublic(publicRow);
  };
  if(classList.contains(CLASS.BTN_ADD)) {
    if(!isEmpty(public)) {
      addPublic(public);
      resetInputs();
    }
  };
  if(classList.contains(CLASS.BTN_RESET)) {
    resetInputs();
  }
}

function removePublic(el) {
  el.remove();

  PublicAPI
    .delete(+el.dataset.id)
    .catch((e) => {
      handleError(e);
      init();
    });
}

function addPublic(public) {
  toggleLoading();

  PublicAPI.create(public)
    .then(() => PublicAPI.getList())
    .then(addPublicList)
    .catch(handleError)
    .finally(toggleLoading);
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

function getPublics() {
  const publics = {};
  
    for(let input of inputs) {
      publics[input.name] = input.value;
    };
  
    return publics;
  }

function getPublicElement(target) {
  return target.closest(HELPERS.POINT + CLASS.PUBLIC_ROW);
}

function resetInputs() {
  for(let input of inputs) {
    input.value = '';
  };
};

function isEmpty(public) {
  if (public.title === '' || public.body === '') {
    alert('Fill in all fields, please');

    return true;
  }

  return;
}

function handleError(e) {
  error.textContent = e.message;

  setTimeout(() => error.textContent = HELPERS.EMPTY_STRING, 5000);
}

function toggleLoading() {
  loading.classList.toggle(CLASS.HIDE);
}
