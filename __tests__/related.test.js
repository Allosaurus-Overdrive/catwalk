import { testFunc } from '../client/components/related/related';

describe('Test function', () => {
  it('Should subtract one number from another', () => {
    expect(testFunc(2, 1)).toBe(1);
  });
});