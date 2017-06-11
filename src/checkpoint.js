

class Checkpoint {
  constructor(pos, r) {
    this.pos = pos;
    this.rendered_r = r;
  }

  draw(p) {
    p.fill('#9a0007');
    p.ellipse(this.pos.x, this.pos.y, this.rendered_r);
  }
}

module.exports = Checkpoint;
