// Get the display element
const display = document.getElementById("display");

// Variables to store the current operation and operands ????
let currentInput = "";
let operation = null;
let firstOperand = "";
let secondOperand = "";

// Append Display Function
function appendToDisplay(input) {
	display.value += input;
}
// Clear Display Function
function clearDisplay() {
	display.value = "";
}

// Delete Function
function deleteNum() {
	display.value = display.value.slice(0, -1);
}

// Set Operation Function ????
function setOperation(op) {
	operation = op;
	currentInput = `${op}`;
	display.value = currentInput;
}

// Calculate Function ???
function calculate() {
	const [firstOperand, _, secondOperand] = currentInput.split("");
	let result;

	switch (currentInput) {
		case "+":
			result = parseFloat(firstOperand) + parseFloat(secondOperand);
			break;

		case "-":
			result = parseFloat(firstOperand) - parseFloat(secondOperand);
			break;

		case "*":
			result = parseFloat(firstOperand) * parseFloat(secondOperand);
			break;
		case "/":
			result = parseFloat(firstOperand) / parseFloat(secondOperand);
			break;
	}

	display.value = result;
	currentInput = `${result}`;
	operation = null;
}

// Keyboard support for number entry and delete button
document.addEventListener("keydown", function (e) {
	let key = e.key;
	if (key === "Backspace") {
		return deleteNum();
	} else {
		return appendToDisplay(`${key}`);
	}
});
