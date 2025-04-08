const buttons = document.querySelectorAll('button');

var num1 = 0;
var num2 = 0;
var operator = '';

buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const clickedButton = event.target;
        console.log(clickedButton.value)
    });
});

function multiply() {

}

function division() {

}

function addition() {

}

function subtract() {

}

function modulo() {

}