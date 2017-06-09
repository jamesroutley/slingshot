const constants = require('./constants');
const Vector = require('./vector');

const dt = 1 / constants.frameRate;

const acceleration = (previous_a, force, mass) => (
  new Vector(previous_a.x + (force.x * dt / mass), previous_a.y + (force.y * dt / mass))
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
  const distance = pos.subtract(planet.pos);
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
