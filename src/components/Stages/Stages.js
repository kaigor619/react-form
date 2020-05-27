import React from 'react';
import StageNumber from './StageNumber';
import StageLine from './StageLine';
import './Stages.sass';

const getKey = () => {
  return Math.random().toFixed(3);
};

const Stages = ({ count, active }) => {
  let components = [];
  let props = {};

  for (let i = 1; i <= count; i++) {
    props = { number: i, active: active === i };
    components.push(<StageNumber key={getKey()} {...props} />);
    if (count !== i) components.push(<StageLine key={getKey()} />);
  }

  return <div className="stages">{components}</div>;
};

export default Stages;
