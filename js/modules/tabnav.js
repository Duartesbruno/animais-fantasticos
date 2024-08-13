export default class initTabNav {
  constructor(menu, content) {
     this.tabMenu = document.querySelectorAll(menu);
     this.tabContent = document.querySelectorAll(content);
     this.activeClass = 'ativo';
  }

  //ativa a tab de acordo com o index da mesma
  activeTab(index) {
    this.tabContent.forEach((section) => {
      section.classList.remove(this.activeClass);
    });
    const direcao = this.tabContent[index].dataset.anime;
    this.tabContent[index].classList.add(this.activeClass, direcao);
  }

  //adicona os eventos nas tabs
  addTabNavEvent() {
    this.tabMenu.forEach((itemMenu, index) => {
      itemMenu.addEventListener('click', () => {
        this.activeTab(index);
      });
    });
  }

  init() {
    if (this.tabMenu.length && this.tabContent.length) {
      //ativando o primeiro item
      this.activeTab(0);
      this.addTabNavEvent();
    }
  }
}
