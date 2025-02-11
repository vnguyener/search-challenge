import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import Alert from '@material-ui/lab/Alert';

import { getSelectedProfile, setSelectedProfile } from '../../core/store/actions/profiles';
import ProfileCard from '../../components/profile/card';
import LoadingCard from '../../components/profile/loading-card';
import './styles.scss';

const ProfilePage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const selectedProfile = useSelector((state) => state.profiles.selectedProfile);
  const selectedProfileError = useSelector((state) => state.profiles.selectedProfileError);
  const isProfileLoading = useSelector((state) => state.profiles.isProfileLoading);

  const { id } = params;

  useEffect(() => {
    dispatch(getSelectedProfile(id));

    // reset the selected profile to null to prevent any 'flicking' of the old profile on new profile loads
    return () => {
      dispatch(setSelectedProfile(null));
    };
  }, [dispatch, id]);

  const goToSearchPage = () => {
    dispatch(push('/'));
  };

  return (
    <main className="profile-container">
      <div className="back-button clickable" onClick={goToSearchPage}>
        <span className="material-icons">keyboard_arrow_left</span>
        &nbsp;
        <p>Back</p>
      </div>
      {selectedProfileError && <Alert severity="error">{selectedProfileError}</Alert>}
      {isProfileLoading && <LoadingCard />}
      {!isProfileLoading && !selectedProfileError && <ProfileCard profile={selectedProfile} />}
    </main>
  );
};

export default ProfilePage;
