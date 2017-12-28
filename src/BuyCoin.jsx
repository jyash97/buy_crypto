import React from 'react';

class BuyCoin extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 'BTC',
      valueText: ''
    };
  }
  render() {
    return (
      <React.Fragment>
        <select
          value={this.state.value}
          onChange={e => this.setState({ value: e.target.value })}
          name="coin"
          id=""
        >
          {this.props.data.map(name => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <input
          type="text"
          onChange={event => this.setState({ valueText: event.target.value })}
        />
        <button
          name="buy"
          onClick={e =>
            this.props.handleValue(this.state.value, this.state.valueText, e)
          }
        >
          Buy
        </button>
      </React.Fragment>
    );
  }
}

export default BuyCoin;
