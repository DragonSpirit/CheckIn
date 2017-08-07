import React from 'react';
import App from '../App';
import Launch from '../components/Launch'

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});

it('should had all components on initial view', () => {
  const rendered = renderer.create(<Launch />).toJSON();
  expect(rendered.children.length).toEqual(4);
});

it('should contains initial text', () => {
  const matchedText = 'Initial Page, choose your action';
  const rendered = renderer.create(<Launch />).toJSON();
  expect(rendered.children[0].children[0]).toEqual(matchedText);
});
