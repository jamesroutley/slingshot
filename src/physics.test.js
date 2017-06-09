const physics = require('./physics');
const Planet = require('./planet');
const Vector = require('./vector');

test('acceleration', () => {
  const force = new Vector(100, 0);
  const initialAcceleration = new Vector(0, 0);
  const mass = 10;
  const acceleration = physics.acceleration(initialAcceleration, force, mass);
  expect(acceleration).toEqual(new Vector(10, 0));
});

test('gravForce', () => {
  const force = physics.gravForce(100, 100000);
  expect(force).toEqual(6.674080000000001e-10);
});

test('forceFromPlanet', () => {
  const pos = new Vector(0, 0);
  const planet = new Planet(new Vector(100, 0), 10);
  planet.mass = 100000;  // Fake planet's mass for easier maths
  const force = physics.forceFromPlanet(pos, planet);
  expect(force).toEqual(new Vector(-6.674080000000001e-10, 0));
});

test('forceFromPlanets', () => {
  const pos = new Vector(0, 0);
  const planetA = new Planet(new Vector(100, 0), 10);
  const planetB = new Planet(new Vector(-100, 0), 10);
  planetA.mass = 100000;  // Fake planetA's mass for easier maths
  planetB.mass = 100000;  // Fake planetB's mass for easier maths
  const force = physics.forceFromPlanets(pos, [planetA, planetB]);
  expect(force).toEqual(new Vector(0, 0));
});
