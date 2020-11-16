import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import MinimalButton from 'components/shared/minimal-button';
import './styles.scss';

const NotFoundPage = () => {
  const dispatch = useDispatch();

  const goToSearchPage = () => {
    dispatch(push('/'));
  };

  return (
    <main className="not-found-container">
      <h2>404</h2>
      <p>Oops, looks like you're lost.</p>
      <MinimalButton
        onClick={goToSearchPage}
        propStyles={{
          textTransform: 'uppercase',
          border: '1px solid',
          padding: '12px',
          borderRadius: '8px',
        }}
      >
        Back to Results
      </MinimalButton>
    </main>
  );
};

export default NotFoundPage;
