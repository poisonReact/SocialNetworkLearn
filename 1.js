
var numbers = document.querySelectorAll('.num');
var operators = document.querySelectorAll('.operator');
var clears = document.querySelectorAll('.clears');
var point = document.getElementById('bpoint');
var result = document.getElementById('bequally');
var pm = document.getElementById('bpm');
var display = document.getElementById('field');
var memoryCurrentNumber = 0;
var memoryNewNumber = false;
var memoryPendingOperation = '';

document.getElementById('field').setAttribute('disabled', 'disabled');


for (var i = 0; i < numbers.length; i++) {
	var number = numbers[i];
	number.addEventListener("click", function (e) {
	numberPress(e.target.value);
	});
};


for (var i = 0; i < operators.length; i++) {
	var operator = operators[i];
	operator.addEventListener("click", function (e) {
	operatorPress(e.target.value);
    });	
};

for (var i = 0; i < clears.length; i++) {
	var clear = clears[i];
	clear.addEventListener("click", function (e) {
	clearPress(e.srcElement.id)
	});
};

point.addEventListener("click", pointPress);



pm.addEventListener("click", pmPress);




function numberPress(number) {
	if (memoryNewNumber) {
		display.value = number;
	    memoryNewNumber = false;
	} else {
		if (display.value === '0') {
            display.value = number;
		} else {
		    display.value += number;
		};
	};	
};
	

function operatorPress(op) {
	var localOperationMemory = display.value;
	
	
	if (memoryNewNumber && memoryPendingOperation !== '=') {
		display.value = memoryCurrentNumber;
	} else { 
		memoryNewNumber = true;
		if (memoryPendingOperation === '+') {
			memoryCurrentNumber += parseFloat(localOperationMemory);
		} else if (memoryPendingOperation === '-') {
			memoryCurrentNumber -= parseFloat(localOperationMemory);
		} else if (memoryPendingOperation === '*') {
			memoryCurrentNumber *= parseFloat(localOperationMemory);
        } else if (memoryPendingOperation === '/') {
			memoryCurrentNumber /= parseFloat(localOperationMemory);	
		} else {
			memoryCurrentNumber = parseFloat(localOperationMemory);
		}
		
	   display.value = memoryCurrentNumber
	   memoryPendingOperation = op
	};	
};

function clearPress(id) {
	if (id === 'bce') {
		display.value = '0';
		memoryNewNumber = true;
	} else if (id === 'bc') {
		display.value = '0';
		memoryNewNumber = true;
		memoryCurrentNumber = 0;
		memoryPendingOperation = '';
	} else if (id === 'bback') {
		display.value = display.value.slice(0, -1);
	}

};

function pointPress() {
	var localPointMemory = display.value;
	
	if (memoryNewNumber) {
		localPointMemory = '0.';
		memoryNewNumber = false;
	} else {
		if (localPointMemory.indexOf('.') === -1) {
			localPointMemory += '.';
		}
	};	
	display.value = localPointMemory;
};


function pmPress() {
	console.log('клик по кнопке плюсминус')
};




















/*



b0.addEventListener("click", zero);
b1.addEventListener("click", one);
b2.addEventListener("click", two);
b3.addEventListener("click", three);
b4.addEventListener("click", four);
b5.addEventListener("click", five);
b6.addEventListener("click", six);
b7.addEventListener("click", seven);
b8.addEventListener("click", eight);
b9.addEventListener("click", nine);
bplus.addEventListener("click", plus);
bback.addEventListener("click", backspace);
bpoint.addEventListener("click", point);
bequally.addEventListener("click", equally);


var a = [];



 document.getElementById('field').setAttribute('disabled', 'disabled');

function zero() {
	document.getElementById('field').value += '0'
};

function one() {
	document.getElementById('field').value += '1'
};

function two() {
	document.getElementById('field').value += '2'
};

function three() {
	document.getElementById('field').value += '3'
};

function four() {
	document.getElementById('field').value += '4'
};

function five() {
	document.getElementById('field').value += '5'
};

function six() {
	document.getElementById('field').value += '6'
};

function seven() {
	document.getElementById('field').value += '7'
};

function eight() {
	document.getElementById('field').value += '8'
};

function nine() {
	document.getElementById('field').value += '9'
};

function backspace() {
	document.getElementById('field').value = document.getElementById('field').value.slice(0, -1)
};

function point() {
	if (document.getElementById('field').value.search( /,/i ) == -1) {
		document.getElementById('field').value += ','
	} else {
		document.getElementById('field').value = document.getElementById('field').value
	}
}

function plus() {
	a.push(document.getElementById('field').value);
	a.push('+');
}
function equally() {
	document.getElementById('field').value = eval(document.getElementById('field').value)
};



/* только цифры для инпут

document.getElementsByTagName('input')[0].onkeypress = function(e) {

      e = e || event;

      if (e.ctrlKey || e.altKey || e.metaKey) return;

      var chr = getChar(e);

      // с null надо осторожно в неравенствах, т.к. например null >= '0' => true!
      // на всякий случай лучше вынести проверку chr == null отдельно
      if (chr == null) return;

      if (chr < '0' || chr > '9') {
        return false;
      }

    }

    function getChar(event) {
      if (event.which == null) {
        if (event.keyCode < 32) return null;
        return String.fromCharCode(event.keyCode) // IE
      }

      if (event.which != 0 && event.charCode != 0) {
        if (event.which < 32) return null;
        return String.fromCharCode(event.which) // остальные
      }

      return null; // специальная клавиша
    }




document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
	if(e.keyCode == 96 || e.keyCode == 48) {
        zero();
    }
	else if(e.keyCode == 97 || e.keyCode == 49) {
        one();
    }
	else if(e.keyCode == 98 || e.keyCode == 50) {
        two();
    }
	else if(e.keyCode == 99 || e.keyCode == 51) {
        three();
    }
	else if(e.keyCode == 100 || e.keyCode == 52) {
        four();
    }
	else if(e.keyCode == 101 || e.keyCode == 53) {
        five();
    }
	else if(e.keyCode == 102 || e.keyCode == 54) {
        six();
    }
	else if(e.keyCode == 103 || e.keyCode == 55) {
        seven();
    }
	else if(e.keyCode == 104 || e.keyCode == 56) {
        eight();
    }
	else if(e.keyCode == 105 || e.keyCode == 57) {
        nine();
    }
	
}


*/
