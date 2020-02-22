class Calculator {
    constructor(operand1Text, operand2Text) {
        this.operand1Text = operand1Text; // primeiro numero
        this.operand2Text = operand2Text; // numero seguinte
        this.flagResetNumber = false; // variavel flag para evitar q, qd escolhemos um numero dps de uma conta, esse numero se junte ao resultado dessa conta tipo concatenação
        this.clearScreen(); //passar valores para os default sempre q crio nova calculadora
    }

    clearScreen() {
        this.operand1 = '';
        this.operand2 = '';
        this.operation = undefined;
    }

    delete() { // apagar o último algarismo inserido. vou ter de usar slice?
      this.operand2 = this.operand2.toString().slice(0, (this.operand2.length - 1));
    }

    appendNumberToScreen(number) { 
      if(!(number === '.' && this.operand2.includes('.'))) { //se já tiver 1 "." isto evita adicionar mais "."
        this.operand2 = this.operand2.toString() + number.toString(); //para aparecer no visor tipo 2345. n quero adicionar tipo 1+1, mas sim ter 11
      }
    }

    pickOperation(operation) {
      if(this.operand2 !== '') { // isto serve para evitar q, qd escolho um operador, possa fazê-lo ad infinitum sem escolher um número. se n pusesse isto, o nº anterior desaparecia do ecrâ.
        if(this.operand1 !== '') { //objetivo aqui é calcular operando 1 ir sendo calculado à medida q vamos fazendo operações
          this.calculate();
          //this.operation = operation;
          //this.operand1 = this.operand2; 
          //this.operand2 = ''; // escolho primeiro nº, depois carrego na operação a efetuar e do ecrâ desaparece o 1º número posto
        }
        this.flagResetNumber = true;
        this.operation = operation;
        this.operand1 = this.operand2; 
        this.operand2 = ''; // escolho primeiro nº, depois carrego na operação a efetuar e do ecrâ desaparece o 1º número posto
      }      
    }

    calculate() {
      let result;
      let lastNumber = parseFloat(this.operand1);
      let actualNumber = parseFloat(this.operand2);
      
      if(!(Number.isNaN(lastNumber) || Number.isNaN(actualNumber))) { // exemplo: se ainda n tiver colocado nenhum numero, isto evita q possa computar resultados de operacoes
        switch(this.operation) {
          case '+':
            result = lastNumber + actualNumber;
            break;
          case '-':
            result = lastNumber - actualNumber;
            break;
          case 'x':
            result = lastNumber * actualNumber;
            break;
          case '/':
            result = lastNumber / actualNumber;
            break;
          default:
            return; //se nenhum dos simbolos for escolhido, temos calculo invalido
        }
      }
      // agora para apresentar o resultado do cálculo
      this.operand2 = result;
      this.operation = undefined; // fazer reset à variável operação
      this.operand1 = ''; //para não aparecer em cima o número anterior, aka ter só o resultado do cálculo no ecra
    }

    updateScreen() {
        this.operand2Text.innerText = this.operand2;        
        this.operand1Text.innerText = this.operand1; //para aparecer em cima o número colocado anteriormente
    }
}

const buttons = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');
const deleteOperator = document.querySelector('.delete');
const clearButton = document.querySelector('.clear');
const operand1Text = document.querySelector('.operand1');
const operand2Text = document.querySelector('.operand2');

const newCalculator = new Calculator(operand1Text, operand2Text);

//event listeners

buttons.forEach(button => {
    button.addEventListener('click', () => {/*
        newCalculator.appendNumberToScreen(button.innerText); //detetar números clicados
        newCalculator.updateScreen(); //atualizar ecrâ com os números*/
        if(newCalculator.operand1 === '' && newCalculator.operand2 !== '' && newCalculator.flagResetNumber) {
          newCalculator.operand2 = '';
          newCalculator.flagResetNumber = false;
        } //isto para evitar q, p ex, somando 3 + 3 = 6 e se carregasse noutro numero a seguir esse concatenava c o 6
        newCalculator.appendNumberToScreen(button.innerText); //detetar números clicados
        newCalculator.updateScreen(); //atualizar ecrâ com os números
    });
});

operators.forEach(operator => {
  operator.addEventListener('click', () => {
      newCalculator.pickOperation(operator.innerText); //detetar números clicados
      newCalculator.updateScreen(); //atualizar ecrâ com os números
  });
});

equals.addEventListener('click', button => {
  newCalculator.calculate();
  newCalculator.updateScreen();
})

clearButton.addEventListener('click', button => {
  newCalculator.clearScreen();
  newCalculator.updateScreen();
})

deleteOperator.addEventListener('click', button => {
  newCalculator.delete();
  newCalculator.updateScreen();
})