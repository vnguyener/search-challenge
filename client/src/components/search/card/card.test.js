import React from 'react';
import { Provider } from 'react-redux';
import { configure } from 'enzyme';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';
import SearchCard from '.';

configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

describe('search card component', () => {
  it('renders correctly', () => {
    const store = mockStore();

    const wrapper = renderer
      .create(
        <Provider store={store}>
          <SearchCard />
        </Provider>
      )
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
