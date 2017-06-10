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
    this.totalFuel = 1800;
    this.fuel = this.totalFuel;
    // TODO: move these to constants.js
    this.width = 6;
    this.length = 10;
    this.mass = 100000;
    this.rocketForcePerS = 10000000;
  }

  boost() {
    // TODO: reimplement this using p5.Vector.fromAngle()
    // and scalar multiplying it by the force.
    // Force vector initially points up (0, -1)
    if (this.fuel <= 0) {
      this.stopBoost();
      console.log('no fuel');
      return;
    }
    const force = new p5.Vector(
      0, -this.rocketForcePerS / constants.frameRate);
    // Rotate it to match direction of spaceship
    force.rotate(this.rotation);
    this.booster_a = physics.acceleration(force, this.mass);
    this.fuel -= 1;
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

  handleKeyPress(p) {
    if (!p.keyIsPressed) {
      this.stopBoost();
      return;
    }
    switch (p.key) {
      case ' ':
        this.boost();
        break;
      case 'a':
        // TODO: move rotation to constants
        this.rotation -= 0.1;
        break;
      case 'd':
        this.rotation += 0.1;
        break;
      default:
        break;
    }
  }

  draw(p) {
    this.handleKeyPress(p);
    this.move();
    p.fill('#babdbe');
    p.translate(this.pos.x, this.pos.y);
    p.rotate(this.rotation);
    p.rect(-3, -5, this.width, this.length, 2);
    // TODO: move this logic into boost() ?
    if (p.keyIsPressed && p.key === ' ' && this.fuel > 0) {
      p.fill('#ff8a65');
      p.rect(-3, 4, 6, 3);
    }
  }
}

module.exports = SpaceShip;
