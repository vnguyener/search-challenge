import React from 'react';
import styles from './styles';

const MinimalButton = ({ children, onClick, propStyles, ...props }) => (
  <button {...props} onClick={onClick} style={{ ...styles.button, ...propStyles }}>
    {children}
  </button>
);

export default MinimalButton;
