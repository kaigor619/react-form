import React from 'react';
import './Error.sass';

const Error = ({ text }) => {
  return <p className="input_error active">{text}</p>;
};

export default Error;
