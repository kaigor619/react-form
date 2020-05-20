import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Error from './Error';

const requiredComponent = <span className="required">*</span>;

class Input extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }
  state = {
    value: '',
    errorVisible: this.props.error,
  };
  requiredComponent = (<span className="required">*</span>);

  shouldComponentUpdate(nextProps, nextState) {
    let b = false;
    let { errorVisible, value } = this.state;

    if (!equal_props(this.props, nextProps)) {
      b = true;
    }
    if (this.props.error !== nextProps.error) {
      if (!errorVisible) this.setState({ errorVisible: true });
      b = false;
    }

    if (!equal_props(this.state, nextState)) b = true;
    return b;
  }

  handleChange(e) {
    let { value } = e.target;
    let myState = { value };
    this.props.changeData(this.props.name, value);
    if (this.state.errorVisible) myState.errorVisible = false;
    this.setState(myState);
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
    placeholder: this.props.placeholder,
  };

  render() {
    let { name, required, label, placeholder, error, html } = this.props;
    let { errorVisible } = this.state;

    let classNames = cx('field', name);

    let required_component = required ? requiredComponent : null;

    let error_component =
      errorVisible && error !== '' ? <Error text={error} /> : null;

    let outComponent = <input {...this.inputProps} />;

    if (html == 'textarea')
      outComponent = <textarea {...this.inputProps}></textarea>;

    return (
      <div className={classNames}>
        <label htmlFor="number_people">
          {label} {required_component}
        </label>
        {outComponent}
        {error_component}
      </div>
    );
  }
}

Input.defaultProps = {
  name: '',
  type: 'text',
  label: '',
  html: 'input',
  required: false,
  placeholder: '',
  error: '',
  changeData: (data, value) => {},
  checkData: (data) => {},
};
Input.propTypes = {
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
    if (key != 'changeData' && key != 'checkData') {
      if (props1[key] !== props2[key]) return false;
    }
  }
  return true;
};

export default Input;
