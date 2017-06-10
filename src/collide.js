const p5 = require('./p5.collide2d');

const shipPlanet = (ship, planet) => (
  // XXX: not sure if accessing colideRectCircle via prototype is best
  // practice.
  p5.prototype.collideRectCircle(
    ship.pos.x, ship.pos.y, ship.width, ship.length,
    planet.pos.x, planet.pos.y, planet.rendered_r,
  )
);

const shipPlanets = (ship, planets) => (
  planets.some(planet => shipPlanet(ship, planet))
);

module.exports = {
  shipPlanet,
  shipPlanets,
};
