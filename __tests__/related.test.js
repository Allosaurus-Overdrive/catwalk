import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Related from '../client/components/related/related';

afterEach(cleanup);

describe('Test function', () => {
  it('Should subtract one number from another', () => {
    expect(Related.testFunc(2, 1)).toBe(1);
  });
});