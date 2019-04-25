import React from "react";
import { CompactPicker } from 'react-color';
import PropTypes from "prop-types";

const ColorPicker = ({ pickerLabel, background, backgroundColorChange }) => (
    <div>
        <h3>{pickerLabel}</h3>
        <CompactPicker
          color={ background }
          onChangeComplete={ backgroundColorChange }
        />
    </div>
);
ColorPicker.propTypes = {
    pickerLabel: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    backgroundColorChange: PropTypes.func.isRequired
};
export default ColorPicker;