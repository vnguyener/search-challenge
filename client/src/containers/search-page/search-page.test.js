import React from 'react';
import { Provider } from 'react-redux';
import { configure } from 'enzyme';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';
import SearchPage from '.';

configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

describe('search page container', () => {
  it('renders correctly', () => {
    const store = mockStore({
      profiles: {
        profilesList: [],
      },
    });

    const wrapper = renderer
      .create(
        <Provider store={store}>
          <SearchPage />
        </Provider>
      )
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
