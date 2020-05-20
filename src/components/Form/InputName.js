import React from 'react';
import Input from './Input';

const InputName = () => {
  let inputProps = {
    name: 'name',
    label: 'Your company name',
    required: false,
    placeholder: 'Type text',

    changeData: this.changeData,
    checkData: (data) => {},
  };
  return <Input />;
};
