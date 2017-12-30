import React from 'react';

import Confirm from './Confirm';

class Transaction extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 'BTC',
      valueText: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleReset() {
    this.setState({
      value: 'BTC',
      valueText: '',
      confirm: false
    });
  }

  handleConfirm() {
    this.setState({
      confirm: true
    });
  }

  handleClick() {
    if (this.props.type === 'Sell') {
      this.props.handleSell(this.state.value, this.state.valueText);
    } else {
      this.props.handleBuy(this.state.value, this.state.valueText);
    }
    this.handleReset();
  }

  render() {
    return (
      <div className="transaction">
        <h4>{this.props.type} Coins</h4>
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
          value={this.state.valueText}
          placeholder={`${this.props.type} Coins (Fill a Number)`}
          onChange={event => this.setState({ valueText: event.target.value })}
        />
        <button name={this.props.type} onClick={this.handleConfirm}>
          {this.props.type}
        </button>
        {this.state.confirm ? (
          <Confirm
            handleClick={this.handleClick}
            handleReset={this.handleReset}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default Transaction;
