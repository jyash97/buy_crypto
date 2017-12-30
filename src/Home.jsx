import React from 'react';

import DisplayData from './DisplayData';
import Transaction from './Transaction';

import './style.css';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      prices: [],
      initialPrice: 1000000,
      holdings: {}
    };
    this.handleRequest = this.handleRequest.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
    this.handleSell = this.handleSell.bind(this);
  }

  componentWillMount() {
    this.handleRequest();
  }

  componentDidMount() {
    this.timer = setInterval(() => this.handleRequest(), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleSell(option, quantity) {
    if (!quantity) {
      alert('Please fill a value');
    } else {
      const gain =
        this.state.initialPrice + this.state.prices[option] * quantity;
      let b = this.state.holdings;
      if (b[option] >= quantity) {
        b[option] = (b[option] || 0) - parseFloat(quantity);
        this.setState({
          initialPrice: gain,
          holdings: b
        });
      } else {
        alert('Quantity to be sold is greater than the holdings');
      }
    }
  }

  handleBuy(option, quantity) {
    if (!quantity) {
      alert('Please fill a value');
    } else {
      const left =
        this.state.initialPrice - this.state.prices[option] * quantity;
      let a = this.state.holdings;
      if (left > 0) {
        a[option] = (a[option] || 0) + parseFloat(quantity);
        this.setState({
          initialPrice: left,
          holdings: a
        });
      } else {
        alert('You dont have enough Balance');
      }
    }
  }

  async handleRequest() {
    const prices = await fetch('https://koinex.in/api/ticker')
      .then(data => data.json())
      .then(data => data.prices)
      .catch(() => false);

    if (prices) {
      this.setState({
        prices
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.prices ? (
          <React.Fragment>
            <h4>Amount you have : {this.state.initialPrice}</h4>
            <DisplayData title="Live Prices" data={this.state.prices} />
            <Transaction
              type="Buy"
              handleBuy={this.handleBuy}
              data={Object.keys(this.state.prices)}
            />
            <Transaction
              type="Sell"
              handleSell={this.handleSell}
              data={Object.keys(this.state.prices)}
            />
            <DisplayData title="Holdings" data={this.state.holdings} />
          </React.Fragment>
        ) : (
          <h2>Error in Fetching Data</h2>
        )}
      </React.Fragment>
    );
  }
}

export default Home;
