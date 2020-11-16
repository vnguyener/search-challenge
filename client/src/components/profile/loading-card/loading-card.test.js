import React from 'react';
import renderer from 'react-test-renderer';

import LoadingCard from '.';

describe('profile loading card component', () => {
  it('renders correctly', () => {
    const element = renderer.create(<LoadingCard />).toJSON();
    expect(element).toMatchSnapshot();
  });
});
