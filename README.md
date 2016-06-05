![CircleCI](https://circleci.com/gh/a-know/awesome_events.svg?style=shield&circle-token=17357171a86d687db543c46abdc5a966d1e63f48)
[![Code Climate](https://codeclimate.com/github/YoshiyukiKato/react-trimicon/badges/gpa.svg)](https://codeclimate.com/github/YoshiyukiKato/react-trimicon)
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

<img src="http://drive.google.com/uc?export=view&id=0B8DM9V01AvIyd1hLSTluUVpDeWc" width="50%"/>

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
###onSubmit
`function(dataURL){ }`  
The callback function will be invoked when a user finished editing image by clicking `Done` button. This function receives the result(square icon) as dataURL.

###resultSize
`number`  
The length (px) of side (width and height) of the square icon. The default value is `512`.

###caption
`{ zoomRatio:string, changeImage:string, done:string }`  
The captions for some controllers. The default value is `{ zoomRatio: "Zoom Ratio", changeImage: "Change Image", done: "Done" }`


#TODO
* add rgb-filter function
* expand test cases

#LICENSE
MIT
