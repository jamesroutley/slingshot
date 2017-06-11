const Splash = require('./view');
const p5 = require('p5');

const splash = new Splash();
new p5(splash.start.bind(splash), 'gameCanvas');
