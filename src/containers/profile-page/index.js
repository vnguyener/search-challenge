import React from 'react';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const params = useParams();
  const { id } = params;
  return (
    <>
      <p>profile placeholder for profile {id}</p>
    </>
  );
};

export default ProfilePage;
