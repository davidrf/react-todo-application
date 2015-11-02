var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      text: ''
    }
  },
  handleClick: function() {
    console.log(this.state.text);
  },
  handleInputChange: function(event) {
    this.setState({text: event.target.value});
  },
  render: function() {
    return <div className="input-group">
      <input 
        value={this.state.text} 
        onChange={this.handleInputChange}
        type="text" 
        className="form-control" />
      <span className="input-group-btn">
        <button onClick={this.handleClick} className="btn btn-default" type="button">
          Add
        </button>
      </span>
    </div>
  }
});