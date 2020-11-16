import React from 'react';
import renderer from 'react-test-renderer';

import Header from '.';

describe('layour header component', () => {
  it('renders correctly', () => {
    const element = renderer.create(<Header />).toJSON();
    expect(element).toMatchSnapshot();
  });
});
