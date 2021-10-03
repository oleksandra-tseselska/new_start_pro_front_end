const button = document.querySelector('#button-input');
const container = document.querySelector('#container');
const input = document.querySelector('#input-user-name');

const GIT_URL = 'https://api.github.com/users/{{login}}';
const PLACEHOLDER = '{{login}}';

const userInfoTemplate = document.querySelector('#toDoUserInfoTemplate').innerHTML;


button.addEventListener('click', onButtonClick);

function onButtonClick() {
  getUserInfo()
    .then((info) => renderInfoHtml(info))
    .then((html) => {
      container.innerHTML = html;
    })

  resetInput()
}

function getUserInfo() {
  if(isUndefined(getUserName())) {
    const userUrl = GIT_URL.replace(PLACEHOLDER, getUserName());
    const userPromise = fetch(userUrl);

    return userPromise
    .then((res) => res.json())
    .then((info) => info)
  }
}

function renderInfoHtml(info) {
  const avatar = info.avatar_url;
  const reposNum = info.public_repos;
  const followers = info.followers;
  const following = info.following;
  
  const  contactsList = userInfoTemplate
    .replace('{{img}}', `<img src="${avatar}"`)
    .replace('{{reposNum}}', `Количество репозиториев: ${reposNum}`)
    .replace('{{followers}}', `Количество фоловеров: ${followers}`)
    .replace('{{following}}', `Количество наблюдаемых: ${following}`);
  
  return contactsList;
}

function resetInput(){
  input.value = '';
}

function getUserName() {
  if(isEmpty(input.value)){  
    const userName = input.value;
  
    return userName;
  }
}

function isEmpty(value) {
  if(value === '') {
    alert('Add user name please')
  } else {

    return value;
  }
}

function isUndefined(value) {
  if(value !== 'undefined') {

    return value;
  }
}