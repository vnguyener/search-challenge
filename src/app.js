import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import ProfilesContextProvider from './core/context/ProfilesContextProvider';
import './styles.css';

// pages
import { SearchPage, ProfilePage, NotFoundPage } from './containers';

function App() {
  const history = createBrowserHistory();

  return (
    <ProfilesContextProvider>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={SearchPage} />
          <Route exact path="/profile/:id" component={ProfilePage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Router>
    </ProfilesContextProvider>
  );
}

export default App;
