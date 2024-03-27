"use strict";
// Declare variables 
const displayNum1 = document.getElementById("first-operand");
const displayNum2 = document.getElementById("second-operand");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const clearBtn = document.getElementById("clear");
const deleteBtn = document.getElementById("delete");
const dotBtn = document.getElementById("dot");
const equalsBtn = document.getElementById("equals");

// Displays digits when clicked
digits.forEach(button => {
	button.addEventListener("click", () => {
		appendNumber(button.innerText);
		updateDisplay();
	});
});

// Displays operators when clicked
operators.forEach(button => {
	button.addEventListener("click", () => {
		chooseOperation(button.innerText);
		updateDisplay();
	});
});

// Event listeners for operator buttons
clearBtn.addEventListener("click", clearDisplay);
deleteBtn.addEventListener("click", deleteNum);
dotBtn.addEventListener("click", appendDot);
equalsBtn.addEventListener("click", calculate);

// Variables to store the current operation and operands
let currentNum = "";
let previousNum = "";
let operation = null;

// Clear Display Function
function clearDisplay() {
	currentNum = "";
	previousNum = "";
	operation = null;
	updateDisplay();
}

// Delete Function
function deleteNum() {
	currentNum = currentNum.toString().slice(0, -1);
	updateDisplay();
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
		case '%':
			result = (num1 / 100) * num2;
			break;
		default:
			return;
	}
	console.log("num1:", num1);
	console.log("num2:", num2);

	currentNum = result;
	operation = undefined;
	previousNum = "";
	updateDisplay(); // Refresh the display with new state
}

// Handle decimal point input
function appendDot() {
	if (currentNum.includes(".")) return; // Prevent multiple decimals
	if (currentNum === "") currentNum = "0"; // If empty, start with '0.'
	currentNum += ".";
	updateDisplay();
}

function appendNumber(number) {
	if (number === "." && currentNum.includes(".")) return; //Prevent multiple decimals
	currentNum = currentNum.toString() + number.toString();
}

//
function chooseOperation(selectedOperation) {
	if (currentNum === "") return;
	if (previousNum !== "") {
		calculate();
	}
	operation = selectedOperation;
	previousNum = currentNum;
	currentNum = "";
}

// Update Display Function
function updateDisplay() {
	if (previousNum && operation) {
		document.getElementById("first-operand").innerText = "";
		document.getElementById(
			"second-operand"
		).innerText = `${previousNum} ${operation} ${currentNum}`;
	} else {
		document.getElementById("first-operand").innerText = currentNum;
		document.getElementById("second-operand").innerText = "";
	}
}

// Keyboard support
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
