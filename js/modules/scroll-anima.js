import debounce from "./debounce.js";
export default class ScrollAnima {
  constructor(sections) {
    this.sections = document.querySelectorAll(sections);
    this.windowMetade = window.innerHeight * 0.6;

    //é usado bind para poder dizer que a referencia é "sections", pois la no callback do "scroll" o this é window
    this.checkDistance = debounce(this.checkDistance.bind(this), 50); //foi usado a funcao debounce para otimizar o tempo de disparo da propria funcao "debounce"
  }


  //pega a distancia de cada item em relacao ao topo do site
  getDistance() {
    this.distance = [...this.sections].map((section) => {  //interecao que precisa do retorno usar o "map", só funciona em array por isso a desestruturacao
      const offset = section.offsetTop;
      return {
        element: section,
        offset: Math.floor(offset - this.windowMetade)
      };
    });
  }


  //verifica a distancia em cada objeto em relação ao scroll do site
  checkDistance() {
    console.log('Teste Check')
    this.distance.forEach((item) => {
      if (window.scrollY > item.offset) {
        item.element.classList.add('ativo'); //item.element é o objeto retornado do getDistance
      } else if (item.element.classList.contains('ativo')) {
        item.element.classList.remove('ativo');
      }
    });
  }

  init() {
    if (this.sections.length) {
      this.getDistance();
      this.checkDistance(); //caso ja tier algo avista ele ja mostrar logo que carrega a pagina(neste caso o primeiro elemento), pois como o callback só despara se usar o scroll temos que forçar a primeira execucao
      window.addEventListener('scroll', this.checkDistance);
    }
    return this;
  }

  stop() {
    //remove e o evento de scroll
    window.removeEventListener('scroll', this.checkDistance);
    
    //coloca a classe ativo para poder mostrar o conteudo das secções
    this.distance.forEach((item) => {
    item.element.classList.add('ativo');
    });
  }
}
