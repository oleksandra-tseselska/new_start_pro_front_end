const add = require('./add');
const sub = require('./sub');
const mult = require('./mult');
const div = require('./div');

function Calculator() {

  this.add = add.add;
  this.sub = sub.sub;
  this.mult = mult.mult;
  this.div = div.div;
};

module.exports = {calculator: new Calculator};
