const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const allClearBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const equalBtn = document.querySelector('[data-equal]');
const previousScreenText = document.querySelector('[data-previous-screen]');
const currentScreenText = document.querySelector('[data-current-screen]');

class Calculator {
  constructor(previousScreenText, currentScreenText) {
    this.previousScreenText = previousScreenText;
    this.currentScreenText = currentScreenText;
    this.allClear();
  }
  allClear() {
    this.previousScreen = '';
    this.currentScreen = '';
  }
  compute() {}
  selectOperation() {}

  appendNum(number) {
    if (number === '.' && this.currentScreen.includes('.')) return;
    this.currentScreen = this.currentScreen.toString() + number.toString();
  }

  delete() {
    this.currentScreen = this.currentScreen.toString().slice(0, -1);
  }

  updateScreen() {
    this.currentScreenText.innerText = this.currentScreen;
  }
}

const calculator = new Calculator(previousScreenText, currentScreenText);

numberBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNum(button.innerText);
    calculator.updateScreen();
  });
});

allClearBtn.addEventListener('click', () => {
  calculator.allClear();
  calculator.updateScreen();
});

deleteBtn.addEventListener('click', () => {
  calculator.delete();
  calculator.updateScreen();
});
