class Calculator{
    constructor (){
        this.display = '0';
        this.previousValue = null;
        this.operator = null;
        this.waitingForOperand = false;
    }

    getDisplayValue(){
        return this.display;
    }

    inputDigit(digit) {
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

    inputDecimal() {
        if (calculatorState.waitingForOperand) {
            calculatorState.display = '0.';
            calculatorState.waitingForOperand = false;
        } else {
            if (!calculatorState.display.includes('.')) {
            calculatorState.display += '.';
            }
        }
    }

    static formatDisplay(value) {
        if (!Number.isFinite(value)) {
            return 'Error';
        }

        const text = String(value);

        if (text.length <= 10) {
            return text;
        }

        return Number(value).toPrecision(6);
    }

    static performCalculation(firstValue, secondValue, operator) {
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


}

