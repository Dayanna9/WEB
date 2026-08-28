class CalculatorApp {

    constructor() {
        this.calculator = new Calculator();

        this.displayElement = document.getElementById('display');
        this.keypadElement = document.querySelector('.keypad');

        this.keypadElement.addEventListener('click', (event) => {
            this.handleKeypadClick(event);
        });

        this.updateDisplay();
    }

    updateDisplay() {
        this.displayElement.textContent =
            this.calculator.getDisplayValue();
    }

    handleKeypadClick(event) {
        const button = event.target.closest('button');

        if (!button) {
            return;
        }

        const { action, value } = button.dataset;

        switch (action) {
            case 'digit':
                this.calculator.inputDigit(value);
                break;

            case 'decimal':
                this.calculator.inputDecimal();
                break;

            case 'operator':
                this.calculator.setOperator(value);
                break;

            case 'equals':
                this.calculator.calculate();
                break;

            case 'clear-all':
                this.calculator.clearAll();
                break;

            case 'clear-entry':
                this.calculator.clearEntry();
                break;

            case 'percent':
                this.calculator.applyPercent();
                break;

            default:
                return;
        }

        this.updateDisplay();
    }
}

new CalculatorApp();