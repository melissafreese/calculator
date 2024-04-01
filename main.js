"use strict";

const displayNum1 = document.getElementById("displayNum1");
const displayNum2 = document.getElementById("displayNum2");

// Display selected number when a number button is clicked
document.querySelectorAll(".numbers").forEach(button => {
	button.addEventListener("click", () => {
		appendNumber(button.innerText);
		updateDisplay();
	});
});

// Display selected operator when an operator button is clicked
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

// Display decimal point and limits decminal points to one per operand
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

// Add digits to current number on the display
function appendNumber(number) {
	currentNum = currentNum.toString() + number.toString();
	updateDisplay();
}

// Handle selection of arithmatic operation
function chooseOperation(selectedOperation) {
	if (currentNum === "") return;
	if (previousNum !== "") {
		calculate();
	}
	operation = selectedOperation;
	previousNum = currentNum;
	currentNum = "";
}

// Delete most recently added number or operator
document.addEventListener("click", function (e) {
	if (e.target.id == "deleteBtn") {
		currentNum = currentNum.toString().slice(0, -1);
		updateDisplay();
	}
});

// Clear Display
document.addEventListener("click", function (e) {
	if (e.target.id == "clearBtn") {
		currentNum = "";
		previousNum = "";
		operation = null;
		updateDisplay();
	}
});

// Perform calculation
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

	// Round result
	const roundedResult = result.toFixed(2);

	currentNum = roundedResult;
	operation = undefined;
	previousNum = "";
	updateDisplay();
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

// Keyboard support
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
