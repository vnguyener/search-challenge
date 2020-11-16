import React from 'react';
import renderer from 'react-test-renderer';

import ProfileCard from '.';

describe('profile card component', () => {
  it('renders correctly', () => {
    const element = renderer.create(<ProfileCard />).toJSON();
    expect(element).toMatchSnapshot();
  });
});
