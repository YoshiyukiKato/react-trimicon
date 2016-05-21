# react-trimicon
react.js component to trim an image into a square icon

# quick start
##try
```shell
$ git clone git@github.com/YoshiyukiKato/react-trimicon
$ cd react-trimicon && npm install
$ $(npm bin)/webpack-dev-server 
```
Then the server runs on `http://localhost:8080`.

##install
```shell
$ npm install --save react-trimicon
```

#usage
```jsx
//app.jsx
import React from "react";
import ReactDOM from "react-dom";
import { Editor } from "react-trimicon";

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
```

##props
###onSubmit(dataURL)
A callback function when a user finished editing image by clicking `Done` button. This function will receive the result(square icon) as dataURL.
