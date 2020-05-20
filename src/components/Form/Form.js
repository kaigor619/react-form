import React, { Component } from 'react';
import Input from './Input';
import InputFile from './InputFile';
import Submit from './Submit';
import fields from './FormData';

class Form extends Component {
  constructor(props) {
    super(props);

    this.changeData = this.changeData.bind(this);
    this.checkData = this.checkData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Заполнение this.state
    let state = {};

    for (let key in fields) {
      if (fields[key]['required']) state[key] = '';
    }
    this.state = state;
  }

  componentWillMount() {
    // Заполнение this.data
    let data = {};
    for (let key in fields) {
      data[key] = '';
    }

    this.data = data;

    // заполнение this.propsInputs
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
    if (fields[data].setData) {
      let res = fields[data].setData(value);
      this.data[data] = res;
    } else {
      this.data[data] = value;
    }
  }

  checkData(data) {
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
    let { name, number, business, description, file } = this.propsInputs;
    return (
      <form action="" className="form" id="form" onSubmit={this.onSubmit}>
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
  }
}

export default Form;
