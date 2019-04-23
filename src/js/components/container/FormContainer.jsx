import React, { Component } from "react";
import ReactDOM from "react-dom";
import RatioInputContainer from "../container/RatioInputContainer.jsx";
import Input from "../presentational/Input.jsx";
import CropArea from "../presentational/CropArea.jsx";
import Cropper from 'cropperjs';

class FormContainer extends Component {
  constructor() {
    super();
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
        // console.log(event.detail.rotate);
        // console.log(event.detail.scaleX);
        // console.log(event.detail.scaleY);
      },
    });
    
    ['ready','crop'].forEach( evt => 
      image.addEventListener(evt, form.exportCrop, false)
    );
  }
  componentDidMount() {
    
    // let form = this;
    // let image = document.getElementById('img-to-be-cropped');

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
    var oc=document.getElementById("preview-cropped");
    var octx=oc.getContext("2d");
    console.log(this)
    var canvasWidth = oc.width;
    var canvasHeight = oc.height;
    var noOfRow = this.state.noOfRow;
    var noOfCol = this.state.noOfCol;
    var spacingPx = this.state.spacingPx;
    var dataHeight = this.state.dataHeight;
    var dataWidth = this.state.dataWidth;
    var dataX = this.state.dataX;
    var dataY = this.state.dataY;
  
    var outputWidth = 4000;
    
    var cutWidth = 0;
    var cutHeight = 0;
    var cutSpacing = parseInt(spacingPx*canvasWidth/outputWidth); // *2
  
    var maxWidth = parseInt(canvasWidth/noOfCol) - cutSpacing*2; // /2
    var maxHeight = parseInt(canvasHeight/noOfRow) - cutSpacing*2; // /2
    var steps = 0;
  
    if ((maxWidth/dataWidth)>(maxHeight/dataHeight)) {
      cutWidth = maxHeight/dataHeight*dataWidth;
      cutHeight = maxHeight;
      steps = Math.ceil(Math.log(dataHeight / cutHeight) / Math.log(2));
    } else {
      cutWidth = maxWidth;
      cutHeight = maxWidth/dataWidth*dataHeight;
      steps = Math.ceil(Math.log(dataWidth / cutWidth) / Math.log(2));
    }
  
    var img=document.getElementById("img-up").getElementsByTagName('img')[0];
  
    octx.fillStyle = "#FFFFFF";
    octx.fillRect(0,0,oc.width,oc.height);
    for(var i=0; i<noOfCol; i++) {
      for(var j=0; j<noOfRow; j++) {
        octx.drawImage(img,parseInt(dataX),parseInt(dataY),parseInt(dataWidth),parseInt(dataHeight), cutSpacing + (maxWidth+cutSpacing*2)*i, cutSpacing + (maxHeight+cutSpacing*2)*j,cutWidth,cutHeight);
      }    
    }
  }
  render() {
    return (
      <form>
        <Input text="Change Picture" type="file" id="inputImage" handleChange={this.changeImage} lblClasses="btn btn-primary btn-upload"  accept="image/*" inputRef={(ref) => this.fileUpload = ref}/>
        <RatioInputContainer />
        <CropArea holderId="img-up" imgId="img-to-be-cropped" imgSrc="img/picture.jpg" />
      </form>
    );
  }
}
export default FormContainer;

const wrapper = document.getElementById("working-area");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;