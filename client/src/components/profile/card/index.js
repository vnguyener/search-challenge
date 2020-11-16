import React from 'react';
import './styles.scss';

const ProfileCard = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="card-container">
      <img className="resp-media" src={profile.photoUrl} alt="Profile Main" />
      <div className="header-context-container">
        <div className="description">
          <p className="label">
            {profile.age} &#xb7; {profile.location || 'N/A'}
          </p>
        </div>
      </div>
      {profile.photoCount > 0 && (
        <div className="header-context-container clickable">
          <span className="photo-description material-icons">photo_library</span>
          <p className="icon-badge">{profile.photoCount}</p>
        </div>
      )}
      <div className="body-context-container">
        <h2 className="body-header">
          <p className="link">{profile.handle}</p>
        </h2>
      </div>
    </div>
  );
};

export default ProfileCard;
