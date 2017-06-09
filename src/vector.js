/**
 * Vector implements a somewhat immutable 2D vector.
 */
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  subtract(v) {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  normalise() {
    const abs = this.abs();
    return new Vector(this.x / abs, this.y / abs);
  }

  abs() {
    return Math.sqrt((this.x ** 2) + (this.y ** 2));
  }

  scalarMultiply(scalar) {
    return new Vector(this.x * scalar, this.y * scalar);
  }
}

module.exports = Vector;
