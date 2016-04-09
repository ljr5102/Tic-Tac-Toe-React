var React = require('react');

var Position = React.createClass({
  render: function() {
    return (
      <li id={this.props.id}>{this.props.mark}</li>
    )
  }
});

module.exports = Position;
