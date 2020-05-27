import React, { Component } from 'react';
import FormComponent from './FormComponent';

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.changeData = this.changeData.bind(this);
    this.checkData = this.checkData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // this.state contains errors of all required fields
    let state = {};
    const { fields } = this.props;
    let key = '';
    for (key in fields) {
      if (fields[key].required) state[key] = '';
    }
    this.state = state;

    // this.data contains all user input data
    for (key in fields) {
      this.data[key] = '';
    }
  }

  data = {}; // data contains all user input data
  propsInputs = {}; // propsInputs contains all properties for Field, FieldFile

  UNSAFE_componentWillMount() {
    this.updateProps();
  }

  changeData(field, value) {
    const { fields } = this.props;
    if (fields[field].setData) {
      const res = fields[field].setData(value);
      this.data[field] = res;
    } else {
      this.data[field] = value;
    }
  }

  checkData(field) {
    const { fields } = this.props;
    const val = this.data[field];
    const error = fields[field].matchError(val);

    if (error !== this.state[field]) {
      this.setState({ [field]: error });
    }
  }

  updateProps() {
    let { fields } = this.props;
    let { state } = this;
    for (const key in fields) {
      this.propsInputs[key] = {
        ...fields[key],
        changeData: this.changeData,
        checkData: this.checkData,
        error: state[key],
      };
    }
  }

  getErrors() {
    const { fields } = this.props;
    const myState = {};
    let key, value, error;

    for (key in this.state) {
      value = this.data[key];
      error = fields[key].matchError(value);
      myState[key] = error;
    }

    return myState;
  }

  checkError(state) {
    for (const key in state) {
      if (state[key] !== '') return true;
    }
    return false;
  }

  onSubmit(e) {
    e.preventDefault();
    const myState = this.getErrors();
    const error = this.checkError(myState);
    if (!error) {
      console.log(this.data);
    } else {
      this.setState(myState);
    }
  }

  render() {
    this.updateProps();
    return (
      <FormComponent fieldsProps={this.propsInputs} onSubmit={this.onSubmit} />
    );
  }
}

export default FormContainer;
