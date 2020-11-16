import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import MinimalButton from 'components/shared/minimal-button';

const NotFoundPage = () => {
  const dispatch = useDispatch();

  const goToSearchPage = () => {
    dispatch(push('/'));
  };

  return (
    <>
      <div>
        <h2>404</h2>
        <p>Oops, looks like you're lost.</p>
        <MinimalButton onClick={goToSearchPage}>Back to Results</MinimalButton>
      </div>
    </>
  );
};

export default NotFoundPage;
