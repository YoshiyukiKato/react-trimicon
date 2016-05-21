import React from "react";
import ReactDOM from "react-dom";
import { Editor } from "./trimicon";

const App = React.createClass({
  getInitialState: function(){
    return {
      imageSrc: ""
    }
  },

  render: function(){
    return (
      <div id="app">
        <img src={this.state.imageSrc}/>
        <button className="trimicon-button" onClick={this.selectImage}>Select Image</button>
        <Editor ref="editor" onSubmit={this.handleSubmit}/>
      </div>
    );
  },

  selectImage: function(){
    this.refs.editor.selectImage();
  },

  handleSubmit: function(dataURL){
     this.setState({ imageSrc: dataURL });
  },
});

ReactDOM.render(
  <App/>,
  document.querySelector("#main")
);
