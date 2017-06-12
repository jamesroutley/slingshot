const constants = require('./constants');
const colour = require('./colour');
const collide = require('./collide');
const Checkpoint = require('./checkpoint');
const p5 = require('p5');
const SpaceShip = require('./spaceship');
const Planet = require('./planet');
const HUD = require('./hud');
const Stars = require('./stars');
const levelsData = require('./levels');

const constructView = (oldP5, viewInit) => {
  oldP5.remove();
  new p5(viewInit, 'gameCanvas');
};

class View {
  constructor() {
    this.p;
    this.size = new p5.Vector(
      constants.game.canvas.x, constants.game.canvas.y,
    );
    this.stars = new Stars(this.size.x, this.size.y);
    this.centerX = (this.size.x / 2);
  }

  setupP5() {
    this.p.frameRate(constants.game.frameRate);
    this.p.createCanvas(this.size.x, this.size.y);
    this.p.background(colour.darkGrey);
  }

  draw() {
    console.error('Inheriting classes must implement draw()');
  }

  keyPressed() {}

  start(p) {
    this.p = p;
    this.p.setup = this.setupP5.bind(this);
    this.p.draw = this.draw.bind(this);
    this.p.keyPressed = this.keyPressed.bind(this);
  }
}

class Win extends View {
  constructor(levelNum) {
    super();
    this.levelNum = levelNum;
  }

  draw() {
    const p = this.p;
    p.background(colour.darkGrey);
    this.stars.draw(p);
    p.textAlign(p.CENTER);
    p.textFont('Audiowide');
    p.textSize(72);
    p.fill(colour.orange);
    p.text('-------------', this.centerX, 240);
    p.text('LEVEL', this.centerX, 300);
    p.text('COMPLETE', this.centerX, 360);
    p.text('-------------', this.centerX, 420);
    p.textFont('Open Sans');
    p.textSize(16);
    p.fill(colour.grey);
    p.text('[ R: REPLAY - M: MENU ]', this.centerX, 500);
  }

  keyPressed() {
    // XXX: Circular dependency: Menu -> Level -> Win -> Menu.
    // Javascript doesn't hoist classes, but it does hoist functions.
    // By wrapping the Menu class initialiser in a function, we instantiate
    // it before it is defined.
    if (this.p.key === 'M') {
      const menuStart = getMenuStart();
      constructView(this.p, menuStart);
    }
    if (this.p.key === 'R') {
      const levelStart = getLevelStart(this.levelNum);
      constructView(this.p, levelStart);
    }
  }
}

class Lose extends View {
  constructor(levelNum) {
    super();
    this.levelNum = levelNum;
  }

  draw() {
    const p = this.p;
    p.background(colour.darkGrey);
    this.stars.draw(p);
    p.textAlign(p.CENTER);
    p.textFont('Audiowide');
    p.textSize(72);
    p.fill(colour.orange);
    p.text('-------------', this.centerX, 240);
    p.text('LEVEL', this.centerX, 300);
    p.text('FAILED', this.centerX, 360);
    p.text('-------------', this.centerX, 420);
    p.textFont('Open Sans');
    p.textSize(16);
    p.fill(colour.grey);
    p.text('[ R: REPLAY - M: MENU ]', this.centerX, 500);
  }

  keyPressed() {
    // XXX: Circular dependency: Menu -> Level -> Win -> Menu.
    // Javascript doesn't hoist classes, but it does hoist functions.
    // By wrapping the Menu class initialiser in a function, we instantiate
    // it before it is defined.
    if (this.p.key === 'M') {
      const menuStart = getMenuStart();
      constructView(this.p, menuStart);
    }
    if (this.p.key === 'R') {
      const levelStart = getLevelStart(this.levelNum);
      constructView(this.p, levelStart);
    }
  }
}

class Level extends View {
  constructor(levelNum, data) {
    super();
    this.levelNum = levelNum;
    this.data = data;
    // this.p = null;

    this.drawables = [];

    this.drawables.push(this.stars);

    this.planets = this.data.planets.map(planet => (new Planet(planet)));
    this.drawables = this.drawables.concat(this.planets);

    this.spaceship = new SpaceShip(
      this.data.spaceship.pos, this.planets, this.data.spaceship.fuel);
    this.drawables.push(this.spaceship);

    const hud = new HUD(this.spaceship);
    this.drawables.push(hud);

    this.checkpoint = new Checkpoint(new p5.Vector(1210, 30), 20);
    this.drawables.push(this.checkpoint);
  }

  handleCollisions(ship, planets, checkpoint) {
    if (collide.shipCircle(ship, checkpoint)) {
      const win = new Win();
      constructView(this.p, win.start.bind(win));
    }
    if (collide.shipPlanets(ship, planets)) {
      const lose = new Lose();
      constructView(this.p, lose.start.bind(lose));
    }
  }

  draw() {
    const p = this.p;
    p.background(colour.darkGrey);
    this.handleCollisions(this.spaceship, this.planets, this.checkpoint);
    this.drawables.forEach((drawable) => {
      p.push();
      drawable.draw(p);
      p.pop();
    });
  }

  keyPressed() {
    if (this.p.key === 'M') {
      const menuStart = getMenuStart();
      constructView(this.p, menuStart);
    }
    if (this.p.key === 'R') {
      const level = new Level(this.levelNum, levelsData[this.levelNum]);
      constructView(this.p, level.start.bind(level));
    }
  }
}

const getLevelStart = (levelNum) => {
  // XXX: Same hack as getMenuStart.
  const level = new Level(levelNum, levelsData[levelNum]);
  constructView(this.p, level.start.bind(level));
};

class Menu extends View {
  constructor() {
    super();
    this.numLevels = levelsData.length;
  }
  draw() {
    const p = this.p;
    p.push();
    p.background(colour.darkGrey);
    this.stars.draw(p);
    p.textAlign(p.LEFT);
    p.textSize(16);
    p.fill(colour.grey);
    p.text(`PRESS [ 0 - ${this.numLevels - 1} ] TO SELECT LEVEL:`, 150, 150);
    for (let i = 0; i < this.numLevels; i += 1) {
      p.text(`[ ${i} ] - NAME`, 150, 200 + (i * 25));
    }
    p.pop();
  }

  keyPressed() {
    const numLevels = levelsData.length;
    const num = parseInt(this.p.key, 10);
    if (isNaN(num)) {
      return;
    }
    if (num >= numLevels) {
      return;
    }
    const level = new Level(num, levelsData[num]);
    constructView(this.p, level.start.bind(level));
  }
}

const getMenuStart = () => {
  // XXX: Circular dependency: Menu -> Level -> Win/Lose -> Menu.
  // Javascript doesn't hoist classes, but it does hoist functions.
  // By wrapping the Menu class initialiser in a function, we instantiate
  // it before it is defined.
  const menu = new Menu();
  return menu.start.bind(menu);
};

class Splash extends View {
  draw() {
    const p = this.p;
    p.push();
    p.background(colour.darkGrey);
    this.stars.draw(p);

    p.textAlign(p.CENTER);
    p.textFont('Audiowide');
    p.textSize(72);
    p.fill(colour.orange);
    p.text('-------------', this.centerX, 240);
    p.text('SLINGSHOT', this.centerX, 300);
    p.text('-------------', this.centerX, 360);

    p.textFont('Open Sans');
    p.textSize(24);
    p.text('AN INTERPLANETARY PHYSICS GAME', this.centerX, 400);

    p.textSize(16);
    p.fill(colour.grey);
    p.text('[ PRESS SPACE TO START ]', this.centerX, 500);

    p.pop();
  }

  keyPressed() {
    if (this.p.key === ' ') {
      const menu = new Menu();
      constructView(this.p, menu.start.bind(menu));
    }
  }
}

module.exports = {
  Splash,
  Level,
};
