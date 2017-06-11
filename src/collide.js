const p5 = require('./p5.collide2d');

const shipCircle = (ship, circle) => (
  // XXX: not sure if accessing colideRectCircle via prototype is best
  // practice.
  p5.prototype.collideRectCircle(
    ship.pos.x, ship.pos.y, ship.width, ship.length,
    circle.pos.x, circle.pos.y, circle.rendered_r,
  )
);

const shipPlanets = (ship, planets) => (
  planets.some(planet => shipCircle(ship, planet))
);

module.exports = {
  shipCircle,
  shipPlanets,
};
