let display = '';
let num1 = null;
let num2 = null;
let operator = null;
let answer = null;

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const clickedButton = event.target;
        operate(clickedButton);
    });
});

function updateTextField(value) {
    const textField = document.querySelector('#textField');

    if (value != '.' && display === '0') {
        display = '';
    } else if (value === '-') {
        return display;
    }

    switch (value) {
        case 'sign':
            if (answer != null) {
                num1 = answer;
                answer = null;
            }
            if (display.charAt(0) === '-') {
                display.subString(1);
            } else {
                display = `-${display}`;
            }
            break;
        default:
            display = display + value;
            if (display.length > 19) {
                display = display.substring(0, 19);
            }
    }

    return data = textField.textContent = display;
}

function operate(clickedButton) {

    const className = clickedButton.className;

    if (num1 != null 
        && operator != null 
        && num2 === null) {
        display = '';
    }

    switch (className) {
        case 'operator':
            getOperator(clickedButton);
            break;
        case 'other':
            getOther(clickedButton);
            break;
        case 'operand':
            getOperand(clickedButton);
            break;
    }

}

function getOperator(clickedButton) {
    if (answer != null) {
        clickedButton.style.background = '#ffa600a6';
        num1 = answer;
        answer = null;
        operator = clickedButton.id;
    } else if (operator === null && num2 === null) {
        clickedButton.style.background = '#ffa600a6';
        operator = clickedButton.id;
    } else if (operator != null && num2 === null) {
        num2 = num1;
        calculate();
        updateTextField(answer);
        getOther('');
    } else if (num1 != null && num2 != null && operator != null) {
        getOther(document.getElementById('equals'));
    }

}

function getOther(clickedButton) {
    if (operator != null) document.getElementById(`${operator}`).style.background = '#ffa600';

    switch (clickedButton.id) {
        case 'clear':
            answer = null;
            display = '';
            updateTextField('0'); 
            break;
        case 'equals':
            display = '';
            calculate();
            updateTextField(answer);
            break;
    }

    num1 = null;
    num2 = null;
    operator = null;
}

function getOperand(clickedButton) {
    if (display.indexOf('.') != -1 && clickedButton.id === '.') return;
    if (clickedButton.id === 'sign') updateTextField('sign');

    if (operator === null && num2 === null) {
        if (answer != null && num1 === null) {
            display = ' ';
        }
        answer = null;
        num1 = updateTextField(clickedButton.value);
    } else {
        num2 = updateTextField(clickedButton.value);
    }
}

function calculate() {
    const num1_Cal = Number(num1);
    const num2_Cal = Number(num2);
    let solution = null;

    switch (operator) {
        case '%':
            solution = num1_Cal % num2_Cal;
            break;
        case '/':
            solution = num1_Cal / num2_Cal;
            break;
        case '*':
            solution = num1_Cal * num2_Cal;
            break;
        case '-':
            solution = num1_Cal - num2_Cal;
            break;
        case '+':
            solution = num1_Cal + num2_Cal;
            break;
        default:
            console.log('Error');
    }
    answer = Math.round(solution * 100) / 100;

}