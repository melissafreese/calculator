const display = document.getElementById("display");

// appends numbers and operators to the display area when user clicks buttons on the calculator
function appendToDisplay(input) {
	display.value += input;
}
// resets and clears the entire display when 'AC' button is pressed
function clearDisplay() {
	display.value = "0";
}

// function calculate() {
// 	try {
// 		display.value = eval(display.value);
// 	} catch (error) {
// 		display.value = "Error";
// 	}
// }

// function deleteNum(num) {
// 	display.value = num.slice;
// }
