import React from 'react';
import classnames from 'classnames';

const StageNumber = ({ active, number }) => {
  let classNames = classnames('stage_number', { active });
  return <div className={classNames}>{number}</div>;
};

export default StageNumber;
