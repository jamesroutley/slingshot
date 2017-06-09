const Vector = require('./vector');

test('add', () => {
  const v1 = new Vector(0, 1);
  const v2 = new Vector(1, 2);
  expect(v1.add(v2)).toEqual(new Vector(1, 3));
});

test('subtract', () => {
  const v1 = new Vector(0, 1);
  const v2 = new Vector(1, 2);
  expect(v1.subtract(v2)).toEqual(new Vector(-1, -1));
});

test('abs', () => {
  const v = new Vector(3, 4);
  expect(v.abs()).toBe(5);
});

test('normalise', () => {
  const v = new Vector(3, 4);
  expect(v.normalise()).toEqual(new Vector(3 / 5, 4 / 5));
  expect(v.normalise().abs()).toBe(1);
});

test('scalarMultiply', () => {
  const v = new Vector(1, 1);
  expect(v.scalarMultiply(5)).toEqual(new Vector(5, 5));
});

test('scalarMultiply', () => {
  const v = new Vector(-1, 0);
  expect(v.scalarMultiply(6.674e-10)).toEqual(new Vector(-6.674e-10, 0));
});
