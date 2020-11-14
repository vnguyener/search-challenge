import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ProfileCard from '../../components/profile/card';
import profiles from '../../profiles.json';
import styles from './styles';

const ProfilePage = () => {
  const params = useParams();
  const history = useHistory();

  const [selectedProfile, setSelectedProfile] = useState(null);
  const { id } = params;

  useEffect(() => {
    const profile = profiles.find((p) => p.id === parseInt(id));
    setSelectedProfile(profile);
  }, [id]);

  const goToSearchPage = () => {
    history.push('/');
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
