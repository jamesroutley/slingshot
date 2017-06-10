const constants = require('./constants');
const physics = require('./physics');
const Vector = require('./vector');

class SpaceShip {
  constructor(pos, planets) {
    this.pos = pos;
    this.planets = planets;
    this.v = new Vector(0, 0);
    this.a = new Vector(0, 0);
    this.booster_a = new Vector(0, 0);
    this.rotation = Math.PI;
    // TODO: move these to constants.js
    this.mass = 100000;
    this.rocketForcePerS = 10000000;
  }

  boost() {
    // const absForce = -this.rocketForcePerS / constants.frameRate;
    // const direction = new Vector(
    //   Math.sin(this.rotation), Math.cos(this.rotation),
    // ).normalise();
    // const force = direction.scalarMultiply(absForce);
    const force = new Vector(0, -this.rocketForcePerS / constants.frameRate);
    this.booster_a = physics.acceleration(force, this.mass);
  }

  stopBoost() {
    this.booster_a = new Vector(0, 0);
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
