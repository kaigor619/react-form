import React from 'react';
import classnames from 'classnames';

const Stages = ({ count, active }) => {
  let components = [];
  let props = {};

  for (let i = 1; i <= count; i++) {
    props = {
      number: i,
    };
    if (active === i) {
      props['active'] = true;
    }

    components.push(<StageNumber key={i + Math.random()} {...props} />);
    if (count !== i) components.push(<StageLine key={i + Math.random()} />);
  }
  return (
    <div className="row">
      <div className="col-12">
        <div className="form_stages">{components}</div>
      </div>
    </div>
  );
};

const StageNumber = ({ active, number }) => {
  let classNames = classnames('stage_number', { active });
  return <div className={classNames}>{number}</div>;
};
const StageLine = () => {
  return <div className="stage_line"></div>;
};

export default Stages;
