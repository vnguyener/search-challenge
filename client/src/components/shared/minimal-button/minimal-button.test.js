import React from 'react';
import renderer from 'react-test-renderer';

import MinimalButton from '.';

describe('minimal button component', () => {
  it('renders correctly', () => {
    const element = renderer.create(<MinimalButton />).toJSON();
    expect(element).toMatchSnapshot();
  });
});
