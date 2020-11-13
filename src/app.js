import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/layout/header';

import ProfilesContextProvider from './core/context/ProfilesContextProvider';
import './styles.css';

// pages
import { SearchPage, ProfilePage, NotFoundPage } from './containers';

function App() {
  return (
    <>
      <Header />
      <ProfilesContextProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={SearchPage} />
            <Route exact path="/profile/:id" component={ProfilePage} />
            <Route exact path="/*" component={NotFoundPage} />
          </Switch>
        </BrowserRouter>
      </ProfilesContextProvider>
    </>
  );
}

export default App;
