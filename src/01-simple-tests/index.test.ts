import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: -3, b: 7, action: Action.Add })).toBe(4);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 9, b: 4, action: Action.Subtract })).toBe(5);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: -3, b: 7, action: Action.Multiply })).toBe(
      -21,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: -3, b: 15, action: Action.Divide })).toBe(
      -0.2,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({ a: 10, b: -1, action: Action.Exponentiate }),
    ).toBe(0.1);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: -3, b: 7, action: '%' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '3', b: [0], action: Action.Add })).toBeNull();
  });
});
