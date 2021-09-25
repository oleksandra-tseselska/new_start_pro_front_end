class Tabs {
  #rootEl;

  static TABS_CLASS = 'tabs';
  static TABS_ITEM_ID = '#first-element';
  static TABS_ITEM_CLASS = 'tabs-item';
  static BODY_CLASS = 'body';
  static BODY_ACTIVE_CLASS = 'body--active';
  static TITLE_CLASS = 'title';
  static TITLE_ACTIVE_CLASS = 'title--active'

  constructor(rootEl) {
    this.#rootEl = rootEl;

    this.bindEvents();
    this.bindFirstContent ();
    this.bindStyles();
  }

  bindEvents() {
    this.#rootEl.addEventListener('click', (e) => this.onRootElClick(e));
  }

  onRootElClick(e) {
    if (e.target.classList.contains(Tabs.TITLE_CLASS)) {
      const titleEl = e.target;
      const bodyEl = this.findContent(titleEl);
      const openTitle = this.findOpenTitle();
      const openBody = this.findOpenBody();

      if (openTitle && openBody) {
        this.closeTitleContent(openTitle);
        this.closeBodyContent(openBody);
      }

      this.openTitleContent(titleEl);
      this.openBodyContent(bodyEl);
    }
  }

  findContent(el) {
    const itemEl = el.closest('.' + Tabs.TABS_ITEM_CLASS);

    return itemEl.querySelector('.' + Tabs.BODY_CLASS);
  }

  findOpenTitle() {
    return this.#rootEl.querySelector('.' + Tabs.TITLE_ACTIVE_CLASS);
  }

  findOpenBody() {
    return this.#rootEl.querySelector('.' + Tabs.BODY_ACTIVE_CLASS);
  }

  openTitleContent(el) {
    el.classList.add(Tabs.TITLE_ACTIVE_CLASS);
  }

  openBodyContent(el) {
    el.classList.add(Tabs.BODY_ACTIVE_CLASS);
  }

  closeTitleContent(el) {
    el.classList.remove(Tabs.TITLE_ACTIVE_CLASS);
  }

  closeBodyContent(el) {
    el.classList.remove(Tabs.BODY_ACTIVE_CLASS);
  }

  bindFirstContent () {
    const openTitle = this.findOpenTitle();
    const openBody = this.findOpenBody();
    const firstEl = this.#rootEl.querySelector(Tabs.TABS_ITEM_ID);
    const [titleEl, bodyEl] = firstEl.children;

    if (!openTitle && !openBody) {
      this.openTitleContent(titleEl);
      this.openBodyContent(bodyEl);
    }
  }

  bindStyles() {
    const tabs = this.#rootEl;
    const tabsItems = this.#rootEl.children;

    tabs.classList.add(Tabs.TABS_CLASS);

    for(let itemEl of tabsItems) {
      const [titleEl, bodyEl] = itemEl.children;

      itemEl.classList.add(Tabs.TABS_ITEM_CLASS);
      titleEl.classList.add(Tabs.TITLE_CLASS);
      bodyEl.classList.add(Tabs.BODY_CLASS);
    }
  }
}

const tabsEl = document.querySelector('#tabs');
new Tabs(tabsEl);