import React from 'react';
import SearchPage from './containers/search-page';
import ProfilesContextProvider from './core/context/ProfilesContextProvider';

import './styles.css';

function App() {
  return (
    <ProfilesContextProvider>
      <SearchPage />
    </ProfilesContextProvider>
  );
}

export default App;
