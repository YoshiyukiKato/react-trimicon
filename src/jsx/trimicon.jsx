import React from "react";
import closeIconSrc from "../images/close_icon.svg";

const Editor = React.createClass({
  propTypes: {
    caption: React.PropTypes.shape({
      zoomRatio: React.PropTypes.string,
      done: React.PropTypes.string,
    }),

    resultSize: React.PropTypes.number,
    requiredSize: React.PropTypes.number,

    onSubmit: React.PropTypes.func
  },

  getInitialState: function(){
    return {
      imageSize: 100,
      imageTop: 0,
      imageLeft: 0,
      imageSrc: "",
      isDrag: false,
      isOpen: false
    } 
  },

  getDefaultProps: function(){
    return {
      caption: {
        zoomRatio: "Zoom Ratio",
        done: "Done",
      },

      resultSize: 512,
      requiredSize: 0
    }
  },

  render: function(){
    let imageStyle = { top: this.state.imageTop, left: this.state.imageLeft, width: this.state.imageSize + "%" };
    return (
      <div className={"trimicon-editor" + (this.state.isOpen ? " open" : "")}>
        <div className="trimicon-editor-area"> 
          <div className="trimicon-close-editor" onClick={this.close}>
            <img src={closeIconSrc}/>
          </div>
          <div className="trimicon-size-controller">
            <span>{this.props.caption.zoomRatio} : </span>
            <input type="number" value={this.state.imageSize} onChange={this.changeSize}/>
            <span> %</span>
          </div>
          <div className="trimicon-trimer" onMouseDown={this.dragStart} onMouseMove={this.dragMove} onMouseUp={this.dragEnd}> 
            <img ref="target" src={this.state.imageSrc} style={ imageStyle }/>
            <canvas ref="mask" width={500} height={400}></canvas>
          </div>
          <div className="trimicon-action-panel">
            <input ref="file" type="file" onChange={this.loadImage} hidden/>
            <button className="trimicon-button" onClick={this.selectImage}>Change Image</button>
            <button className="trimicon-button" onClick={this.done}>{ this.props.caption.done }</button>
          </div>
        </div>
      </div>
    );
  },

  componentDidMount: function(){
    let canvas = this.refs.mask;
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.rect(0, 0, 500, 400);
    ctx.fillStyle = "rgba(250,250,250,0.8)";
    ctx.fill();
    ctx.clearRect(150, 100, 200, 200);
  },

  dragStart: function(evt){
    this.setState({ 
      prevClientX: evt.clientX,
      prevClientY: evt.clientY,
      isDrag: true
    });
  },

  dragMove: function(evt){
    if(this.state.isDrag){
      let nextImageLeft = this.state.imageLeft + (evt.clientX - this.state.prevClientX);
      let nextImageTop = this.state.imageTop + (evt.clientY - this.state.prevClientY);
      this.setState({
        imageTop: nextImageTop,
        imageLeft: nextImageLeft,
        prevClientX: evt.clientX,
        prevClientY: evt.clientY,
      });
    }
  },

  dragEnd: function(evt){
    let nextImageLeft = this.state.imageLeft + (evt.clientX - this.state.prevClientX);
    let nextImageTop = this.state.imageTop + (evt.clientY - this.state.prevClientY);
    this.setState({
      imageTop: nextImageTop,
      imageLeft: nextImageLeft,
      isDrag: false
    });
  },

  changeSize: function(evt){
    let size = evt.target.value * 1;
    if(size > 0){
      this.setState({ 
        imageSize: size
      });
    }
  },

  selectImage: function(){
    let click = new Event("click");
    this.refs.file.dispatchEvent(click);
  },

  loadImage: function(evt){
    let file = evt.target.files[0];
    if (!file || !file.type.match('image.*')) return;
    let reader = new FileReader();
    reader.onload = this.open;
    reader.readAsDataURL(file);
  },

  open: function(evt){
    let dataURL = evt.target.result;
    this.setState({ imageSrc: dataURL, imageSize: 100, imageTop:0, imageLeft:0, isOpen: true });
  },

  close: function(){
    this.setState({ isOpen: false, imageSrc:"" });
  },

  done: function(){
    let image = this.refs.target;
    let nwidth = image.naturalWidth;
    let nheight = image.naturalHeight;
    let ratio = (500 / nwidth) * (this.state.imageSize / 100);
    let sx = (150 - this.state.imageLeft) / ratio;
    let sy = (100 - this.state.imageTop) / ratio;
    let sw, sh; sw = sh = 200 / ratio;
    let dx, dy; dx = dy = 0;
    let dw = this.props.resultSize;
    let dh = this.props.resultSize;

    let canvas = document.createElement("canvas");
    canvas.width = dw;
    canvas.height = dh;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    let dataURL = canvas.toDataURL();
    this.props.onSubmit(dataURL);
    this.close();
  },
});

exports.Editor = Editor;
