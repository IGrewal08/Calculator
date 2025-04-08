var display = '';
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

    if (value === 'sign') {
        console.log(display.charAt(0));
        if (display.charAt(0) === '-') {
            display = display.slice(1);
        } else {
            display = '-' + display;
        }
        console.log(display.charAt(0));
    } else {
        display = display + value;
        if (display.length > 19) {
            display = display.substring(0, 19);
        }

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
        if (answer != null) {
            num1 = answer;
            answer = null;
        }
        if (operator === null && num2 === null) {
            clickedButton.style.background = '#ffa600a6';
            operator = clickedButton.id;
        } else if (operator != null && num2 === null) {
            num2 = num1;
            //run className == 'other' by passing 'equals'
        }

    } else if(className === 'other') { //input is not a operator (AC, +/-, )
        if (operator != null) document.getElementById(`${operator}`).style.background = '#ffa600';  //Breaks after pressing = since operator is null (either put in if statement of (better:) disable = until operator isn't null)
        if (clickedButton.id === 'clear') {
            answer = null;
            display = '';
            updateTextField('0');   //

        } else if (clickedButton.id === 'equals') {
            display = '';
            calculate();
            updateTextField(answer);
        } else if (clickedButton.id === 'sign') {
            updateTextField('sign');
        }

        num1 = null;
        num2 = null;
        operator = null;

    } else if (className === 'operand'){ //input is a number (operand)
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

    console.log(num1 + ' ' + operator + ' ' + num2 + ' ' + answer);
}

function calculate() {
    const num1_Cal = Number(num1);
    const num2_Cal = Number(num2);

    switch (operator) {
        case '%':
            answer = (num1_Cal % num2_Cal);
            break;
        case '/':
            answer = Math.round((num1_Cal / num2_Cal) * 100) / 100;
            break;
        case '*':
            answer = num1_Cal * num2_Cal;
            break;
        case '-':
            answer = num1_Cal - num2_Cal;
            break;
        case '+':
            answer = num1_Cal + num2_Cal;
            break;
        default:
            console.log('error');
    }
}