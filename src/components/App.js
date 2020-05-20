import React from 'react';
import Title from './Title';
import Stages from './Stages';
import Form from './Form/Form';

import '../assets/sass/style.sass';

const App = () => {
  return (
    <div className="app">
      <div className="container">
        <Title text="Your first project" />
        <Stages count={3} active={3} />
        <Form />
      </div>
    </div>
  );
};

export default App;
