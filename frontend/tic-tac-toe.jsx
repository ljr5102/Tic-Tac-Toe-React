var React = require('react');
var ReactDOM = require('react-dom');
var Board = require('./game/board');

$(function(){
  ReactDOM.render(
    <Board />,
    $("#root")[0]
  )
});
