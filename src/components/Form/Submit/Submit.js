import React from 'react';
import './Submit.sass';

const Submit = ({ text }) => {
  return (
    <button type="submit" className="submit" id="submit">
      {text}
    </button>
  );
};

export default Submit;
