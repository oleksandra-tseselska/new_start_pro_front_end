// Mentoring homework 2

var x = 10;
var obj = {
  x: 15,
};

function fun() {
  alert(this.x); 
  alert(this); 
}

fun();
fun.call(obj);


var person = {
  firstName:"John",
  lastName: "Konor",
  fullName: function() {

    return this.firstName + " " + this.lastName;
  }
}

var user = {
  firstName:"Max",
  lastName: "White",
}

let userFullName = person.fullName.bind(user);

console.log(userFullName());


var tester = function() {
  const arguments = Array.prototype.slice.call(someArray);

  alert(arguments);
};

const someArray = ["0", "1", "2", "length", "callee"];

tester.apply(null, someArray)

// через метод apply вызвать функцию и вернуть ["0", "1", "2", "length", "callee"]