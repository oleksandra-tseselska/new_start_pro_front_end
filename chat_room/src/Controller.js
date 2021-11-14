import Collection from "./Collection";
import ListView from "./view/ListView";
import MessageView from "./view/MessageView";

class Controller {
  #rootEl;

  constructor($rootEl) {
    this.#rootEl = $rootEl;

    this.messageC = new Collection;
    this.listView = new ListView;
    this.messageView = new MessageView({
      onSubmit: message => this.createMessage(message),
    });

    this.listView.appendTo(this.#rootEl);
    this.messageView.appendTo(this.#rootEl);
  }

  createMessage(message) {
    const textMessage = JSON.stringify(message);

    this.listView.addElement(message);
    this.messageC.sendMessageToWeb(textMessage);
    this.messageView.resetForm()
  }
}

export default Controller;