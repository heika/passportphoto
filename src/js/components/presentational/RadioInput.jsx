import React from "react";
import PropTypes from "prop-types";
const RadioInput = ({ text, id, value, handleChange, selected='', prefix }) => (
  <div className="form-group">
    <label htmlFor={id} className="btn btn-primary">{text}</label>
    <input id={id} name={prefix} value={value} type="radio" onClick={handleChange} defaultChecked={selected} />
  </div>
);
RadioInput.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
export default RadioInput;