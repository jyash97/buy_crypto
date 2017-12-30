import React from 'react';

class DisplayData extends React.Component {
  render() {
    return (
      <div>
        <h4>{this.props.title}</h4>
        {Object.keys(this.props.data).map(name => (
          <li key={name}>
            {name} <span>{this.props.data[name]}</span>
          </li>
        ))}
      </div>
    );
  }
}

export default DisplayData;
