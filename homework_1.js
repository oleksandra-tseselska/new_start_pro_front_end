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