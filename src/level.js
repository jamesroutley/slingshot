const constants = require('./constants');
const collide = require('./collide');
const Checkpoint = require('./checkpoint');
const p5 = require('p5');
const SpaceShip = require('./spaceship');
const Planet = require('./planet');
const HUD = require('./hud');
const Stars = require('./stars');

const handleCollisions = (ship, planets, checkpoint) => {
  if (collide.shipCircle(ship, checkpoint)) {
    console.log('game won');
  }
  if (collide.shipPlanets(ship, planets)) {
    console.log('game over');
  }
};

class Level {
  constructor(data) {
    this.data = data;
    this.p = null;

    this.drawables = [];
    const stars = new Stars(700, 720);
    this.drawables.push(stars);

    this.planets = this.data.planets.map(planet => (
      new Planet(new p5.Vector(planet.pos.x, planet.pos.y), planet.r)
    ));
    this.drawables = this.drawables.concat(this.planets);

    this.spaceship = new SpaceShip(new p5.Vector(20, 690), this.planets);
    this.drawables.push(this.spaceship);

    const hud = new HUD(this.spaceship);
    this.drawables.push(hud);

    this.checkpoint = new Checkpoint(new p5.Vector(670, 30), 20);
    this.drawables.push(this.checkpoint);
  }

  start(p) {
    this.p = p;
    p.setup = () => {
      p.frameRate(constants.frameRate);
      p.createCanvas(constants.game.canvas.x, constants.game.canvas.y);
      p.background('#102027');
    };
    p.draw = () => {
      p.background('#102027');
      handleCollisions(this.spaceship, this.planets, this.checkpoint);
      this.drawables.forEach((drawable) => {
        p.push();
        drawable.draw(p);
        p.pop();
      });
    };
  }
}

module.exports = Level;
