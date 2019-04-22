import React from "react";
import PropTypes from "prop-types";
const RatioInput = ({ text, id, value, handleChange }) => (
  <div className="form-group">
    <label htmlFor={id} className="btn btn-primary">{text}</label>
    <input id={id} name="aspestRatio" value={value} type="radio" onClick={handleChange} />
  </div>
);
RatioInput.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
export default RatioInput;