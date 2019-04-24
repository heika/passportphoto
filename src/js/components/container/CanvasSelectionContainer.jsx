import React, { Component } from "react";
import ReactDOM from "react-dom";
import CanvasSeletion from "../presentational/CanvasSelection.jsx";

class CanvasSelectionContainer extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div>
          {this.props.canvasSelections.map((sel, i) => {
              let stateVal = this.props.canvasSelectionsValue[sel.id];
              return (<CanvasSeletion
                key={sel.id}
                inputId={sel.id}
                inputVal={stateVal}
                labelTxt={sel.text}
                imgSrc={sel.imgSrc}
                handleChange={this.props.canvasSelectionsValueChange}
              />) 
          })}
        </div>
      );
    }
  }
  export default CanvasSelectionContainer;