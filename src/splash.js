const constants = require('./constants');
const Stars = require('./stars');
const game = require('./game');
const initMenu = require('./menu');

const drawSplash = (p, centerX, stars) => {
  p.push();
  p.background('#102027');
  stars.draw(p);
  p.textAlign(p.CENTER);
  if (p.frameCount > 40) {
    p.textFont('Audiowide');
    p.textSize(72);
    p.fill('#ff8a65');
    p.text('-------------', centerX, 240);
    p.text('SLINGSHOT', centerX, 300);
    p.text('-------------', centerX, 360);
  }
  if (p.frameCount > 80) {
    p.textFont('Open Sans');
    p.textSize(24);
    p.text('AN INTERPLANETARY PHYSICS GAME', centerX, 400);
  }
  if (p.frameCount > 120) {
    p.textSize(16);
    p.fill('#babdbe');
    p.text('[ PRESS ANY KEY TO START ]', centerX, 500);
  }
  p.pop();
};

const initSplash = (p) => {
  const stars = new Stars(constants.game.canvas.x, constants.game.canvas.y);
  const centerX = (constants.game.canvas.x / 2);
  p.setup = () => {
    p.frameRate(constants.frameRate);
    p.createCanvas(constants.game.canvas.x, constants.game.canvas.y);
    p.background('#102027');
  };
  p.draw = () => {
    drawSplash(p, centerX, stars);
  };
  p.keyPressed = () => {
    game.constructView(p, initMenu);
  };
};

module.exports = initSplash;
