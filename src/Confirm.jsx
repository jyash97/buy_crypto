import React from 'react';

class Confirm extends React.Component {
  render() {
    return (
      <div>
        <h5>Are you sure</h5>
        <button onClick={this.props.handleClick}>Yes</button>
        <button onClick={this.props.handleReset}>No</button>
      </div>
    );
  }
}

export default Confirm;
