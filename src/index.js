const p5 = require('p5');
const SpaceShip = require('./spaceship');
const constants = require('./constants');
const collide = require('./collide');
const levels = require('./levels');
const Planet = require('./planet');
const HUD = require('./hud');
const Stars = require('./stars');

const gameOver = () => {
  console.log('game over');
};

const handleCollisions = (ship, planets) => {
  if (collide.shipPlanets(ship, planets)) {
    gameOver();
  }
};

const game = (p) => {
  // Maybe this should be move to p.setup()?
  let drawables = [];
  const stars = new Stars(700, 720);
  drawables.push(stars);
  const planets = levels['01'].planets.map(planet => (
    new Planet(new p5.Vector(planet.pos.x, planet.pos.y), planet.r)
  ));
  drawables = drawables.concat(planets);
  const spaceship = new SpaceShip(new p5.Vector(20, 690), planets);
  drawables.push(spaceship);
  const hud = new HUD(spaceship);
  drawables.push(hud);

  p.setup = () => {
    p.frameRate(constants.frameRate);
    // p.createCanvas(1280, 720);
    p.createCanvas(700, 720);
    p.background('#102027');
  };

  p.draw = () => {
    p.background('#102027');
    handleCollisions(spaceship, planets);
    drawables.forEach((drawable) => {
      p.push();
      drawable.draw(p);
      p.pop();
    });
    p.fill('#ffecb3');
    p.ellipse(100, 100, 4);
  };
};

new p5(game);
