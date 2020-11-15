import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/layout/header';
import './styles.css';

// pages
import { SearchPage, ProfilePage, NotFoundPage } from './containers';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={SearchPage} />
        <Route exact path="/profile/:id" component={ProfilePage} />
        <Route exact path="/*" component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
