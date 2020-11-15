import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import profilesReducer from './profiles';

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    profiles: profilesReducer,
  });

export default rootReducer;
