var React = require('react');
var Position = require('./position');

var Board = React.createClass({
  getInitialState: function() {
    return {
      currentPlayer: "X",
      grid: ["", "", "", "", "", "", "", "", ""],
      winner: false
    }
  },

  checkForWinner: function(grid) {
    var row1 = [grid[0], grid[1], grid[2]];
    var row2 = [grid[3], grid[4], grid[5]];
    var row3 = [grid[6], grid[7], grid[8]];
    var col1 = [grid[0], grid[3], grid[6]];
    var col2 = [grid[1], grid[4], grid[7]];
    var col3 = [grid[2], grid[5], grid[8]];
    var diag1 = [grid[0], grid[4], grid[8]];
    var diag2 = [grid[6], grid[4], grid[2]];
    var threes = [row1, row2, row3, col1, col2, col3, diag1, diag2];
    for (var i = 0; i < threes.length; i++) {
      var areas = threes[i];
      if (areas[0] !== "" && areas[0] === areas[1] && areas[1] === areas[2]) {
        return true;
      }
    }
    return false;
  },

  gameOver: function() {
    for (var i = 0; i < this.state.grid.length; i++) {
      if (this.state.grid[i] === "") {
        return false;
      }
    }
    return true;
  },

  nextPlayer: function() {
    return this.state.currentPlayer === "X" ? "O" : "X";
  },

  resetBoard: function() {
    this.setState({
      currentPlayer: "X",
      grid: ["", "", "", "", "", "", "", "", ""],
      winner: false
    })
  },

  positionTaken: function(id) {
    if (this.state.grid[id] !== "") {
      return true
    }
    return false;
  },

  placeMark: function(e) {
    var pos = parseInt(e.target.id);
    if (this.positionTaken(pos)) {
      alert("Uh-oh!  Looks like that spot is taken :|");
    } else {
      var gridToUpdate = this.state.grid;
      gridToUpdate[pos] = this.state.currentPlayer;
      if (this.checkForWinner(gridToUpdate)) {
        this.setState({grid: gridToUpdate, winner: this.state.currentPlayer});
      } else {
        this.setState({grid: gridToUpdate, currentPlayer: this.nextPlayer()});
      }
    }
  },

  render: function() {
    var resetButton;
    var winnerText;
    var currentPlayerText;
    if (this.state.winner) {
      winnerText = <h2 className="winner-text">{this.state.currentPlayer} WINS!</h2>
      resetButton = <button className="reset-button" onClick={this.resetBoard}>Play Again</button>
      currentPlayerText = <div></div>
    } else if (this.gameOver()) {
      winnerText = <h2 className="winner-text">No winner :|</h2>
      resetButton = <button className="reset-button" onClick={this.resetBoard}>Play Again</button>
      currentPlayerText = <div></div>
    } else {
      winnerText = <div></div>
      resetButton = <div></div>
      currentPlayerText = <div className="current-player-text">{this.state.currentPlayer}, it is your turn!</div>
    }
    var positions = this.state.grid.map(function(spot, index) {
      return <Position id={index} key={index} mark={spot} />
    });
    return (
      <div className="game group">
        {winnerText}
        {currentPlayerText}
        <ul className="grid group" onClick={this.placeMark}>
          {positions}
        </ul>
        {resetButton}
      </div>
    )
  }
});

module.exports = Board;
