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
