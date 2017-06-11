const constants = require('./constants');
const p5 = require('p5');

const constructView = (oldP5, viewInitialiser) => {
  oldP5.remove();
  new p5(viewInitialiser, 'gameCanvas');
};

module.exports = {
  constructView,
};
