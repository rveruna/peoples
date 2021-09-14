import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import Expansion from './Expansion';
import '@testing-library/jest-dom';

test('Expansion renders', () => {
  const component = renderer.create(
    <Expansion headerOpen='View more' headerClose='Show less'>
      Content
    </Expansion>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Expansion content shows', () => {
  const { getByText, queryByText } = render(
    <Expansion headerOpen='View more' headerClose='Show less'>
      Content
    </Expansion>
  );
  fireEvent.click(getByText('View more'));
  expect(queryByText('Content')).toBeTruthy();
});
