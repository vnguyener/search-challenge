import React from 'react';
import './styles.scss';

const MinimalButton = ({ children, onClick, propStyles, ...props }) => (
  <button {...props} onClick={onClick} style={{ ...propStyles }} className="minimal-button">
    {children}
  </button>
);

export default MinimalButton;
