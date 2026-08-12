const calculatorState = {
  display: '0',
  previousValue: null,
  operator: null,
  waitingForOperand: false,
};

function getDisplayValue() {
  return calculatorState.display;
}

function inputDigit(digit) {
  if (calculatorState.waitingForOperand) {
    calculatorState.display = digit;
    calculatorState.waitingForOperand = false;
  } else {
    if (calculatorState.display === '0') {
      calculatorState.display = digit;
    } else {
      calculatorState.display += digit;
    }
  }
}

function inputDecimal() {
  if (calculatorState.waitingForOperand) {
    calculatorState.display = '0.';
    calculatorState.waitingForOperand = false;
  } else {
    if (!calculatorState.display.includes('.')) {
      calculatorState.display += '.';
    }
  }
}

function formatDisplay(value) {
  if (!Number.isFinite(value)) {
    return 'Error';
  }

  const text = String(value);

  if (text.length <= 10) {
    return text;
  }

  return Number(value).toPrecision(6);
}

function performCalculation(firstValue, secondValue, operator) {
  switch (operator) {
    case '+':
      return firstValue + secondValue;

    case '-':
      return firstValue - secondValue;

    case '*':
      return firstValue * secondValue;

    case '/':
      if (secondValue === 0) {
        return NaN;
      }
      return firstValue / secondValue;

    default:
      return secondValue;
  }
}

function setOperator(nextOperator) {
  const inputValue = parseFloat(calculatorState.display);

  if (calculatorState.previousValue === null) {
    calculatorState.previousValue = inputValue;
  } else if (
    calculatorState.operator &&
    !calculatorState.waitingForOperand
  ) {
    const result = performCalculation(
      calculatorState.previousValue,
      inputValue,
      calculatorState.operator
    );

    calculatorState.display = formatDisplay(result);
    calculatorState.previousValue = result;
  }

  calculatorState.waitingForOperand = true;
  calculatorState.operator = nextOperator;
}

function calculate() {
  if (
    calculatorState.operator === null ||
    calculatorState.previousValue === null
  ) {
    return;
  }

  const inputValue = parseFloat(calculatorState.display);

  const result = performCalculation(
    calculatorState.previousValue,
    inputValue,
    calculatorState.operator
  );

  calculatorState.display = formatDisplay(result);
  calculatorState.previousValue = null;
  calculatorState.operator = null;
  calculatorState.waitingForOperand = true;
}

function clearAll() {
  calculatorState.display = '0';
  calculatorState.previousValue = null;
  calculatorState.operator = null;
  calculatorState.waitingForOperand = false;
}

function clearEntry() {
  calculatorState.display = '0';
}

function applyPercent() {
  const value = parseFloat(calculatorState.display);

  calculatorState.display = formatDisplay(value / 100);
  calculatorState.waitingForOperand = true;
}