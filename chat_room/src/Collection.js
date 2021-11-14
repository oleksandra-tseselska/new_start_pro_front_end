import { SOCKET } from './const';

class Collection {
  sendMessageToWeb(textMessage) {
    SOCKET.onopen = (event) => {
      SOCKET.send(textMessage);
    }
  }
}

export default Collection;