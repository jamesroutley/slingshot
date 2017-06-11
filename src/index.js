const game = require('./game');
// const initSplash = require('./splash');
const initMenu = require('./menu');
const p5 = require('p5');

new p5(initMenu, 'gameCanvas');
