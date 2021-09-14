import React from 'react';
import renderer from 'react-test-renderer';

import Button from './Button';

test('Button renders', () => {
  const component = renderer.create(
    <Button>Button</Button>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
