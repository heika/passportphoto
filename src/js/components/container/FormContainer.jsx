import React, { Component } from "react";
import ReactDOM from "react-dom";

import RadioInputContainer from "./RadioInputContainer.jsx";
import CanvasSeletionContainer from "../container/CanvasSelectionContainer.jsx";

import Input from "../presentational/Input.jsx";
import ColorPicker from "../presentational/ColorPicker.jsx";
import CropArea from "../presentational/CropArea.jsx";

import Cropper from 'cropperjs';
import CropImage from '../../../img/picture.jpg'; 

import colImage from '../../../img/icon-col-48.png'; 
import rowImage from '../../../img/icon-row-48.png'; 
import spaceImage from '../../../img/icon-space-48.png'; 

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'split',
      dataHeight: 0,
      dataHeight: 0,
      dataX: 0,
      dataY: 0,
      
      canvasSelectionsValue: {
        noOfCol: '4',
        noOfRow: '2',
        spacingPx: '5'
      },

      background: '#FFF',

      aspectRatio: 0.75
    };

    this.canvasSize = {
      split: {
        w: 1800,
        h: 1200
      },
      hko: {
        w: 1200,
        h: 1600
      }
  }
    
    this.modeSelections = [
      {text: 'Split Photo', value: 'split', selected: true},
      {text: 'HK Passport Photo Online Submission', value: 'hko', selected: false},
    ]
    this.ratioSelections = [
      {text: '1:1', value: '1', selected: false},
      {text: '9:16', value: '0.5625', selected: false},
      {text: '2:3', value: '0.6666666666666666', selected: false},
      {text: '3:4', value: '0.75', selected: true},
      {text: 'Free', value: 'NaN', selected: false}
    ]
    this.canvasSelections = [
      {text: 'No. of Col', imgSrc: colImage, id: 'noOfCol'},
      {text: 'No. of Row', imgSrc: rowImage, id: 'noOfRow'},
      {text: 'Spacing (px)', imgSrc: spaceImage, id: 'spacingPx'}
      ]
    this.changeMakerMode = this.changeMakerMode.bind(this);
    this.backgroundColorChange = this.backgroundColorChange.bind(this);
    this.canvasChange = this.canvasChange.bind(this);
    this.changeImage = this.changeImage.bind(this);
    this.setAspectRatio = this.setAspectRatio.bind(this);
    this.canvasSelectionsValueChange = this.canvasSelectionsValueChange.bind(this);
  }
  componentDidMount() {
    let form = this;
    let image = document.getElementById('img-to-be-cropped');

    this.cropper = new Cropper(image, {
      aspectRatio: this.state.aspectRatio,
      crop(event) {
        form.setState({
          dataX: event.detail.x,
          dataY: event.detail.y,
          dataHeight: event.detail.height,
          dataWidth: event.detail.width
        });
      },
    });
    
    ['ready','crop'].forEach( evt => 
      image.addEventListener(evt, function() {form.exportCrop()}, false)
    );
  }
  componentDidUpdate() {
    this.exportCrop();
  }
  changeMakerMode(event) {
    this.setState({ mode: event.target.value });
    if(event.target.value=='split')
      this.cropper.setAspectRatio(this.state.aspectRatio);
    else
    this.cropper.setAspectRatio(0.75);
  }
  backgroundColorChange = (color) => {
    this.setState({ background: color.hex });
    this.exportCrop();
  };
  canvasChange(event) {
      let canvasSelections = this.state.canvasSelections;
      for(let i in canvasSelections) {
          if(canvasSelections[i].id == event.target.id) {
              canvasSelections[i].value = event.target.value;
          }
      }
      this.setState({ canvasSelections : canvasSelections} );
  }
  changeImage(event) {
    let URL = window.URL || window.webkitURL;

    if (URL) {
      let blobURL, files = this.fileUpload.files, file;

      if (files && files.length) {
        file = files[0];

        if (/^image\/\w+$/.test(file.type)) {
          blobURL = URL.createObjectURL(file);
          this.cropper.replace(blobURL)
        }
      }
    }
    event.target.value = '';
  }
  canvasSelectionsValueChange(event) {
    let canvasSelectionsValue = this.state.canvasSelectionsValue;
    
    canvasSelectionsValue[event.target.id] = event.target.value;
    this.setState({ canvasSelectionsValue : canvasSelectionsValue} );

    this.exportCrop();
  }
  setAspectRatio(event) {
    this.setState({aspectRatio: event.target.value});
    this.cropper.setAspectRatio(event.target.value);
  }
  exportCrop() {
    let oc=document.getElementById("preview-cropped");
    let octx=oc.getContext("2d");
    let canvasWidth = oc.width;
    let canvasHeight = oc.height;
    let noOfRow = this.state.mode=='hko' ? '1' : this.state.canvasSelectionsValue.noOfRow;
    let noOfCol = this.state.mode=='hko' ? '1' : this.state.canvasSelectionsValue.noOfCol;
    let spacingPx = this.state.mode=='hko' ? '0' : this.state.canvasSelectionsValue.spacingPx;
    let dataHeight = this.state.dataHeight;
    let dataWidth = this.state.dataWidth;
    let dataX = this.state.dataX;
    let dataY = this.state.dataY;
  
    let outputWidth = 4000;
    
    let cutWidth = 0;
    let cutHeight = 0;
    let cutSpacing = parseInt(spacingPx*canvasWidth/outputWidth); // *2
  
    let maxWidth = parseInt(canvasWidth/noOfCol) - cutSpacing*2; // /2
    let maxHeight = parseInt(canvasHeight/noOfRow) - cutSpacing*2; // /2
    let steps = 0;
  
    if ((maxWidth/dataWidth)>(maxHeight/dataHeight)) {
      cutWidth = maxHeight/dataHeight*dataWidth;
      cutHeight = maxHeight;
      steps = Math.ceil(Math.log(dataHeight / cutHeight) / Math.log(2));
    } else {
      cutWidth = maxWidth;
      cutHeight = maxWidth/dataWidth*dataHeight;
      steps = Math.ceil(Math.log(dataWidth / cutWidth) / Math.log(2));
    }
  
    let img=document.getElementById("img-up").getElementsByTagName('img')[0];
  
    octx.fillStyle = "#FFFFFF";
    octx.fillRect(0,0,oc.width,oc.height);

    octx.fillStyle = this.state.background;

    for(let i=0; i<noOfCol; i++) {
      for(let j=0; j<noOfRow; j++) {
        octx.fillRect(cutSpacing + (maxWidth+cutSpacing*2)*i, cutSpacing + (maxHeight+cutSpacing*2)*j,cutWidth,cutHeight)
        octx.drawImage(img,parseInt(dataX),parseInt(dataY),parseInt(dataWidth),parseInt(dataHeight), cutSpacing + (maxWidth+cutSpacing*2)*i, cutSpacing + (maxHeight+cutSpacing*2)*j,cutWidth,cutHeight);
      }    
    }
  }
  downloadImage(event) {
    let oc=document.getElementById("preview-cropped");
    let octx=oc.getContext("2d");
      var dt = oc.toDataURL('image/jpeg');
      event.target.href = dt;
  }
  render() {
    return (
      <form>
        <Input text="Change Picture" type="file" id="inputImage" handleChange={this.changeImage} lblClasses="btn btn-primary btn-upload"  accept="image/*" inputRef={(ref) => this.fileUpload = ref}/>
        <ColorPicker
          pickerLabel = "Background Color (If selected pic is transparent)"
          background={ this.state.background }
          backgroundColorChange={ this.backgroundColorChange }
        />
        <RadioInputContainer handleChange={this.changeMakerMode} prefix="mode" selections={this.modeSelections}/>
        {this.state.mode=='split' ? 
          <RadioInputContainer handleChange={this.setAspectRatio} prefix="aspectRatio" selections={this.ratioSelections}/>
          : '' }
        <CropArea holderId="img-up" imgId="img-to-be-cropped" imgSrc={CropImage} />
        {this.state.mode=='split' ? <CanvasSeletionContainer 
          canvasSelections={this.canvasSelections} 
          canvasSelectionsValue={this.state.canvasSelectionsValue}
          canvasSelectionsValueChange={this.canvasSelectionsValueChange}/> : ''}
        <a className="btn" download="download.jpg" onClick={this.downloadImage}>Download JPG</a>
        <canvas id="preview-cropped" 
          width={this.canvasSize[this.state.mode].w} 
          height={this.canvasSize[this.state.mode].h} ></canvas>
      </form>
    );
  }
}
export default FormContainer;

const wrapper = document.getElementById("working-area");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;