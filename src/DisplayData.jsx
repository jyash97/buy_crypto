import React from 'react';

class DisplayData extends React.Component {
  render() {
    return (
      <React.Fragment>
        {Object.keys(this.props).map(name => (
          <li key={name}>
            {name} <span>{this.props[name]}</span>
          </li>
        ))}
      </React.Fragment>
    );
  }
}

export default DisplayData;
