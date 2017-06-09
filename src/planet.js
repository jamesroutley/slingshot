const constants = require('./constants');


class Planet {
  constructor(pos, r) {
    this.pos = pos;
    this.r = r;
    this.rendered_r = r / 100000;
    // model mass as if planet is 3D, even though it's rendered in 2D
    this.mass = constants.planet.density * ((4 / 3) * Math.PI * (this.r ** 3));
  }

  draw(p) {
    p.fill('#ff8a65');
    p.ellipse(this.pos.x, this.pos.y, this.rendered_r);
  }
}

module.exports = Planet;
