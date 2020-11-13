import React, { useContext } from 'react';
import { ProfileContext } from '../../core/context/ProfilesContextProvider';
import MinimalButton from '../../components/shared/minimal-button';
import SearchCard from '../../components/search/card';
import styles from './styles';

const SearchPage = () => {
  const context = useContext(ProfileContext);
  const { profiles } = context;

  const handleSortAscending = () => {
    context.dispatch({ type: 'ascending' });
  };

  const handleSortDescending = () => {
    context.dispatch({ type: 'descending' });
  };

  return (
    <>
      <main style={styles.main}>
        <div style={styles.filterContainer}>
          <MinimalButton disabled>
            <img src="filter.svg" width={22} alt="filter" />
          </MinimalButton>

          <MinimalButton onClick={handleSortAscending}>
            <img src="./ascending.svg" width={22} alt="Sort ascending" />
          </MinimalButton>

          <MinimalButton onClick={handleSortDescending}>
            <img src="./descending.svg" width={22} alt="Sort descending" />
          </MinimalButton>
        </div>

        <div style={styles.profilesContainer}>
          {profiles.map((profile) => (
            <SearchCard
              key={profile.id}
              id={profile.id}
              photoUrl={profile.photoUrl}
              handle={profile.handle}
              location={profile.location}
              age={profile.age}
              photoCount={profile.photoCount}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default SearchPage;
