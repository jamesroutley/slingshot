const collide = require('./collide');
const SpaceShip = require('./spaceship');
const Planet = require('./planet');
const p5 = require('p5');

test('shipPlanetTrue', () => {
  const ship = new SpaceShip(new p5.Vector(0, 0), []);
  const planet = new Planet(new p5.Vector(0, 0), 10);
  const hit = collide.shipPlanet(ship, planet);
  expect(hit).toBe(true);
});

test('shipPlanetFalse', () => {
  const ship = new SpaceShip(new p5.Vector(100, 0), []);
  const planet = new Planet(new p5.Vector(0, 0), 10);
  const hit = collide.shipPlanet(ship, planet);
  expect(hit).toBe(false);
});

test('shipPlanetsTrue', () => {
  const ship = new SpaceShip(new p5.Vector(0, 0), []);
  const planetA = new Planet(new p5.Vector(0, 0), 10);
  const planetB = new Planet(new p5.Vector(100, 0), 10);
  const hit = collide.shipPlanets(ship, [planetA, planetB]);
  expect(hit).toBe(true);
});

test('shipPlanetsFalse', () => {
  const ship = new SpaceShip(new p5.Vector(0, 0), []);
  const planetA = new Planet(new p5.Vector(-100, 0), 10);
  const planetB = new Planet(new p5.Vector(100, 0), 10);
  const hit = collide.shipPlanets(ship, [planetA, planetB]);
  expect(hit).toBe(false);
});
