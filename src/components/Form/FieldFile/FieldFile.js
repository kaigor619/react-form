import React, { Component } from 'react';
import PropTypes from 'prop-types';
import folder from './folder.svg';
import Error from '../Error/Error';
import './FieldFile.sass';

class InputFile extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    count: 0,
  };
  handleChange(e) {
    let { required } = this.props;
    let elem = e.target;
    if (elem.files) {
      let { length } = elem.files;
      this.props.changeData(this.props.name, elem.files);
      if (required) this.props.checkData(this.props.name);
      this.setState({ count: length });
    }
  }

  render() {
    let { count } = this.state;

    let { name, required, label, error } = this.props;

    let error_component =
      error !== '' && required ? <Error text={error} /> : null;

    let classNames = 'field_file ' + name;

    return (
      <div className={classNames}>
        <label htmlFor="file" className="file_label">
          <div className="fileUpload">
            <img src={folder} alt="" />
            <span className="label_file">{label}</span>
          </div>
          <div className="count_attached">{count} files attached</div>
          <input
            type="file"
            id="file"
            multiple
            onChange={this.handleChange}
            className="upload"
          />
        </label>
        {error_component}
      </div>
    );
  }
}

InputFile.defaultProps = {
  name: '',
  label: '',
  required: false,
  placeholder: '',
  error: '',
  changeData: (data, value) => {},
  checkData: (data) => {},
};
InputFile.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  html: PropTypes.string,
  error: PropTypes.string,
  changeData: PropTypes.func,
  checkData: PropTypes.func,
};

export default InputFile;
