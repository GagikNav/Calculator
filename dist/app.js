class Calculator {
  constructor(indicatorScreenText, previousScreenText, currentScreenText) {
    this.indicatorScreenText = indicatorScreenText;
    this.previousScreenText = previousScreenText;
    this.currentScreenText = currentScreenText;
    this.memory;
    this.allClear();
  }
  allClear() {
    this.memory = 0;
    this.previousScreen = '';
    this.currentScreen = '';
    this.operation = undefined;
  }

  memoryPlus() {
    this.compute();
    if (
      parseFloat(this.currentScreen) === 0 ||
      isNaN(parseFloat(this.currentScreen))
    )
      return;
    this.memory = parseFloat(this.memory) + parseFloat(this.currentScreen);
    this.currentScreen = '';
  }

  memoryMinus() {
    this.compute();
    if (
      parseFloat(this.currentScreen) === 0 ||
      isNaN(parseFloat(this.currentScreen))
    )
      return;
    this.memory = parseFloat(this.memory) - parseFloat(this.currentScreen);
    this.currentScreen = '';
  }

  memoryRecall() {
    this.currentScreen = this.memory;
  }

  compute() {
    let result;
    const currentNumber = parseFloat(this.currentScreen);
    const previousNumber = parseFloat(this.previousScreen);
    if (isNaN(previousNumber) || isNaN(currentNumber)) return;

    switch (this.operation) {
      case '+':
        result = currentNumber + previousNumber;
        break;

      case '-':
        result = previousNumber - currentNumber;
        break;

      case '×':
        result = currentNumber * previousNumber;
        break;

      case '÷':
        result = previousNumber / currentNumber;
        break;

      default:
        return;
    }
    this.previousScreen = '';
    this.currentScreen = result;
    this.operation = undefined;
  }

  handelOperation(operation) {
    if (this.currentScreen === '') {
      return;
    } else {
      this.compute();
    }

    this.operation = operation;
    this.previousScreen = this.currentScreen;
    this.currentScreen = '';
  }

  appendNum(number) {
    if (number === '.' && this.currentScreen.includes('.')) return;
    this.currentScreen = this.currentScreen.toString() + number.toString();
  }

  delete() {
    this.currentScreen = this.currentScreen.toString().slice(0, -1);
  }

  updateScreen() {
    // memory indicator
    if (this.memory === 0 || this.memory === undefined) {
      this.indicatorScreenText.innerText = '';
    } else {
      this.indicatorScreenText.innerText = 'M';
    }

    // main Screen
    this.currentScreenText.innerText = this.getNumber(this.currentScreen);
    if (this.operation != null) {
      this.previousScreenText.innerText = `${this.getNumber(
        this.previousScreen,
      )} ${this.operation}`;
    } else {
      this.previousScreenText.innerText = '';
    }
  }
  getNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '0';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
}

// Variables
const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const allClearBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const equalBtn = document.querySelector('[data-equal]');
const memoryPlusBtn = document.querySelector('[data-memory-plus]');
const memoryMinusBtn = document.querySelector('[data-memory-minus]');
const memoryRecallBtn = document.querySelector('[data-memory-recall]');
const previousScreenText = document.querySelector('[data-previous-screen]');
const currentScreenText = document.querySelector('[data-current-screen]');
const indicatorScreenText = document.querySelector('[data-indicator-screen]');
// const keyboard = e => {
//   let key = e.key;
// };
// keyboard();

// $ create Calculator

const calculator = new Calculator(
  indicatorScreenText,
  previousScreenText,
  currentScreenText,
);

numberBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNum(button.innerText);
    calculator.updateScreen();
  });
});

operationBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.handelOperation(button.innerText);
    calculator.updateScreen();
  });
});

allClearBtn.addEventListener('click', () => {
  calculator.allClear();
  calculator.updateScreen();
});

//  Delete Button
deleteBtn.addEventListener('click', () => {
  calculator.delete();
  calculator.updateScreen();
});

// Equal button
equalBtn.addEventListener('click', () => {
  calculator.compute();
  calculator.updateScreen();
});

// Memory Plus Button
memoryPlusBtn.addEventListener('click', () => {
  calculator.memoryPlus();
  calculator.updateScreen();
});
// Memory Minus Button
memoryMinusBtn.addEventListener('click', () => {
  calculator.memoryMinus();
  calculator.updateScreen();
});

// Memory Recall Button
memoryRecallBtn.addEventListener('click', () => {
  calculator.memoryRecall();
  calculator.updateScreen();
});
