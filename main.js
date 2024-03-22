const display = document.getElementById("display");

// appends numbers and operators to the display area when user clicks buttons on the calculator
function appendToDisplay(input) {
	display.value += input;
}
// resets and clears the entire display when 'AC' button is pressed
function clearDisplay() {
	display.value = "";
}

function calculate() {}

// function calculate() {
// 	try {
// 		display.value = eval(display.value);
// 	} catch (error) {
// 		display.value = "Error";
// 	}
// }

// deletes the last key entered when 'DEL' button is pressed
function deleteNum() {
	display.value = display.value.slice(0, -1);
}
