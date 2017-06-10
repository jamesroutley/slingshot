const constants = require('./constants');
const p5 = require('p5');

const randInRange = n => (
  Math.floor(Math.random() * n) + 1
);

class Stars {
  constructor(x, y) {
    const numPositions = x * y;
    const numStars = Math.floor(numPositions * constants.stars.fillRatio);
    this.stars = [];
    for (let i = 0; i < numStars; i += 1) {
      this.stars.push(
        new p5.Vector(randInRange(x), randInRange(y)));
    }
  }

  draw(p) {
    this.stars.forEach((star) => {
      p.ellipse(star.x, star.y, 4);
    });
  }
}
module.exports = Stars;
