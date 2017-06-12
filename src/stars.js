const constants = require('./constants');
const colour = require('./colour');
const p5 = require('p5');

const randInRange = n => (
  Math.floor(Math.random() * n) + 1
);

class Stars {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    const numPositions = x * y;
    const numStars = Math.floor(numPositions * constants.stars.fillRatio);
    this.stars = [];
    for (let i = 0; i < numStars; i += 1) {
      this.stars.push(
        new p5.Vector(randInRange(x), randInRange(y)));
    }
    this.offset = 0;
  }

  draw(p) {
    p.fill(colour.yellow);
    if (p.frameCount % 2 === 0) {
      this.offset += 1;
    }
    this.stars.forEach((star) => {
      const x = (star.x + this.offset) % this.x;
      const y = (star.y + this.offset) % this.y;
      p.ellipse(x, y, 4);
    });
  }
}
module.exports = Stars;
