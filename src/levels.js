const p5 = require('p5');
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
      },
      {
        pos: new p5.Vector(600, 250),
        r: 30000000,  // meters
        density: constants.planet.earthDensity,
      },
      {
        pos: new p5.Vector(1000, 400),
        r: 20000000,  // meters
        density: constants.planet.earthDensity,
      },
    ],
    spaceship: {
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
      },
    ],
    spaceship: {
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
      },
    ],
    spaceship: {
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
      },
    ],
    spaceship: {
      fuel: 10,
    },
  },
  // Level 4 - maybe get rid of this one? Too difficult?
  // Large planet center of screen
  {
    planets: [
      {
        pos: new p5.Vector(
          600, 350,
        ),
        r: 65000000,  // meters
        density: constants.planet.earthDensity,
      },
    ],
    spaceship: {
      fuel: 10,
    },
  },
  // Level 5
  {
    planets: [
      {
        pos: new p5.Vector(
          600, 350,
        ),
        r: 65000000,  // meters
      },
    ],
  },
];

module.exports = levels;
