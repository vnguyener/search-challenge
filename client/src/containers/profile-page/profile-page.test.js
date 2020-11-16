import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configure } from 'enzyme';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';
import ProfilePage from '.';

configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

describe('profile page container', () => {
  it('renders correctly', () => {
    const store = mockStore({
      profiles: {
        selectedProfile: {
          photoUrl: 'https://placeimg.com/200/200/people?id=1',
          handle: 'dave',
          location: 'dallas',
          age: 24,
          photoCount: 0,
          id: 123,
        },
      },
    });
    const history = createMemoryHistory();
    history.push('/profiles/123');

    const wrapper = renderer
      .create(
        <Provider store={store}>
          <Router history={history}>
            <ProfilePage />
          </Router>
        </Provider>
      )
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
