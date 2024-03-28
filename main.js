"use strict";
// Declare variables
const displayNum1 = document.getElementById("first-operand");
const displayNum2 = document.getElementById("second-operand");

// Display digits when digit button is clicked
document.querySelectorAll('.digit').forEach(button => {
	button.addEventListener('click', () => {
		appendNumber(button.innerText);
		updateDisplay();
	});
});

const operators = document.querySelectorAll(".operator");
// Displays operators when clicked
operators.forEach(button => {
	button.addEventListener("click", () => {
		chooseOperation(button.innerText);
		updateDisplay();
	});
});

// Variables to store the current operation and operands
let currentNum = "";
let previousNum = "";
let operation = null;

// Appends entered number to the current number on display
function appendNumber(number) {
	if (!(number === "." && currentNum.includes("."))) {
		currentNum = currentNum.toString() + number.toString();
		updateDisplay();
	}
}

// Handle decimal point input -- still need to refactor
document.getElementById("dot").addEventListener("click", function () {
	if (!currentNum.includes(".")) {
		currentNum += currentNum === "" ? "0" : ".";
		updateDisplay();
	}
});

// Delete single digit
document.addEventListener("click", function (e) {
	if (e.target.id == "delete") {
		currentNum = currentNum.toString().slice(0, -1);
		updateDisplay();
	}
});

// Clears Display
document.addEventListener("click", function (e) {
	if (e.target.id == "clear") {
		currentNum = "";
		previousNum = "";
		operation = null;
	}
	updateDisplay();
});

// Handles selection of arithmatic operation
function chooseOperation(selectedOperation) {
	if (currentNum === "") return;
	if (previousNum !== "") {
		calculate();
	}
	operation = selectedOperation;
	previousNum = currentNum;
	currentNum = "";
}

// Perform calculation
function calculate() {
	let result;
	// Convert operands to numbers
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

	const roundedResult = roundNumber(result, 10);
	// Limits number of decimal places displayed
	function roundNumber(num, decimalPlaces) {
		const factor = Math.pow(10, decimalPlaces);
		return Math.round(num * factor) / factor;
	}

	currentNum = roundedResult;
	operation = undefined;
	previousNum = "";
	updateDisplay(); // Refresh the display with new state
}

// Equals button to perform calculation
document.getElementById("equals").addEventListener("click", calculate);

// Update display during calculation
function updateDisplay() {
	if (previousNum && operation) {
		displayNum1.innerText = "";
		displayNum2.innerText = `${previousNum} ${operation} ${currentNum}`;
	} else {
		displayNum1.innerText = currentNum;
		displayNum2.innerText = "";
	}
}

//Keyboard support
document.addEventListener("keydown", function (e) {
	let key = e.key;
	if (!isNaN(key) || key === ".") {
		appendNumber(key);
		updateDisplay();
	} else if (key === "Backspace") {
		deleteNum();
		updateDisplay();
	} else if (key === "+" || key === "-" || key === "*" || key === "/") {
		chooseOperation(key);
		updateDisplay();
	} else if (key === "Enter" || key === "=") {
		calculate();
		updateDisplay();
	}
});
