var display = '0';
var num1 = null;
var num2 = null;
var operator = null;
var answer = null;

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const clickedButton = event.target;
        operate(clickedButton);
    });
});

function updateTextField(value) {
    const textField = document.querySelector('#textField');
    display = display + value;
    if (display.length > 19) {
        display = display.substring(0, 19);
    }
    const data = textField.textContent = display;
    return data;
}

function operate(clickedButton) {

    const className = clickedButton.className;
    console.log(className + ' ' + clickedButton.id);

    if (num1 != null && operator != null && num2 === null) {
        display = '';
    }

    if (className === 'operator') { //operator
        if (answer != null)
        if (operator === null && num2 === null) {
            clickedButton.style.background = 'blue';
            operator = '*';
        }
    } else if(className === 'other') { //input is not a operator (AC, +/-, )
        if (clickedButton.id === 'clear') {
            num1 = null;
            num2 = null;
            operator = null;
            answer = null;
            display = '';
            updateTextField('0');

        }
    } else if (className === 'operand'){ //input is a number (operand)
        if (operator === null && num2 === null) {
            num1 = updateTextField(clickedButton.value);
        } else {
            num2 = updateTextField(clickedButton.value);
        }
    }

    console.log(num1 + ' ' + operator + ' ' + num2);
}

function multiply() {
    answer = num1 * num2;
}

function division() {
    answer = num1 / num2;
}

function addition() {
    answer = num1 + num2;
}

function subtract() {
    answer = num1 - num2;
}

function modulo() {
    answer = num1 % num2;
}