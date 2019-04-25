import React, { Component } from "react";
import ReactDOM from "react-dom";
import RadioInput from "../presentational/RadioInput.jsx";

class RadioInputContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={this.props.customClass}>
        {this.props.selections.map((sel, i) => {      
            return (<RadioInput
                text={sel.text}
                id={`${this.props.prefix}${i}`}
                key={`${this.props.prefix}${i}`}
                value={sel.value}
                handleChange={this.props.handleChange}
                selected={sel.selected}
                prefix={this.props.prefix}
            />) 
        })}
      </div>
    );
  }
}
export default RadioInputContainer;