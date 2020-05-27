import React from 'react';
import Field from '../Field';
import InputFile from '../FieldFile';
import Submit from '../Submit';
import './Form.sass';

const FormComponent = ({ fieldsProps, onSubmit }) => {
  const { name, number, business, description, file } = fieldsProps;
  return (
    <form action="" className="form" id="form" onSubmit={onSubmit}>
      <div className="flex_wrap">
        <Field {...name} />
        <Field {...number} />
      </div>
      <Field {...business} />
      <Field {...description} />
      <InputFile {...file} />
      <Submit text="Submit" />
    </form>
  );
};

export default FormComponent;
