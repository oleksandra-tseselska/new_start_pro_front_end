const ID_BTN_INPUT = '#button-input';
const ID_CONTAINER = '#container';
const ID_INPUT_USER = '#input-user-name';

const button = document.querySelector(ID_BTN_INPUT);
const container = document.querySelector(ID_CONTAINER);
const input = document.querySelector(ID_INPUT_USER);

const GIT_URL = 'https://api.github.com/users/{{login}}';
const PLACEHOLDER_USER_NAME = '{{login}}';
const PLACEHOLDER_USER_IMG = '{{img}}';
const PLACEHOLDER_USER_REPOS = '{{reposNum}}';
const PLACEHOLDER_USER_FOLLOWERS = '{{followers}}';
const PLACEHOLDER_USER_FOLLOWING = '{{following}}';

const userInfoTemplate = document.querySelector('#toDoUserInfoTemplate').innerHTML;


button.addEventListener('click', onButtonClick);

function onButtonClick() {
  getUserInfo()
    .then((info) => renderInfoHtml(info))
    .then((html) => {
      container.innerHTML = html;
    })
    .catch( err => {
      alert(err.message)
    });

  resetInput()
}

function getUserInfo() {
  const userUrl = GIT_URL.replace(PLACEHOLDER_USER_NAME, getUserName());

  return fetch(userUrl)
    .then((res) => {
      if(!res.ok) {
        throw new Error('User is not exist') 
      }

      return res.json()
    })
}

function renderInfoHtml(info) {
  const avatar = info.avatar_url;
  const reposNum = info.public_repos;
  const followers = info.followers;
  const following = info.following;
  
  const  contactsList = userInfoTemplate
    .replace(PLACEHOLDER_USER_IMG, `<img src="${avatar}"`)
    .replace(PLACEHOLDER_USER_REPOS, `Количество репозиториев: ${reposNum}`)
    .replace(PLACEHOLDER_USER_FOLLOWERS, `Количество фоловеров: ${followers}`)
    .replace(PLACEHOLDER_USER_FOLLOWING, `Количество наблюдаемых: ${following}`);
  
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
    alert('Add user name, please');
  } else {

    return value;
  }
}