import { simpleCalculator, Action } from './index';

const testCases = [
  { input: { a: -3, b: 7, action: Action.Add }, expected: 4 },
  { input: { a: 9, b: 4, action: Action.Subtract }, expected: 5 },
  { input: { a: -3, b: 7, action: Action.Multiply }, expected: -21 },
  { input: { a: -3, b: 15, action: Action.Divide }, expected: -0.2 },
  { input: { a: 10, b: -1, action: Action.Exponentiate }, expected: 0.1 },
  { input: { a: -3, b: 7, action: '%' }, expected: null },
  { input: { a: '3', b: [0], action: Action.Add }, expected: null },
];

describe('simpleCalculator', () => {
  testCases.forEach(({ input, expected }) => {
    test(`should return ${expected} for a = ${input.a}, b = ${input.b} and action = ${input.action}`, () => {
      expect(simpleCalculator(input)).toBe(expected);
    });
  });
});
