import React from 'react';
import classnames from 'classnames';

const getKey = () => {
  return Math.random().toFixed(3);
};

const Stages = ({ count, active }) => {
  let components = [];
  let props = {};

  for (let i = 1; i <= count; i++) {
    props = { number: i };
    if (active === i) props['active'] = true;

    components.push(<StageNumber key={getKey()} {...props} />);
    if (count !== i) components.push(<StageLine key={getKey()} />);
  }
  return <div className="form_stages">{components}</div>;
};

const StageNumber = ({ active, number }) => {
  let classNames = classnames('stage_number', { active });
  return <div className={classNames}>{number}</div>;
};

const StageLine = () => {
  return <div className="stage_line"></div>;
};

export default Stages;
