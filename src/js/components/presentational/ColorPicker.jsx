import React from "react";
import reactCSS from 'reactcss'
// import { CompactPicker } from 'react-color';
import { SketchPicker } from 'react-color'
// import PropTypes from "prop-types";

/*
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
*/

class ColorPicker extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        displayColorPicker: false,
        color: this.props.background
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color) => {
        this.setState({ color: color.rgb })
        this.props.backgroundColorChange(color);
    };

    render() {

        const styles = reactCSS({
            'default': {
                color: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
                },
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });

        return (
            <div>
                <div style={styles.swatch} onClick={this.handleClick}>
                    <div style={styles.color} />
                </div>
                {this.state.displayColorPicker ? <div style={styles.popover}>
                    <div style={styles.cover} onClick={this.handleClose} />
                    <SketchPicker color={this.state.color} onChange={this.handleChange} />
                </div> : null}

            </div>
        )
    }
}

export default ColorPicker;