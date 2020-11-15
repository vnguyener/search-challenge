import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import styles from './styles';

const SearchCard = ({
  photoUrl = '',
  handle = '',
  location = '',
  age = 99,
  photoCount = 0,
  id = 0,
}) => {
  const dispatch = useDispatch();

  const goToProfile = (id) => {
    dispatch(push(`/profile/${id}`));
  };

  return (
    <div style={styles.card}>
      <div style={styles.boxShadow}>
        <div className="clickable" style={styles.avatar} onClick={() => goToProfile(id)}>
          <img src={photoUrl} alt="potential date"></img>
          <div
            style={{
              position: 'absolute',
              width: '100%',
              bottom: '0',
              borderRadius: 'inherit',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                margin: 8,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                position: 'relative',
              }}
            >
              <div
                style={{
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <h6 style={{ fontSize: '16px ' }}>
                  <div style={{ display: 'flex', marginBottom: '4px', alignItems: 'center' }}>
                    {handle}
                  </div>
                </h6>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      marginBottom: '4px',
                      alignItems: 'center',
                    }}
                  >
                    <span>{location ? `${age} • ${location}` : age}</span>
                  </div>
                  <div style={{ display: 'inline-block', height: '15px' }}>
                    {photoCount > 1 && (
                      <div>
                        <div style={{ marginRight: '4px' }}>
                          <span color="white">{photoCount}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
