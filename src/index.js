const view = require('./view');
const p5 = require('p5');

const splash = new view.Splash();
new p5(splash.start.bind(splash), 'gameCanvas');


// For level testing only:
// const levelsData = require('./levels');

// const levelNum = 4;
// const level = new view.Level(levelNum, levelsData[levelNum]);
// new p5(level.start.bind(level), 'gameCanvas');
