import React from 'react';

const Title = ({ text }) => {
  return (
    <div className="row">
      <div className="col-12">
        <h1 className="app_title">{text}</h1>
      </div>
    </div>
  );
};

export default Title;
