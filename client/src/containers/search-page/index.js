import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';
import { getProfilesList, sortProfileList } from '../../core/store/actions/profiles';
import MinimalButton from '../../components/shared/minimal-button';
import SearchCard from '../../components/search/card';
import styles from './styles';

const SearchPage = () => {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profiles.profilesList);
  const isListLoading = useSelector((state) => state.profiles.isListLoading);

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

          <MinimalButton
            onClick={handleSortAscending}
            disabled={!isListLoading || !profiles || profiles.length === 0}
          >
            <img src="./ascending.svg" width={22} alt="Sort ascending" />
          </MinimalButton>

          <MinimalButton
            onClick={handleSortDescending}
            disabled={!isListLoading || !profiles || profiles.length === 0}
          >
            <img src="./descending.svg" width={22} alt="Sort descending" />
          </MinimalButton>
        </div>

        <div style={styles.profilesContainer}>
          {isListLoading &&
            [...new Array(10)].map((item, index) => (
              <div style={styles.skeletonContainer}>
                <Skeleton key={index} style={styles.skeleton} />
              </div>
            ))}
          {!isListLoading &&
            profiles &&
            profiles.length > 0 &&
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
            ))}
        </div>
        {!isListLoading && (!profiles || profiles.length === 0) && (
          <p style={styles.noResults}>We're sorry, but there are no results to show.</p>
        )}
      </main>
    </>
  );
};

export default SearchPage;
