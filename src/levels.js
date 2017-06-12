const p5 = require('p5');
const colour = require('./colour');
const constants = require('./constants');

const levels = [
  // Level 0
  // Multiple small planets
  {
    planets: [
      {
        pos: new p5.Vector(300, 500),
        r: 15000000,  // meters
        density: constants.planet.earthDensity,
        v: new p5.Vector(0, 0),
        colour: colour.blue,
      },
      {
        pos: new p5.Vector(600, 250),
        r: 30000000,  // meters
        density: constants.planet.earthDensity,
        v: new p5.Vector(0, 0),
        colour: colour.green,
      },
      {
        pos: new p5.Vector(1000, 400),
        r: 20000000,  // meters
        density: constants.planet.earthDensity,
        v: new p5.Vector(0, 0),
        colour: colour.orange,
      },
    ],
    spaceship: {
      pos: new p5.Vector(20, 680),
      fuel: 10,
    },
  },
  // Level 1
  // Small planet very close
  {
    planets: [
      {
        pos: new p5.Vector(100, 600),
        r: 15000000,  // meters
        density: constants.planet.earthDensity,
        v: new p5.Vector(0, 0),
        colour: colour.green,
      },
    ],
    spaceship: {
      pos: new p5.Vector(20, 680),
      fuel: 5,
    },
  },
  // Level 2
  // Large planet in corner, limited fuel
  {
    planets: [
      {
        pos: new p5.Vector(
          constants.game.canvas.x, constants.game.canvas.y,
        ),
        r: 70000000,  // meters
        density: constants.planet.earthDensity,
        v: new p5.Vector(0, 0),
        colour: colour.orange,
      },
    ],
    spaceship: {
      pos: new p5.Vector(20, 680),
      fuel: 5,
    },
  },
  // Level 3 - maybe get rid of this one?
  // Large planet middle top
  {
    planets: [
      {
        pos: new p5.Vector(
          600, 100,
        ),
        r: 70000000,  // meters
        density: constants.planet.earthDensity,
        v: new p5.Vector(0, 0),
        colour: colour.blue,
      },
    ],
    spaceship: {
      pos: new p5.Vector(20, 680),
      fuel: 10,
    },
  },
  // Level 4
  // A neutron star
  {
    planets: [
      {
        pos: new p5.Vector(
          600, 350,
        ),
        r: 1000000,  // meters
        density: constants.planet.neutronStarDensity,
        v: new p5.Vector(0, 0),
        colour: colour.purple,
      },
    ],
    spaceship: {
      pos: new p5.Vector(20, 680),
      fuel: 20,
    },
  },
  // Level 6
  // A moving neutron star
  {
    planets: [
      {
        pos: new p5.Vector(
          500, 700,
        ),
        r: 1000000,  // meters
        density: constants.planet.neutronStarDensity,
        v: new p5.Vector(0, -20),
        colour: colour.purple,
      },
    ],
    spaceship: {
      pos: new p5.Vector(900, 680),
      fuel: 3,
    },
  },
];

module.exports = levels;
