import AnimaNumeros from './anima-numeros.js';

export default function fetchAnimais(url, target) {
  //cria a div contendo informacoes com o total de animais
  function createAnimal(animal) {
    const div = document.createElement('div');
    div.classList.add('numero-animal');
    div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`;
    return div;
  }

//preeche cada animal no DOM
const numerosGrid = document.querySelector(target);
  function preencherAnimais(animal) {
    const divAnimal = createAnimal(animal);
    numerosGrid.appendChild(divAnimal);
  }


  //anima os numeors de cada animal
  function animaAnimaisNumeros() {
    const animaNumeros = new AnimaNumeros('[data-numero]', '.numeros', 'ativo');
    animaNumeros.init();
  }


  //puxa os animais através de um arquivo json e cria cada animal utilizando createAnimal
  async function criarAnimais() {
    try {
      //fetch e espera resposta e transforma a resposta em json
      const animaisResponse = await fetch(url);
      const animaisJSON = await animaisResponse.json();

      //após a transformacao de json, ativa as funcoes para preencher e animar os numeros
      animaisJSON.forEach((animal) => preencherAnimais(animal));
      animaAnimaisNumeros()
    } catch (erro) {
      console.log(erro);
    }
  }

  return criarAnimais();
}
