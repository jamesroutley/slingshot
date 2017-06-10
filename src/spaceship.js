const constants = require('./constants');
const physics = require('./physics');
const p5 = require('p5');

class SpaceShip {
  constructor(pos, planets) {
    this.pos = pos;
    this.planets = planets;
    this.v = new p5.Vector(0, 0);
    this.a = new p5.Vector(0, 0);
    this.booster_a = new p5.Vector(0, 0);
    this.rotation = 0;
    // TODO: move these to constants.js
    this.mass = 100000;
    this.rocketForcePerS = 10000000;
  }

  boost() {
    // Force vector initially points up (0, -1)
    const force = new p5.Vector(
      0, -this.rocketForcePerS / constants.frameRate);
    // Rotate it to match direction of spaceship
    force.rotate(this.rotation);
    this.booster_a = physics.acceleration(force, this.mass);
  }

  stopBoost() {
    this.booster_a = new p5.Vector(0, 0);
  }

  calculateForces() {
    const force = physics.forceFromPlanets(this.pos, this.planets);
    return force;
  }

  move() {
    this.a = physics.acceleration(this.calculateForces(), this.mass);
    const total_a = this.a.add(this.booster_a);
    this.v = physics.velocity(this.v, total_a);
    this.pos = physics.position(this.pos, this.v);
  }

  draw(p) {
    if (p.keyIsPressed === true && p.key === ' ') {
      this.boost();
    } else {
      this.stopBoost();
    }
    this.move();
    p.fill('#babdbe');
    p.translate(this.pos.x, this.pos.y);
    p.rotate(this.rotation);
    p.rect(0, 0, 5, 10, 2);
  }
}

module.exports = SpaceShip;
