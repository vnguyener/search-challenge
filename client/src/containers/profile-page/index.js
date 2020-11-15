import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { getSelectedProfile } from '../../core/store/actions/profiles';
import ProfileCard from '../../components/profile/card';
import styles from './styles';

const ProfilePage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const selectedProfile = useSelector((state) => state.profiles.selectedProfile);
  const { id } = params;

  useEffect(() => {
    dispatch(getSelectedProfile(id));
  }, [dispatch, id]);

  const goToSearchPage = () => {
    dispatch(push('/'));
  };

  return (
    <>
      <div className="clickable" style={styles.backButton} onClick={goToSearchPage}>
        <span className="material-icons" style={styles.icon}>
          keyboard_arrow_left
        </span>
        &nbsp;
        <p>Back</p>
      </div>
      <ProfileCard profile={selectedProfile} />
    </>
  );
};

export default ProfilePage;
