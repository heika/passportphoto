import React from "react";
import PropTypes from "prop-types";
const Input = ({ text, type, id, value='', handleChange, lblClasses='', accept='', inputRef = ''}) => (
  <div className="form-group">
    <label htmlFor={id} className={lblClasses}>{text}</label>
    <input
      type={type}
      className="form-control"
      id={id}
      value={value}
      onChange={handleChange}
      accept={accept}
      ref={inputRef}
    />
  </div>
);
Input.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
export default Input;