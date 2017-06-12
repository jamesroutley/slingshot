const colour = require('./colour');

class HUD {
  constructor(spaceship) {
    this.spaceship = spaceship;
  }

  drawFuelBar(p) {
    p.push();
    const fuelPercent = Math.floor(
      (this.spaceship.fuel / this.spaceship.totalFuel) * 100);
    // p.translate(55, 20);
    p.fill(colour.grey);
    p.rect(5, 5, 110, 20);
    p.fill(colour.orange);
    p.rect(10, 10, fuelPercent, 10);
    p.pop();
  }

  draw(p) {
    this.drawFuelBar(p);
  }
}

module.exports = HUD;
