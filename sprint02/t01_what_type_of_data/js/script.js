let num = 123;
let bigIntVal = 1234567890123456789012345678901234567890n;
let str = "Hello, JavaScript!";
let bool = true;
let n = null;
let undef = undefined;
let obj = {};
let sym = Symbol('unique');
let func = function() { return "I'm a function!"; };

// Виведення типів даних
alert(`num is ${typeof num}
bigIntVal is ${typeof bigIntVal}
str is ${typeof str}
bool is ${typeof bool}
n is ${typeof n}
undef is ${typeof undef}
obj is ${typeof obj}
sym is ${typeof sym}
func is ${typeof func}`);
