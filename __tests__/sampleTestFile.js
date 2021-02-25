// // import React so you can use JSX (React.createElement) in your test
// import React from 'react';

// /*
//  * render: lets us render the component (like how React would)
//  * screen: Your utility for finding elements the same way the user does
//  **/
// import { render, screen } from '@testing-library/react';

// test('test title', () => {
// // Your tests come here...
// });

// sample test
//   test('has correct welcome text', () => {
//     render(<Welcome firstName="John" lastName="Doe" />)
//     expect(screen.getByRole('heading')).toHaveTextContent('Welcome, John Doe')
//   })

const sum = require('../sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
