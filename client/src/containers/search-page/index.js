import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfilesList, sortProfileList } from '../../core/store/actions/profiles';
import MinimalButton from '../../components/shared/minimal-button';
import SearchCard from '../../components/search/card';
import styles from './styles';

const SearchPage = () => {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profiles.profilesList);

  useEffect(() => {
    dispatch(getProfilesList());
  }, [dispatch]);

  const handleSortAscending = () => {
    dispatch(sortProfileList('ascending'));
  };

  const handleSortDescending = () => {
    dispatch(sortProfileList('descending'));
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
          {profiles && profiles.length > 0 ? (
            profiles.map((profile) => (
              <SearchCard
                key={profile.id}
                id={profile.id}
                photoUrl={profile.photoUrl}
                handle={profile.handle}
                location={profile.location}
                age={profile.age}
                photoCount={profile.photoCount}
              />
            ))
          ) : (
            <p>no results</p>
          )}
        </div>
      </main>
    </>
  );
};

export default SearchPage;
