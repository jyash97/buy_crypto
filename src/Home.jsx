import React from 'react';

import DisplayData from './DisplayData';
import BuyCoin from './BuyCoin';
import SellCoin from './SellCoin';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      prices: [],
      initialPrice: 1000000,
      holdings: {}
    };
    this.handleRequest = this.handleRequest.bind(this);
    this.handleValue = this.handleValue.bind(this);
  }

  componentWillMount() {
    this.handleRequest();
  }

  componentDidMount() {
    this.timer = setInterval(() => this.handleRequest(), 300000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleValue(option, quantity = 1, event) {
    if (event.target.name === 'sell') {
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
            <DisplayData {...this.state.prices} />
            <BuyCoin
              handleValue={this.handleValue}
              data={Object.keys(this.state.prices)}
            />
            <SellCoin
              handleValue={this.handleValue}
              data={Object.keys(this.state.prices)}
            />
          </React.Fragment>
        ) : (
          <h2>Error in Fetching Data</h2>
        )}
      </React.Fragment>
    );
  }
}

export default Home;
