export default class AnimaNumeros {
  constructor(numeros, observerTarget, observerClass) {
    this.numeros = document.querySelectorAll(numeros);
    this.observerTarget = document.querySelector(observerTarget);
    this.observerClass = observerClass;

    //bind o this do objeto ao callback da mutação
    this.handleMutation = this.handleMutation.bind(this);
  }

  //recebe um elemento do dom com numero em seu texto e incremeta a partir de 0 ate o nuemro final
  static incrementarNumero(numero) {  //static pois nao precisa do objeto para funcionar
    const total = +numero.innerText;
    const incremento = Math.floor(total / 100);
    let start = 0;
    const timer = setInterval(() => {
      start += incremento;
      numero.innerText = start;
      if (start > total) {
        numero.innerText = total;
        clearInterval(timer);
      }
    }, 25 * Math.random());
  }

//ativa incrementar numero para cada numero selecionado do DOM
  animaNumeros() {
    this.numeros.forEach(numero => this.constructor.incrementarNumero(numero));
  }


  //funcao que ocorre quando a mutacao ocorrer
  handleMutation(mutation) {
    if (mutation[0].target.classList.contains(this.observerClass)) {
      this.observer.disconnect();
      this.animaNumeros();
    }
  }


  //adiciona o mutationObserver para verificar qunado a classe ativo é adicionada ao elemento target
  addMutationObserver() {
    this.observer = new MutationObserver(this.handleMutation);
    this.observer.observe(this.observerTarget, { attributes: true });
  }


  init() {
    if (this.numeros.length && this.observerTarget) {
      this.addMutationObserver();
    }
    return this;
  }
}
