import React, { Component } from "react";
import ReactDOM from "react-dom";
import RatioInputContainer from "../container/RatioInputContainer.jsx";
import Input from "../presentational/Input.jsx";
import CropArea from "../presentational/CropArea.jsx";
import Cropper from 'cropperjs';

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noOfRow: 2,
      noOfCol: 4,
      spacingPx: 5,
      dataHeight: 0,
      dataHeight: 0,
      dataX: 0,
      dataY: 0
    };
    this.changeImage = this.changeImage.bind(this);
  }
  componentDidMount() {
    let form = this;
    let image = document.getElementById('img-to-be-cropped');

    this.cropper = new Cropper(image, {
      aspectRatio: 16 / 9,
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
  exportCrop() {
    let oc=document.getElementById("preview-cropped");
    let octx=oc.getContext("2d");
    let canvasWidth = oc.width;
    let canvasHeight = oc.height;
    let noOfRow = this.state.noOfRow;
    let noOfCol = this.state.noOfCol;
    let spacingPx = this.state.spacingPx;
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
    for(let i=0; i<noOfCol; i++) {
      for(let j=0; j<noOfRow; j++) {
        octx.drawImage(img,parseInt(dataX),parseInt(dataY),parseInt(dataWidth),parseInt(dataHeight), cutSpacing + (maxWidth+cutSpacing*2)*i, cutSpacing + (maxHeight+cutSpacing*2)*j,cutWidth,cutHeight);
      }    
    }
  }
  render() {
    return (
      <form>
        <Input text="Change Picture" type="file" id="inputImage" handleChange={this.changeImage} lblClasses="btn btn-primary btn-upload"  accept="image/*" inputRef={(ref) => this.fileUpload = ref}/>
        <RatioInputContainer />
        <CropArea holderId="img-up" imgId="img-to-be-cropped" imgSrc="https://3.bp.blogspot.com/-EsLHYU9Pd1s/XGgflPqD1jI/AAAAAAAAaSk/6vGmdvm3UxoZLYFQoqXjt1A9knKs1EWpgCKgBGAs/s640/IMG_7785.HEIC" />
      </form>
    );
  }
}
export default FormContainer;

const wrapper = document.getElementById("working-area");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;