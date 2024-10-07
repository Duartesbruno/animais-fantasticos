import outsideClick from './outsideclick.js';

export default class MenuMobile {
  constructor(menuButton, menuList, events) {
    this.menuButton = document.querySelector(menuButton);
    this.menuList = document.querySelector(menuList);

    //define touchstart e click argumento padrão de events caso o usuario nao defina
    if(events === undefined) {
      this.events = ['click', 'touchstart'];
    } else {
      this.events = events;
    }

    this.openMenu = this.openMenu.bind(this)
  }

  openMenu(event) {
    event.preventDefault();
    this.menuButton.classList.add('active');
    this.menuList.classList.add('active');
    outsideClick(this.menuList, this.events, () => {
      this.menuList.classList.remove('active');
      this.menuButton.classList.remove('active');
    });
  }

  addMenuMobileEvents() {
    this.events.forEach(event => this.menuButton.addEventListener(event, this.openMenu));
  }

  init() {
    if (this.menuButton && this.menuList) {
        this.addMenuMobileEvents();
    }
    return this;
  }
}
