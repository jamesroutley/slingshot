const constants = require('./constants');
const Vector = require('./vector');

const dt = 1 / constants.frameRate;

const acceleration = (force, mass) => (
  new Vector((force.x / mass), (force.y / mass))
);

const velocity = (previous_v, a) => (
  new Vector(previous_v.x + (a.x * dt), previous_v.y + (a.y * dt))
);

const position = (previous_pos, v) => (
  new Vector(previous_pos.x + (v.x * dt), previous_pos.y + (v.y * dt))
);

const gravForce = (distance, planetMass) => (
  constants.gravitational * (planetMass / (distance ** 2))
);

const forceFromPlanet = (pos, planet) => {
  // TODO: multiplying by 1000 is an arbitrary constant to improve performance.
  // Fix this at some point
  const distance = planet.pos.subtract(pos).scalarMultiply(1000);
  const absForce = gravForce(distance.abs(), planet.mass);
  const force = distance.normalise().scalarMultiply(absForce);
  return force;
};

const forceFromPlanets = (pos, planets) => {
  const forces = planets.map(planet => forceFromPlanet(pos, planet));
  const force = forces.reduce((total, f) => total.add(f), new Vector(0, 0));
  return force;
};

module.exports = {
  acceleration,
  velocity,
  position,
  gravForce,
  forceFromPlanet,
  forceFromPlanets,
};
