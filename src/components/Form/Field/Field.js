import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Error from '../Error/Error';
import './Field.sass';

const requiredComponent = <span className="required">*</span>;

class InputContainer extends Component {
  state = {
    value: '',
    errorVisible: this.props.error,
  };

  shouldComponentUpdate(nextProps, nextState) {
    let b = false;
    let { errorVisible, value } = this.state;

    if (!equal_props(this.props.data, nextProps.data)) {
      b = true;
    }
    if (this.props.error !== nextProps.error) {
      if (!errorVisible) this.setState({ errorVisible: true });
      b = false;
    }

    if (!equal_props(this.state, nextState)) {
      if (value !== nextState.value) this.updateValueProps(nextState.value);
      b = true;
    }
    return b;
  }

  handleChange(e) {
    let { value } = e.target;
    let myState = { value };
    this.props.changeData(this.props.name, value);
    if (this.state.errorVisible) myState.errorVisible = false;
    this.setState(myState);
  }
  updateValueProps(value) {
    this.inputProps.value = value;
  }
  handleBlur() {
    let { errorVisible } = this.state;
    if (!errorVisible) this.setState({ errorVisible: true });
    if (this.props.required) this.props.checkData(this.props.name);
  }

  inputProps = {
    type: 'text',
    onChange: this.handleChange.bind(this),
    autoComplete: 'off',
    onBlur: this.handleBlur.bind(this),
    id: this.props.name,
    name: this.props.name,
    value: this.state.value,
    placeholder: this.props.placeholder,
  };

  render() {
    let props = {
      ...this.props,
      inputProps: this.inputProps,
      errorVisible: this.state.errorVisible,
    };
    return <InputComponent {...props} />;
  }
}

const InputComponent = ({
  name,
  required,
  errorVisible,
  error,
  inputProps,
  label,
  html,
  type,
}) => {
  let classNames = cx('field', name);

  let required_component = required ? requiredComponent : null;

  let error_component =
    errorVisible && error !== '' ? <Error text={error} /> : null;

  let outComponent = <input type={type} {...inputProps} />;

  if (html === 'textarea') outComponent = <textarea {...inputProps}></textarea>;
  return (
    <div className={classNames}>
      <label htmlFor={name}>
        {label} {required_component}
      </label>
      {outComponent}
      {error_component}
    </div>
  );
};

InputContainer.defaultProps = {
  name: '',
  type: 'text',
  changeData: (data, value) => {},
  checkData: (data) => {},
  label: '',
  required: false,
  placeholder: '',
  html: 'input',
  error: '',
};
InputContainer.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  changeData: PropTypes.func.isRequired,
  checkData: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  html: PropTypes.string,
  error: PropTypes.string,
};

const equal_props = (props1, props2) => {
  for (let key in props1) {
    if (key !== 'changeData' && key !== 'checkData') {
      if (props1[key] !== props2[key]) return false;
    }
  }
  return true;
};

export default InputContainer;
