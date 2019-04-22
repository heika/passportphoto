import React, { Component } from "react";
import ReactDOM from "react-dom";
import RatioInput from "../presentational/RatioInput.jsx";

class RatioInputContainer extends Component {
  constructor() {
    super();
    this.state = {
    };
    this.handleChange = this.handleChange.bind(this);
    this.selections = [
        {text: '1:1', value: '1'},
        {text: '9:16', value: '0.5625'},
        {text: '2:3', value: '0.6666666666666666'},
        {text: '3:4', value: '0.75'},
        {text: 'Free', value: 'NaN'}
    ]
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
    console.log(event)
  }
  render() {
    return (
      <div>
        {this.selections.map((sel, i) => {      
            return (<RatioInput
                text={sel.text}
                id={`aspectRatio${i}`}
                key={`aspectRatio${i}`}
                value={sel.value}
                handleChange={this.handleChange}
            />) 
        })}
      </div>
    );
  }
}
export default RatioInputContainer;