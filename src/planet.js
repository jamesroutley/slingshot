const constants = require('./constants');
const physics = require('./physics');
const p5 = require('p5');

class Planet {
  constructor(data) {
    this.pos = data.pos;
    this.r = data.r;
    this.rendered_r = this.r / constants.scale;
    this.density = data.density;
    // model mass as if planet is 3D, even though it's rendered in 2D
    this.mass = this.density * ((4 / 3) * Math.PI * (this.r ** 3));
    this.v = data.v;
    this.colour = data.colour;
  }

  move() {
    this.pos = physics.position(this.pos, this.v);
  }

  draw(p) {
    this.move();
    p.fill(this.colour);
    p.ellipse(this.pos.x, this.pos.y, this.rendered_r);
  }
}

module.exports = Planet;
