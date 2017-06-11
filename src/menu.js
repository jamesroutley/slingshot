const constants = require('./constants');
const Stars = require('./stars');
const game = require('./game');
const Level = require('./level');
const levelsData = require('./levels');

const drawMenu = (p, centerX, stars) => {
  p.push();
  p.background('#102027');
  stars.draw(p);
  p.textAlign(p.LEFT);
  p.textSize(16);
  p.fill('#babdbe');
  p.text('PRESS [ 0 - 9 ] TO SELECT LEVEL:', 150, 150);
  p.text('[ 0 ] - NAME', 150, 200);
  p.text('[ 1 ] - NAME', 150, 225);
  p.text('[ 2 ] - NAME', 150, 250);
  p.text('[ 3 ] - NAME', 150, 275);
  p.text('[ 4 ] - NAME', 150, 300);
  p.text('[ 5 ] - NAME', 150, 325);
  p.text('[ 6 ] - NAME', 150, 350);
  p.text('[ 7 ] - NAME', 150, 375);
  p.text('[ 8 ] - NAME', 150, 400);
  p.text('[ 9 ] - NAME', 150, 425);
  p.pop();
};

const initMenu = (p) => {
  const stars = new Stars(constants.game.canvas.x, constants.game.canvas.y);
  const centerX = (constants.game.canvas.x / 2);
  p.setup = () => {
    p.frameRate(constants.frameRate);
    p.createCanvas(constants.game.canvas.x, constants.game.canvas.y);
    p.background('#102027');
  };
  p.draw = () => {
    drawMenu(p, centerX, stars);
  };
  p.keyPressed = () => {
    switch (p.key) {
      case '0':
        const level = new Level(levelsData[0]);
        game.constructView(p, level.start.bind(level));
        break;
      default:
        break;
    }
  };
};

module.exports = initMenu;
