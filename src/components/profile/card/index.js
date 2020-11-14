import React from 'react';
import styles from './styles';

const ProfileCard = ({ profile }) => {
  if (!profile) return null;

  return (
    <div style={styles.card}>
      <img style={styles.img} src={profile.photoUrl} alt="Profile Main" />
      <div style={styles.header}>
        <div style={styles.description}>
          <p style={styles.label}>
            {profile.age} &#xb7; {profile.location || 'N/A'}
          </p>
        </div>
      </div>
      {profile.photoCount > 0 && (
        <div style={styles.header} class="clickable">
          <span style={styles.photoDescription} className="material-icons">
            photo_library
          </span>
          <p className="icon-badge">{profile.photoCount}</p>
        </div>
      )}
      <div style={styles.content}>
        <h2 style={styles.heading}>
          <p style={styles.link}>{profile.handle}</p>
        </h2>
      </div>
    </div>
  );
};

export default ProfileCard;
