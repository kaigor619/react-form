import React, { Component } from 'react';
import Input from './Input';
import InputFile from './InputFile';
import Submit from './Submit';

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.changeData = this.changeData.bind(this);
    this.checkData = this.checkData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // filling state
    let state = {};
    let { fields } = this.props;
    for (let key in fields) {
      if (fields[key]['required']) state[key] = '';
    }
    this.state = state;
  }

  UNSAFE_componentWillMount() {
    // filling in user data
    let { fields } = this.props;
    let data = {};
    for (let key in fields) {
      data[key] = '';
    }

    this.data = data;

    // filling object propsInputs
    this.propsInputs = {};

    for (let key in fields) {
      this.propsInputs[key] = {
        ...fields[key],
        changeData: this.changeData,
        checkData: this.checkData,
      };
    }
  }

  changeData(data, value) {
    let { fields } = this.props;
    if (fields[data].setData) {
      let res = fields[data].setData(value);
      this.data[data] = res;
    } else {
      this.data[data] = value;
    }
  }

  checkData(data) {
    let { fields } = this.props;
    let val = this.data[data];
    let error = fields[data].matchError(val);

    if (error !== this.state[data]) {
      this.setState({ [data]: error });
    }
  }
  updateProps(state) {
    let error = '';
    for (let key in this.propsInputs) {
      error = state[key];
      this.propsInputs[key]['error'] = error;
    }
  }

  getErrors() {
    let { fields } = this.props;
    let myState = {};

    for (let key in this.state) {
      let val = this.data[key];
      let error = fields[key].matchError(val);
      myState[key] = error;
    }
    return myState;
  }
  checkError(state) {
    for (let key in state) {
      if (state[key] !== '') return true;
    }
    return false;
  }

  onSubmit(e) {
    e.preventDefault();
    let myState = this.getErrors();
    let error = this.checkError(myState);
    if (!error) {
      console.log(this.data);
    } else {
      this.setState(myState);
    }
  }
  render() {
    this.updateProps(this.state);
    return (
      <FormComponent fieldsProps={this.propsInputs} onSubmit={this.onSubmit} />
    );
  }
}

const FormComponent = ({ fieldsProps, onSubmit }) => {
  let { name, number, business, description, file } = fieldsProps;
  return (
    <form action="" className="form" id="form" onSubmit={onSubmit}>
      <div className="flex_wrap">
        <Input {...name} />
        <Input {...number} />
      </div>
      <Input {...business} />
      <Input {...description} />
      <InputFile {...file} />
      <Submit text="Submit" />
    </form>
  );
};

export default FormContainer;
