const constants = {
  game: {
    canvas: {
      x: 1240,
      y: 700,
    },
    frameRate: 30,
  },
  planet: {
    earthDensity: 5520,  // kg/m^3
    neutronStarDensity: 10e8,
  },
  gravitational: 6.67408e-11,  // https://en.wikipedia.org/wiki/Gravitational_constant
  scale: 100000,  // render 100000m as 1 p5 unit
  stars: {
    fillRatio: 0.0001,
  },
};

module.exports = constants;
