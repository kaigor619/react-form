import React from 'react';
import Title from '../Title/Title';
import Stages from '../Stages/Stages';
import Form from '../Form';
import fields from '../../data/form';

import './App.sass';

const App = () => {
  return (
    <div className="app">
      <div className="container">
        <Title text="Your first project" />
        <Stages count={3} active={3} />
        <Form fields={fields} />
      </div>
    </div>
  );
};

export default App;
