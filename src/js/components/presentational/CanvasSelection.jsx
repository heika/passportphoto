import React from "react";
import PropTypes from "prop-types";
const CanvasSelection = ({ inputId, inputVal, labelTxt, imgSrc, handleChange}) => (
    <div>
        <label htmlFor={inputId}>
            {labelTxt}
            <img src={imgSrc} alt={labelTxt} title={labelTxt} />
        </label>
        <input type="number" className="form-control txtNo" id={inputId} value={inputVal} onChange={handleChange}/>
    </div>
);
CanvasSelection.propTypes = {
    inputId: PropTypes.string.isRequired,
    inputVal: PropTypes.string.isRequired,
    labelTxt: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired
};
export default CanvasSelection;