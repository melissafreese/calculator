"use strict";

const displayNum1 = document.getElementById("first-operand");
const displayNum2 = document.getElementById("second-operand");

/* Displays selected number when a number button is clicked */
document.querySelectorAll(".numbers").forEach(button => {
	button.addEventListener("click", () => {
		appendNumber(button.innerText);
		updateDisplay();
	});
});

/* Displays selected operator when an operator button is clicked */
document.querySelectorAll(".operators").forEach(button => {
	button.addEventListener("click", () => {
		chooseOperation(button.innerText);
		updateDisplay();
	});
});

/* Variables to store the current number selected, previous number selected and the operation selected */
let currentNum = "";
let previousNum = "";
let operation = null;

/* 
	Allows user to add decimal point to current number
		1. prevents decimal point duplication 
		2. if empty string, add "0." to handle string starting with decimal
		3. updates display to reflect decimal input
*/

document.getElementById("decimal").addEventListener("click", function () {
	if (!currentNum.includes(".")) {
		if (currentNum === "") {
			currentNum = "0.";
		} else {
			currentNum += ".";
		}
		updateDisplay();
	}
});
/* 
	Function to ensure only one decminal point can be added
		1. "if" statement checks if: 
 			a. clicked button represents a decimal point 
			b. current number already contains a decimal point
			c. both conditions return true; function will exit without adding another decimal point
		2.  if true; concatenate current number and decimal to string
		3. updates display to reflect new number
*/
function appendNumber(number) {
	if (!(number === "." && currentNum.includes("."))) {
		currentNum = currentNum.toString() + number.toString();
		updateDisplay();
	}
}

/* Handles selection of arithmatic operation */
function chooseOperation(selectedOperation) {
	if (currentNum === "") return;
	if (previousNum !== "") {
		calculate();
	}
	operation = selectedOperation;
	previousNum = currentNum;
	currentNum = "";
}

/* Deletes most recently added number or operator */
document.addEventListener("click", function (e) {
	if (e.target.id == "deleteBtn") {
		currentNum = currentNum.toString().slice(0, -1);
		updateDisplay();
	}
});

/* Clears Display */

document.addEventListener("click", function (e) {
	if (e.target.id == "clearBtn") {
		currentNum = "";
		previousNum = "";
		operation = null;
		updateDisplay();
	}
});

/* Perform calculation */
function calculate() {
	let result;

	const num1 = parseFloat(previousNum);
	const num2 = parseFloat(currentNum);

	if (isNaN(num1) || isNaN(num2)) return;

	switch (operation) {
		case "+":
			result = num1 + num2;
			break;
		case "-":
			result = num1 - num2;
			break;
		case "*":
			result = num1 * num2;
			break;
		case "/":
			result = num1 / num2;
			break;
		case "%":
			result = (num1 / 100) * num2;
			break;
		default:
			return;
	}

	const roundedResult = result.toFixed(2);

	currentNum = roundedResult;
	operation = undefined;
	previousNum = "";
	updateDisplay();

	console.log("result:", roundedResult);
	console.log("num1:", num1);
	console.log("num2:", num2);
}

/* Equals button to perform calculation */
document.getElementById("equals").addEventListener("click", calculate);

/* Update display during calculation */
function updateDisplay() {
	if (previousNum && operation) {
		displayNum1.innerText = "";
		displayNum2.innerText = `${previousNum} ${operation} ${currentNum}`;
	} else {
		displayNum1.innerText = currentNum;
		displayNum2.innerText = "";
	}
}

/* Keyboard support */
document.addEventListener("keydown", function (e) {
	let key = e.key;
	if (!isNaN(key) || key === ".") {
		appendNumber(key);
		updateDisplay();
	} else if (key === "Backspace") {
		currentNum = currentNum.toString().slice(0, -1);
		updateDisplay();
	} else if (key === "+" || key === "-" || key === "*" || key === "/") {
		chooseOperation(key);
		updateDisplay();
	} else if (key === "Enter" || key === "=") {
		calculate(currentNum);
		updateDisplay();
	}
});
