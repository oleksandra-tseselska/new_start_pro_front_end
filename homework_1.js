'use strict'

const obj = {
  prop: '42',
  prop2: [8, 9, 10, {
    beautifulPropertyName: 88,
    'property with spaces': {
      a: {
        b: '',
        c: {
          someProperty: [{
            'prop name': 'I am a smart programmer',
          }],
        },
      },
    },
  }],
  prop3: function() {
    return {
      baz: 'Hello',
      bar: {
        anotherBeautifulProp: [8, {
          target: 'It was simple!',
        }],
      },
    };
  }
};

console.log(obj.prop2[3]['property with spaces'].a.c.someProperty[0]['prop name']);
console.log(obj.prop3().bar.anotherBeautifulProp[1].target);


// Homework 2

let numArr = [100, 7000, 10, 8000, 20, 8001, 1000, 30, 2000, 40, 50];

let maxNum = numArr.reduce(function max(result, num){
  var max = (result > num) ? result : num;
  return max;
}) 
console.log(maxNum);


function max(arr) {
  if (arr.length === 1) {
    return arr[0];
  };

  var possMaxOne = arr.shift();
  var possMaxTwo = max(arr);
  
  if (possMaxOne > possMaxTwo) {
    return possMaxOne;
  };
  return possMaxTwo;
}

console.log(max([100, 7000, 10, 8000, 20, 8001, 1000, 30, 2000, 40, 50]));
console.log(max([8]), 'one element test, must return 8');
console.log(max([1, 8, 37, 5, 17]), '5 elements test, must return 37');
console.log(max([8, 17]), '2 elements test, must return 17');

console.log('--/--/--/--/--');


// Mentoring homework 1

const wizards = [
  {
      name: 'Harry Potter',
      house: 'Gryfindor'
  },
  {
      name: 'Cedric Diggory',
      house: 'Hufflepuff'
  },
  {
      name: 'Tonks',
      house: 'Hufflepuff'
  },
  {
      name: 'Ronald Weasley',
      house: 'Gryfindor'
  },
  {
      name: 'Hermione Granger',
      house: 'Gryfindor'
  }];

  let nameMastersHufflepuff = wizards.reduce(function MastersHufflepuff(result, name){
    if(name.house === 'Hufflepuff') {
      result.push(name.name);
    }

    return result;
  }, []);

  console.log(nameMastersHufflepuff);

  console.log('--/--/--/--/--');

  
// Nomework 3

function createCalculator(someNum) {
  if (isNumber(someNum) !== true) {
    return NaN;
  }
  function isNumber(validNum) {
    return typeof validNum === 'number';
  };
  
  return {
    add: (addNum) => isNumber(addNum) ? someNum += addNum : NaN ,
    sub: (takeAwayNum) => isNumber(takeAwayNum) ? someNum -= takeAwayNum : NaN,
    set: (newNum) => isNumber(newNum) ? someNum = newNum : NaN,
    get: () => someNum,
  };
};

const calculator = createCalculator(100);

console.log(createCalculator('100'), 'NaN и значение 100 не менять');

console.log(calculator.add(10), '110');
console.log(calculator.add(10), '120');
console.log(calculator.sub(20), '100');
console.log(calculator.sub('20'), 'NaN');

console.log(calculator.set(20), '20');
console.log(calculator.set('20'), 'NaN и значение 20 не менять');
console.log(calculator.add(10), '30');
console.log(calculator.add(10), '40');

console.log(calculator.add('qwe'), 'NaN и значение 40 не менять');
console.log(calculator.add(true), 'NaN и значение 40 не менять');
console.log(calculator.add(1953565346364098n), 'NaN и значение 40 не менять');
console.log(createCalculator('100'), 'NaN и значение 40 не менять');

console.log(calculator.get(), '40');

console.log('--/--/--/--/--');


// Homework OOP Calk

function Calculator(base) {
  this.base = base,

  this.add = function(num) {
    return this.isNumber(num) ? this.base += num : NaN;
  }
  this.sub = function(num) {
    return this.isNumber(num) ? this.base -= num : NaN;
  }
  this.set = function(num) {
    return this.isNumber(num) ? this.base = num : NaN;
  }
  this.get = function() {
    return this.base;
  }
  this.isNumber = function(validNum) {
    return typeof validNum === 'number';
  }
};


// Homework Hamburger

function Hamburger(type) {
  this.price = type.price;
  this.calories = type.calories;
};

Hamburger.SIZE_SMALL = {
  price: 50,
  calories: 20,
};
Hamburger.SIZE_MIDDLE = {
  price: 75,
  calories: 30,
};
Hamburger.SIZE_BIG = {
  price: 100,
  calories: 40,
};

Hamburger.TOPPING_CHEESE = {
  price: 10,
  calories: 20,
};
Hamburger.TOPPING_SALAD = {
  price: 20,
  calories: 5,
};
Hamburger.TOPPING_POTATO = {
  price: 15,
  calories: 10,
}
Hamburger.TOPPING_SEASONING = {
  price: 15,
  calories: 0,
};
Hamburger.TOPPING_MAYO = {
  price: 20,
  calories: 5,
};

Hamburger.prototype.getPrice = function() { 
  return this.price;
};
Hamburger.prototype.getCalories = function() {
  return this.calories;
};
Hamburger.prototype.addTopping = function(topping) {
  this.price = this.price + topping.price;
  this.calories = this.calories + topping.calories;
};

const hamburger = new Hamburger(Hamburger.SIZE_SMALL);

hamburger.addTopping(Hamburger.TOPPING_MAYO);
hamburger.addTopping(Hamburger.TOPPING_POTATO);

console.log(`Price with sauce: ${hamburger.getPrice()}`);
console.log(`Calories with sauce: ${hamburger.getCalories()}`);



// Homework polyfill. And group of students

Array.prototype.max = function() {
  if (this.length === 1) {
    return this[0];
  };

  let possMaxOne = this.shift();
  let possMaxTwo = max(this);
  
  if (possMaxOne > possMaxTwo) {
    return possMaxOne;
  };

  return possMaxTwo;
};

[6, 5, 8, 7].max();


class Group {
  #students;

  constructor() {
    this.#students = [];
  }

  addStudent(student) {
    if(this.#isStudent(student)) {
      this.#students.push(student);
    }
  }

  get students() {
    return this.#students;
  }

  #isStudent(student) {
    return student instanceof Student;
  }

  getAverageMark() {
    let groupSumMark = 0;
  
    for(let student of this.#students) {
      const studentAverageMark = student.getAverageMark();

      groupSumMark += studentAverageMark;
    }
    
    const groupAverageMark = groupSumMark / this.#students.length;

    return groupAverageMark;
  }
}

class Student {
  constructor(name, mark) {
    this.name = name;
    this.mark = mark;
  } 

  getAverageMark() {
    const marksSum = this.mark.reduce((sum, mark) => sum + mark, 0);

    if (!marksSum) {
      return 0;
    }

    return marksSum / this.mark.length;
  }
}

const group = new Group();

group.addStudent(new Student('John', [10, 8]));
group.addStudent(new Student('Alex', [10, 9]));
group.addStudent(new Student('Bob', [6, 10]));

console.log(group.students.length === 3);
group.addStudent({});
console.log(group.students.length === 3);

console.log(group.getAverageMark() === (10 + 8 + 10 + 9 + 6 + 10) / 6); // 8.83
