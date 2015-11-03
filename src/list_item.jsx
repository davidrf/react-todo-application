var React = require('react');
var Firebase = require('firebase');
var rootUrl = 'https://shining-heat-830.firebaseio.com/'

module.exports = React.createClass({
  getInitialState: function () {
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      textChanged: false
    }
  },
  handleDoneChange: function(event) {
    var update = {done: event.target.checked}
    this.setState(update);
    this.fb.update(update);
  },
  componentWillMount: function() {
    this.fb = new Firebase(rootUrl + 'items/' + this.props.item.key);
  },
  handleDeleteClick: function() {
    this.fb.remove();
  },
  handleTextChange: function(event) {
    this.setState({
      text: event.target.value,
      textChanged: true
    });
  },
  handleUndoClick: function() {
    this.setState({text: this.props.item.text, textChanged: false});
  },
  handleSaveClick: function(event) {
    this.setState({textChanged: false});
    this.fb.update({text: this.state.text});
  },
  changesButtons: function() {
    if (this.state.textChanged) {
      return [
        <button
          className="btn btn-default"
          onClick={this.handleSaveClick}
          >
          Save
        </button>,
        <button
          className="btn btn-default"
          onClick={this.handleUndoClick}
          >
          Undo
        </button>
      ];
    } else {
      return null;
    }
  },
  render: function() {
    return <div className="input-group">
      <span className="input-group-addon">
        <input
          checked={this.state.done}
          onChange={this.handleDoneChange}
          type="checkbox"
          />
      </span>
      <input type="text"
        disabled={this.state.done}
        className="form-control"
        onChange={this.handleTextChange}
        value={this.state.text}
        />
      <span className="input-group-btn">
        {this.changesButtons()}
        <button
          className="btn btn-default"
          onClick={this.handleDeleteClick}
          >
          Delete
        </button>
      </span>
    </div>
  }
});
