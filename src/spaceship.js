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
    // TODO: move these to constants.js
    this.mass = 100000;
    this.rocketForcePerS = 10000000;
  }

  boost() {
    const force = new Vector(0, -this.rocketForcePerS / constants.frameRate);
    this.booster_a = physics.acceleration(this.booster_a, force, this.mass);
  }

  stopBoost() {
    this.booster_a = new Vector(0, 0);
  }

  calculateForces() {
    // console.log(this.planets)
    const force = physics.forceFromPlanets(this.pos, this.planets);
    console.log(force);
    return force;
  }

  move() {
    this.a = physics.acceleration(this.a, this.calculateForces());
    const total_a = this.a.add(this.booster_a);
    this.v = physics.velocity(this.v, total_a);
    this.pos = physics.position(this.pos, this.v);
  }

  draw(p) {
    // console.log(this.pos);
    if (p.keyIsPressed === true && p.key === ' ') {
      this.boost();
    } else {
      this.stopBoost();
    }
    this.move();
    p.fill('#babdbe');
    p.rect(this.pos.x, this.pos.y, 5, 10, 2);
  }
}


module.exports = SpaceShip;
